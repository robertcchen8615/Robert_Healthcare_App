import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { ProcessVisitResult } from '@/lib/types';
import { demoCriticalResult, demoStableResult } from '@/lib/mockData';

export async function POST(request: NextRequest) {
  const { nurseNote, patientName, sampleIndex } = await request.json();

  // Demo mode: no API key required
  if (!process.env.ANTHROPIC_API_KEY) {
    await new Promise(resolve => setTimeout(resolve, 1800));
    const demo = sampleIndex === 1 ? demoStableResult : demoCriticalResult;
    return NextResponse.json({ result: demo, mode: 'demo' });
  }

  const client = new Anthropic();

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    system:
      '你是一個 AI-native 居家護理 CRM 系統。請用繁體中文分析護理師的探視記錄，回傳 JSON 格式的結構化資料。只回應 JSON，不要加任何說明文字或 markdown 標記。',
    messages: [
      {
        role: 'user',
        content: `患者姓名：${patientName}
護理師探視記錄：${nurseNote}

請提取並回傳以下 JSON 結構：
{
  "measurements": {
    "bloodPressure": { "systolic": number, "diastolic": number } | null,
    "bloodGlucose": number | null,
    "oxygenSaturation": number | null,
    "temperature": number | null,
    "weight": number | null,
    "heartRate": number | null
  },
  "concerns": [
    { "type": "health"|"medication"|"psychosocial"|"safety", "severity": "low"|"medium"|"high", "description": "string" }
  ],
  "nextSteps": [
    { "action": "string", "deadline": "string", "assignee": "nurse"|"doctor"|"family"|"supervisor" }
  ],
  "familyMessageDraft": "string（給家屬的正式通知草稿，包含今日狀況與建議事項）",
  "careStatusUpdate": "stable"|"monitoring"|"critical"|"improving",
  "visitSummary": "string（一句話摘要）",
  "supervisorAlert": boolean,
  "supervisorAlertMessage": "string | null"
}`,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== 'text') {
    return NextResponse.json({ error: 'Unexpected response type' }, { status: 500 });
  }

  let parsed: Omit<ProcessVisitResult, 'actions'>;
  try {
    const jsonText = content.text.replace(/```json\s*|\s*```/g, '').trim();
    parsed = JSON.parse(jsonText);
  } catch {
    return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 });
  }

  const actions = [
    {
      id: 'act1',
      type: 'update_record' as const,
      label: '更新護理記錄',
      detail: `${parsed.visitSummary}——已自動記錄至系統`,
      status: 'done' as const,
    },
    ...(parsed.concerns.length > 0
      ? [
          {
            id: 'act2',
            type: 'flag_concern' as const,
            label: '識別照護警訊',
            detail: parsed.concerns.map(c => c.description).join('；'),
            status: 'done' as const,
          },
        ]
      : []),
    {
      id: 'act3',
      type: 'identify_next_step' as const,
      label: '辨識後續行動',
      detail: parsed.nextSteps.map(s => s.action).join(' / '),
      status: 'done' as const,
    },
    {
      id: 'act4',
      type: 'draft_message' as const,
      label: '草擬家屬通知',
      detail: '已自動草擬家屬健康狀況更新通知（可一鍵發送）',
      status: 'done' as const,
    },
    {
      id: 'act5',
      type: 'update_status' as const,
      label: '更新照護狀態',
      detail: `照護狀態已更新為：${parsed.careStatusUpdate}`,
      status: 'done' as const,
    },
    ...(parsed.supervisorAlert
      ? [
          {
            id: 'act6',
            type: 'notify_supervisor' as const,
            label: '通知督導',
            detail: parsed.supervisorAlertMessage ?? '已自動通知督導',
            status: 'done' as const,
          },
        ]
      : []),
  ];

  const result: ProcessVisitResult = { ...parsed, actions };
  return NextResponse.json({ result, mode: 'ai' });
}

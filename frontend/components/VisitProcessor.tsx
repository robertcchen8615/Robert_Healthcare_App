'use client';

import { useState, useEffect } from 'react';
import {
  Zap,
  FileText,
  AlertTriangle,
  MessageSquare,
  RefreshCw,
  Bell,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Loader2,
  Stethoscope,
  ClipboardList,
  ArrowRight,
} from 'lucide-react';
import { ProcessVisitResult, AIAction, Concern, CareStatus } from '@/lib/types';
import { sampleVisitNotes, mockPatients } from '@/lib/mockData';

const actionIcon: Record<AIAction['type'], React.ReactNode> = {
  update_record: <FileText className="w-4 h-4" />,
  flag_concern: <AlertTriangle className="w-4 h-4" />,
  identify_next_step: <ClipboardList className="w-4 h-4" />,
  draft_message: <MessageSquare className="w-4 h-4" />,
  update_status: <RefreshCw className="w-4 h-4" />,
  notify_supervisor: <Bell className="w-4 h-4" />,
};

const actionColor: Record<AIAction['type'], string> = {
  update_record: 'bg-slate-100 text-slate-600',
  flag_concern: 'bg-amber-50 text-amber-600',
  identify_next_step: 'bg-violet-50 text-violet-600',
  draft_message: 'bg-sky-50 text-sky-600',
  update_status: 'bg-emerald-50 text-emerald-600',
  notify_supervisor: 'bg-orange-50 text-orange-600',
};

const statusLabel: Record<CareStatus, string> = {
  stable: '穩定',
  monitoring: '監測中',
  critical: '緊急',
  improving: '改善中',
};

const statusColor: Record<CareStatus, string> = {
  stable: 'bg-emerald-100 text-emerald-800',
  monitoring: 'bg-amber-100 text-amber-800',
  critical: 'bg-red-100 text-red-800',
  improving: 'bg-sky-100 text-sky-800',
};

const concernSeverityColor: Record<Concern['severity'], string> = {
  high: 'border-red-200 bg-red-50',
  medium: 'border-amber-200 bg-amber-50',
  low: 'border-slate-200 bg-slate-50',
};

const concernSeverityLabel: Record<Concern['severity'], string> = {
  high: '高',
  medium: '中',
  low: '低',
};

const concernSeverityBadge: Record<Concern['severity'], string> = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-amber-100 text-amber-700',
  low: 'bg-slate-100 text-slate-600',
};

const assigneeLabel: Record<string, string> = {
  nurse: '護理師',
  doctor: '醫師',
  family: '家屬',
  supervisor: '督導',
};

export default function VisitProcessor({ initialPatientId }: { initialPatientId?: string }) {
  const [selectedPatientId, setSelectedPatientId] = useState(initialPatientId ?? 'p001');
  const [nurseNote, setNurseNote] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ProcessVisitResult | null>(null);
  const [visibleActions, setVisibleActions] = useState<number>(0);
  const [showFamilyMessage, setShowFamilyMessage] = useState(false);
  const [copied, setCopied] = useState(false);
  const [aiMode, setAiMode] = useState<'demo' | 'ai'>('demo');
  const [elapsedMs, setElapsedMs] = useState<number | null>(null);

  const selectedPatient = mockPatients.find(p => p.id === selectedPatientId);

  const handleSampleSelect = (idx: number) => {
    const sample = sampleVisitNotes[idx];
    setSelectedPatientId(sample.patientId);
    setNurseNote(sample.note);
    setResult(null);
    setVisibleActions(0);
  };

  const processVisit = async () => {
    if (!nurseNote.trim()) return;
    setIsProcessing(true);
    setResult(null);
    setVisibleActions(0);
    setShowFamilyMessage(false);
    const start = Date.now();

    try {
      const sampleIndex = sampleVisitNotes.findIndex(s => s.note === nurseNote);
      const res = await fetch('/api/process-visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nurseNote,
          patientName: selectedPatient?.name ?? '患者',
          sampleIndex,
        }),
      });
      const data = await res.json();
      setElapsedMs(Date.now() - start);
      setAiMode(data.mode);
      setResult(data.result);
    } catch {
      alert('處理失敗，請稍後再試');
    } finally {
      setIsProcessing(false);
    }
  };

  // Animate actions appearing one by one
  useEffect(() => {
    if (!result) return;
    setVisibleActions(0);
    const total = result.actions.length;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setVisibleActions(i);
      if (i >= total) clearInterval(timer);
    }, 380);
    return () => clearInterval(timer);
  }, [result]);

  const copyFamilyMessage = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.familyMessageDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* LEFT: Input panel */}
      <div className="space-y-5">
        {/* Sample notes */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-sky-600" />
            快速載入範例情境
          </h3>
          <div className="space-y-2">
            {sampleVisitNotes.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSampleSelect(i)}
                className="w-full text-left px-4 py-3 rounded-lg border border-slate-200 hover:border-sky-300 hover:bg-sky-50 transition-all text-sm"
              >
                <span className="font-medium text-slate-700">{s.label}</span>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{s.note}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Patient selector */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <label className="text-sm font-semibold text-slate-700 mb-2 block">探視患者</label>
          <select
            value={selectedPatientId}
            onChange={e => setSelectedPatientId(e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            {mockPatients.map(p => (
              <option key={p.id} value={p.id}>
                {p.name}（{p.age} 歲）— {p.conditions.join('、')}
              </option>
            ))}
          </select>
        </div>

        {/* Note input */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <label className="text-sm font-semibold text-slate-700 mb-2 block">
            護理師探視記錄
            <span className="ml-2 text-xs text-slate-400 font-normal">（口語輸入即可，AI 自動結構化）</span>
          </label>
          <textarea
            value={nurseNote}
            onChange={e => setNurseNote(e.target.value)}
            placeholder="例如：今天去探視張志明先生，他說最近頭暈，量了血壓是165/95，他提到下週要去看心臟科…"
            className="w-full h-40 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
          />
          <button
            onClick={processVisit}
            disabled={isProcessing || !nurseNote.trim()}
            className="mt-3 w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-5 py-3 rounded-lg font-medium transition-colors shadow-sm"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                AI 正在分析…
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                AI 自動處理
              </>
            )}
          </button>
        </div>

        {/* "Old way" comparison card */}
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-5">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">傳統方式需要做什麼？</p>
          <div className="space-y-2 text-sm text-slate-500">
            {[
              '① 開啟護理記錄系統，手動填表（5–8 分鐘）',
              '② 切到行事曆，設定下次探視提醒',
              '③ 開 Gmail，手動撰寫家屬通知信',
              '④ 切回系統，手動更新照護狀態',
              '⑤ 開 LINE/Slack，通知督導主管',
            ].map(s => (
              <p key={s} className="flex items-start gap-2">
                <span className="text-red-400 font-bold mt-0.5">✗</span>
                {s}
              </p>
            ))}
          </div>
          <p className="mt-3 text-xs font-semibold text-red-500">合計：每次探視後 15–20 分鐘行政作業</p>
        </div>
      </div>

      {/* RIGHT: AI action panel */}
      <div className="space-y-5">
        {/* Processing animation */}
        {isProcessing && (
          <div className="bg-white rounded-xl border border-sky-200 p-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-sky-600 rounded-full flex items-center justify-center animate-pulse-soft">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-slate-800">AI 正在分析探視記錄…</p>
                <p className="text-xs text-slate-500">Claude 正在提取結構化資料</p>
              </div>
            </div>
            <div className="space-y-2">
              {['讀取護理記錄…', '識別健康指標…', '分析照護警訊…', '準備後續行動…'].map((step, i) => (
                <div key={step} className="flex items-center gap-2 text-sm text-slate-600">
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {result && !isProcessing && (
          <div className="space-y-4 animate-fade-in">
            {/* Header */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-emerald-800">AI 處理完成</p>
                  <p className="text-xs text-emerald-600">
                    {elapsedMs !== null ? `${(elapsedMs / 1000).toFixed(1)} 秒` : ''}完成全部自動化動作
                    {aiMode === 'demo' && (
                      <span className="ml-2 bg-emerald-200 text-emerald-800 px-1.5 py-0.5 rounded text-xs">
                        Demo 模式
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <span className={`text-sm font-semibold px-3 py-1 rounded-full ${statusColor[result.careStatusUpdate]}`}>
                {statusLabel[result.careStatusUpdate]}
              </span>
            </div>

            {/* AI Actions (animated) */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">AI 自動執行的動作</h3>
              <div className="space-y-2">
                {result.actions.slice(0, visibleActions).map((action, i) => (
                  <div
                    key={action.id}
                    className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 animate-slide-in"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${actionColor[action.type]}`}
                    >
                      {actionIcon[action.type]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        {action.label}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">{action.detail}</p>
                    </div>
                  </div>
                ))}
                {visibleActions < result.actions.length && (
                  <div className="flex items-center gap-2 px-3 py-2 text-xs text-slate-400">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    執行中…
                  </div>
                )}
              </div>
              {visibleActions >= result.actions.length && (
                <p className="mt-3 text-xs text-center text-emerald-600 font-medium">
                  ✓ 全部 {result.actions.length} 項動作完成 — 護理師零手動輸入
                </p>
              )}
            </div>

            {/* Concerns */}
            {result.concerns.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  識別到的照護警訊
                </h3>
                <div className="space-y-2">
                  {result.concerns.map((c, i) => (
                    <div key={i} className={`border rounded-lg p-3 ${concernSeverityColor[c.severity]}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded ${concernSeverityBadge[c.severity]}`}
                        >
                          嚴重程度：{concernSeverityLabel[c.severity]}
                        </span>
                        <span className="text-xs text-slate-500 capitalize">{c.type}</span>
                      </div>
                      <p className="text-sm text-slate-700">{c.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Next steps */}
            {result.nextSteps.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-violet-500" />
                  後續行動清單
                </h3>
                <div className="space-y-2">
                  {result.nextSteps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-violet-50 border border-violet-100">
                      <span className="w-5 h-5 flex-shrink-0 bg-violet-200 text-violet-800 rounded-full text-xs flex items-center justify-center font-bold">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm text-slate-700 font-medium">{step.action}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                          <span>期限：{step.deadline}</span>
                          <span>負責人：{assigneeLabel[step.assignee] ?? step.assignee}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Supervisor alert */}
            {result.supervisorAlert && result.supervisorAlertMessage && (
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Bell className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-orange-800 mb-1">已自動通知督導</p>
                    <p className="text-sm text-orange-700">{result.supervisorAlertMessage}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Family message */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <button
                className="w-full flex items-center justify-between text-sm font-semibold text-slate-700"
                onClick={() => setShowFamilyMessage(v => !v)}
              >
                <span className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-sky-500" />
                  家屬通知草稿（AI 自動生成）
                </span>
                {showFamilyMessage ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showFamilyMessage && (
                <div className="mt-4 animate-fade-in">
                  <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                    {result.familyMessageDraft}
                  </div>
                  <button
                    onClick={copyFamilyMessage}
                    className="mt-3 flex items-center gap-2 text-sm text-sky-600 hover:text-sky-800 font-medium transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-500" />
                        已複製
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        複製通知內容
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Visit summary */}
            <div className="bg-slate-900 text-white rounded-xl p-4">
              <p className="text-xs text-slate-400 mb-1">AI 摘要</p>
              <p className="text-sm font-medium leading-relaxed">{result.visitSummary}</p>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!result && !isProcessing && (
          <div className="bg-white rounded-xl border border-dashed border-slate-300 p-10 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-sky-300" />
            </div>
            <p className="text-slate-500 text-sm font-medium">選擇範例情境或輸入探視記錄</p>
            <p className="text-slate-400 text-xs mt-1">點擊「AI 自動處理」，見證系統如何秒速完成所有行政工作</p>
          </div>
        )}
      </div>
    </div>
  );
}

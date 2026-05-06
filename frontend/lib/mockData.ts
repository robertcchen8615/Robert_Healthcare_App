import { Patient, ActivityFeedItem, ProcessVisitResult } from './types';

export const mockPatients: Patient[] = [
  {
    id: 'p001',
    name: '張志明',
    age: 78,
    conditions: ['高血壓', '糖尿病', '慢性腎病'],
    careStatus: 'monitoring',
    lastVisit: '2026-05-05',
    nextVisit: '2026-05-12',
    primaryNurse: '陳護理師',
    familyContact: '張小明（兒子）',
  },
  {
    id: 'p002',
    name: '李美玉',
    age: 82,
    conditions: ['心臟病', '骨質疏鬆'],
    careStatus: 'stable',
    lastVisit: '2026-05-04',
    nextVisit: '2026-05-11',
    primaryNurse: '林護理師',
    familyContact: '李大華（女兒）',
  },
  {
    id: 'p003',
    name: '王建國',
    age: 71,
    conditions: ['帕金森症', '憂鬱症'],
    careStatus: 'improving',
    lastVisit: '2026-05-06',
    nextVisit: '2026-05-13',
    primaryNurse: '陳護理師',
    familyContact: '王玉梅（配偶）',
  },
  {
    id: 'p004',
    name: '陳素珍',
    age: 85,
    conditions: ['失智症', '高血壓'],
    careStatus: 'critical',
    lastVisit: '2026-05-05',
    nextVisit: '2026-05-07',
    primaryNurse: '黃護理師',
    familyContact: '陳大勇（兒子）',
  },
  {
    id: 'p005',
    name: '黃文雄',
    age: 69,
    conditions: ['慢性阻塞性肺病', '糖尿病'],
    careStatus: 'stable',
    lastVisit: '2026-05-03',
    nextVisit: '2026-05-10',
    primaryNurse: '林護理師',
    familyContact: '黃美蘭（配偶）',
  },
];

export const mockActivityFeed: ActivityFeedItem[] = [
  {
    id: 'a001',
    timestamp: '10:32',
    patientName: '張志明',
    action: '自動更新血壓記錄：165/95 mmHg（偏高警示）',
    type: 'alert',
    severity: 'warning',
  },
  {
    id: 'a002',
    timestamp: '10:32',
    patientName: '張志明',
    action: '草擬家屬通知：張先生今日血壓偏高，建議確認回診安排',
    type: 'message',
    severity: 'normal',
  },
  {
    id: 'a003',
    timestamp: '10:33',
    patientName: '張志明',
    action: '更新照護狀態：穩定 → 監測中',
    type: 'status',
    severity: 'warning',
  },
  {
    id: 'a004',
    timestamp: '10:33',
    patientName: '張志明',
    action: '通知督導：血壓持續偏高，本週回診優先處理',
    type: 'notify',
    severity: 'warning',
  },
  {
    id: 'a005',
    timestamp: '09:15',
    patientName: '王建國',
    action: '更新護理記錄：帕金森顫抖症狀改善，步態較穩定',
    type: 'record',
    severity: 'normal',
  },
  {
    id: 'a006',
    timestamp: '09:15',
    patientName: '王建國',
    action: '更新照護狀態：監測中 → 改善中',
    type: 'status',
    severity: 'normal',
  },
  {
    id: 'a007',
    timestamp: '08:45',
    patientName: '陳素珍',
    action: '緊急警示：失智症患者今晨遊走行為，家屬已通知',
    type: 'alert',
    severity: 'critical',
  },
];

export const sampleVisitNotes = [
  {
    label: '高血壓患者探視',
    patientId: 'p001',
    note: '今天去探視張志明先生，他說最近一直頭暈，量了血壓是165/95，他提到下週要去看心臟科門診。他也說有時候忘記吃降壓藥。目前精神還好，但走路有點不穩。',
  },
  {
    label: '穩定病人回訪',
    patientId: 'p002',
    note: '李美玉女士今天狀態不錯，血壓125/80，精神好，食慾正常。她說關節最近比較不痛了，走路比上次穩。家屬說她睡眠也改善了。下個月繼續追蹤，不需要特別處理。',
  },
  {
    label: '緊急狀況回報',
    patientId: 'p004',
    note: '陳素珍女士今天有點異常，早上六點就起來遊走，找不到自己的房間。家屬說她昨晚也睡不好。血壓有點高145/90，表情看起來焦慮不安。感覺失智症狀可能在惡化，需要立刻請醫師評估。',
  },
];

export const demoCriticalResult: ProcessVisitResult = {
  measurements: {
    bloodPressure: { systolic: 165, diastolic: 95 },
  },
  concerns: [
    {
      type: 'health',
      severity: 'high',
      description: '血壓明顯偏高（165/95），達高血壓二期標準，伴隨頭暈症狀',
    },
    {
      type: 'medication',
      severity: 'medium',
      description: '患者表示有時忘記服用降壓藥，用藥依從性不佳',
    },
    {
      type: 'safety',
      severity: 'medium',
      description: '步態不穩，有跌倒風險，需評估居家安全',
    },
  ],
  nextSteps: [
    {
      action: '確認下週心臟科回診安排，必要時協助交通',
      deadline: '3天內',
      assignee: 'nurse',
    },
    {
      action: '與家屬討論降壓藥提醒機制（手機鬧鐘或藥盒）',
      deadline: '本週內',
      assignee: 'family',
    },
    {
      action: '評估是否需要物理治療師評估步態與居家安全',
      deadline: '下次探視',
      assignee: 'doctor',
    },
  ],
  familyMessageDraft:
    '張先生家屬您好，\n\n今日（5月6日）探視時，張先生表示近來持續頭暈，量得血壓為 165/95 mmHg，稍微偏高。此外，他提到有時會忘記服用降壓藥。\n\n建議事項：\n1. 本週確認下週心臟科的回診時間\n2. 協助提醒按時服藥（建議設定手機鬧鐘或使用分格藥盒）\n3. 張先生走路稍有不穩，請在家中注意地板防滑安全\n\n如有任何問題或病情變化，歡迎隨時聯繫。\n\n敬祝平安\n大心居護所 護理團隊',
  careStatusUpdate: 'monitoring',
  visitSummary: '血壓偏高伴頭暈、用藥依從性不佳、步態不穩——需密切監測並強化支持',
  supervisorAlert: true,
  supervisorAlertMessage:
    '【需關注】張志明（P001）血壓 165/95 持續偏高，且有用藥依從性問題。本週心臟科回診前請加強評估，必要時考慮調整照護計畫或請醫師提前介入。',
  actions: [
    {
      id: 'act1',
      type: 'update_record',
      label: '更新護理記錄',
      detail: 'BP 165/95、頭暈、步態不穩、偶發忘服藥——已自動記錄至系統',
      status: 'done',
    },
    {
      id: 'act2',
      type: 'flag_concern',
      label: '識別照護警訊',
      detail: '高血壓二期 + 用藥依從性不佳 + 跌倒風險（3項警訊）',
      status: 'done',
    },
    {
      id: 'act3',
      type: 'identify_next_step',
      label: '辨識後續行動',
      detail: '確認心臟科回診 / 家屬協助用藥提醒 / 評估物理治療需求',
      status: 'done',
    },
    {
      id: 'act4',
      type: 'draft_message',
      label: '草擬家屬通知',
      detail: '已自動草擬給張先生家屬的健康狀況更新通知（可一鍵發送）',
      status: 'done',
    },
    {
      id: 'act5',
      type: 'update_status',
      label: '更新照護狀態',
      detail: '穩定（Stable）→ 監測中（Monitoring）——血壓偏高需密切追蹤',
      status: 'done',
    },
    {
      id: 'act6',
      type: 'notify_supervisor',
      label: '通知督導',
      detail: '已自動通知督導：持續高血壓，建議本週優先處理',
      status: 'done',
    },
  ],
};

export const demoStableResult: ProcessVisitResult = {
  measurements: {
    bloodPressure: { systolic: 125, diastolic: 80 },
  },
  concerns: [],
  nextSteps: [
    {
      action: '下月例行追蹤探視',
      deadline: '一個月後',
      assignee: 'nurse',
    },
  ],
  familyMessageDraft:
    '李女士家屬您好，\n\n今日探視，李美玉女士狀態良好。血壓 125/80 正常，精神佳，食慾正常，關節疼痛改善，步態穩定，睡眠品質提升。\n\n整體照護進展順利，下月將安排例行追蹤。如有任何問題，歡迎聯繫。\n\n大心居護所 護理團隊',
  careStatusUpdate: 'stable',
  visitSummary: '各項指標正常，症狀持續改善，維持穩定照護計畫',
  supervisorAlert: false,
  actions: [
    {
      id: 'act1',
      type: 'update_record',
      label: '更新護理記錄',
      detail: 'BP 125/80、精神好、關節改善、步態穩定——已自動記錄',
      status: 'done',
    },
    {
      id: 'act2',
      type: 'identify_next_step',
      label: '辨識後續行動',
      detail: '安排下月例行追蹤探視',
      status: 'done',
    },
    {
      id: 'act3',
      type: 'draft_message',
      label: '草擬家屬通知',
      detail: '已自動草擬給李女士家屬的好消息通知',
      status: 'done',
    },
    {
      id: 'act4',
      type: 'update_status',
      label: '確認照護狀態',
      detail: '穩定（Stable）——持續維持現有照護計畫',
      status: 'done',
    },
  ],
};

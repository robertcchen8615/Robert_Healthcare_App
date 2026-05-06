import { X, Check, Clock, Zap } from 'lucide-react';

const oldSteps = [
  '護理師手動填寫護理記錄表（5–10 分鐘）',
  '手動設定下次探視提醒',
  '手動撰寫家屬通知信',
  '手動更新照護狀態',
  '手動通知督導主管',
];

const newSteps = [
  'AI 自動分析探視記錄（5 秒）',
  'AI 自動識別健康警訊與後續動作',
  'AI 自動草擬家屬通知（一鍵發送）',
  'AI 自動更新照護狀態',
  'AI 自動通知督導主管',
];

export default function ComparisonBanner() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {/* Old way */}
        <div className="p-6 border-b sm:border-b-0 sm:border-r border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-slate-500" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">傳統 CRM</p>
              <p className="text-sm font-bold text-slate-700">系統記錄（System of Record）</p>
            </div>
          </div>
          <ul className="space-y-2.5">
            {oldSteps.map(step => (
              <li key={step} className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-600">{step}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 pt-4 border-t border-slate-100">
            <p className="text-sm font-semibold text-red-600">每次探視後需 15–20 分鐘行政工作</p>
            <p className="text-xs text-slate-500 mt-1">護理師：「下班後最不想打開的東西」</p>
          </div>
        </div>

        {/* New way */}
        <div className="p-6 bg-gradient-to-br from-sky-50 to-emerald-50">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-sky-600 font-medium uppercase tracking-wide">AI-Native CRM</p>
              <p className="text-sm font-bold text-slate-700">行動系統（System of Action）</p>
            </div>
          </div>
          <ul className="space-y-2.5">
            {newSteps.map(step => (
              <li key={step} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 font-medium">{step}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 pt-4 border-t border-sky-200">
            <p className="text-sm font-semibold text-emerald-700">護理師零手動輸入，所有資料已自動就位</p>
            <p className="text-xs text-slate-500 mt-1">
              關鍵技術：Claude 3.5 Sonnet — 同時達到「準確 + 快 + 便宜」甜蜜點
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between">
        <p className="text-sm">
          <span className="text-slate-400">舊範式：</span>CRM 是被動的檔案櫃
          <span className="mx-3 text-slate-600">→</span>
          <span className="text-sky-400 font-medium">新範式：</span>CRM 是主動的虛擬同事，背後燒的是 GPU 推論
        </p>
      </div>
    </div>
  );
}

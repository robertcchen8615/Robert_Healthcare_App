import VisitProcessor from '@/components/VisitProcessor';
import { ArrowLeft, Zap, Info } from 'lucide-react';
import Link from 'next/link';

export default function NewVisitPage({
  searchParams,
}: {
  searchParams: { patientId?: string };
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          返回儀表板
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <div className="w-9 h-9 bg-sky-600 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              AI 探視記錄處理器
            </h1>
            <p className="text-slate-500 text-sm mt-1.5">
              輸入口語探視記錄，AI 自動完成所有後續行政工作——這是「行動系統」的核心體驗
            </p>
          </div>
        </div>
      </div>

      {/* Explainer */}
      <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-sky-800">
          <p className="font-semibold mb-1">傳統 vs AI-Native 的關鍵差距</p>
          <p>
            傳統 CRM：護理師探視後，需要手動填表、切換 5 個系統、輸入 15 分鐘。
            AI-Native CRM：護理師輸入口語記錄，AI 在 5 秒內完成所有動作——更新記錄、識別警訊、草擬家屬通知、通知督導。
            <span className="font-semibold"> 護理師是照護者，不是打字員。</span>
          </p>
        </div>
      </div>

      {/* Main processor */}
      <VisitProcessor initialPatientId={searchParams.patientId} />
    </div>
  );
}

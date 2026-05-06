import Link from 'next/link';
import { Users, Activity, Clock, Zap, TrendingUp } from 'lucide-react';
import PatientCard from '@/components/PatientCard';
import ActivityFeed from '@/components/ActivityFeed';
import ComparisonBanner from '@/components/ComparisonBanner';
import { mockPatients, mockActivityFeed } from '@/lib/mockData';

const stats = [
  { label: '照護患者', value: '12', icon: Users, color: 'text-sky-600 bg-sky-50' },
  { label: '今日探視', value: '3', icon: Activity, color: 'text-violet-600 bg-violet-50' },
  { label: 'AI 自動動作', value: '47', icon: Zap, color: 'text-emerald-600 bg-emerald-50' },
  { label: '節省工時', value: '14h', icon: Clock, color: 'text-amber-600 bg-amber-50' },
];

export default function DashboardPage() {
  const criticalCount = mockPatients.filter(p => p.careStatus === 'critical').length;
  const monitoringCount = mockPatients.filter(p => p.careStatus === 'monitoring').length;

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">AI-Native 照護 CRM</h1>
          <p className="text-slate-500 text-sm mt-1">大心居護所 — 行動系統（System of Action）</p>
        </div>
        <div className="text-right text-sm text-slate-500">
          <p>今日：2026年5月6日</p>
          {criticalCount > 0 && (
            <p className="text-red-600 font-medium mt-0.5">⚠ {criticalCount} 位患者需緊急關注</p>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{s.value}</p>
                <p className="text-xs text-slate-500">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-sky-600 to-sky-700 rounded-2xl p-6 flex items-center justify-between text-white shadow-lg">
        <div>
          <p className="text-sm font-medium text-sky-200 mb-1">行動系統 vs 記錄系統</p>
          <h2 className="text-xl font-bold">護理師開完探視，AI 已完成所有行政工作</h2>
          <p className="text-sky-200 text-sm mt-1">不用打字、不用切換系統、不用手動通知——全自動</p>
        </div>
        <Link
          href="/visit/new"
          className="flex-shrink-0 flex items-center gap-2 bg-white text-sky-700 hover:bg-sky-50 px-5 py-3 rounded-xl font-semibold transition-colors shadow-sm"
        >
          <Zap className="w-4 h-4" />
          體驗 AI 探視處理
        </Link>
      </div>

      {/* Comparison banner */}
      <section>
        <h2 className="text-base font-semibold text-slate-700 mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-sky-600" />
          傳統 CRM vs AI-Native CRM — 核心差異
        </h2>
        <ComparisonBanner />
      </section>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patients grid */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-slate-700 flex items-center gap-2">
              <Users className="w-4 h-4 text-sky-600" />
              患者概覽
            </h2>
            <Link href="/patients" className="text-sm text-sky-600 hover:text-sky-800 font-medium">
              查看全部
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mockPatients.slice(0, 4).map(p => (
              <PatientCard key={p.id} patient={p} />
            ))}
          </div>
          {(criticalCount > 0 || monitoringCount > 0) && (
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
              <span className="font-semibold">AI 主動警示：</span>
              {criticalCount > 0 && ` ${criticalCount} 位患者照護狀態為「緊急」`}
              {criticalCount > 0 && monitoringCount > 0 && '，'}
              {monitoringCount > 0 && ` ${monitoringCount} 位患者處於「監測中」`}
              ——無需業務主管手動追蹤，AI 自動標記。
            </div>
          )}
        </div>

        {/* Activity feed */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-slate-700 flex items-center gap-2">
              <Activity className="w-4 h-4 text-sky-600" />
              AI 行動紀錄
            </h2>
            <span className="text-xs text-slate-500">即時更新</span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <ActivityFeed items={mockActivityFeed} />
          </div>
          <p className="mt-3 text-xs text-center text-slate-400">
            以上所有動作均由 AI 自動完成，護理師零介入
          </p>
        </div>
      </div>

      {/* Bottom insight */}
      <div className="bg-slate-900 rounded-2xl p-6 text-white">
        <p className="text-sm text-slate-400 mb-2 font-medium uppercase tracking-wide">為什麼現在才有？</p>
        <blockquote className="text-base leading-relaxed text-slate-200">
          「Anthropic 在 2024 年 6 月發布 Claude 3.5 Sonnet 那一刻，一切 click into place。」
        </blockquote>
        <p className="text-sm text-slate-400 mt-3">
          AI-native CRM 的核心需求：讀懂自然語言對話 + 轉成結構化資料 + 推理後續行動。
          這三件事在 Claude 3.5 Sonnet 之前都做不夠好。直到「準確 + 快 + 便宜」的甜蜜點出現，
          這個品類才從 demo 階段變成產品階段。每個 CRM 用戶背景都在消耗 GPU 算力，且年增三倍以上。
        </p>
      </div>
    </div>
  );
}

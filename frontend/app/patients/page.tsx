import Link from 'next/link';
import { ArrowLeft, Users, AlertCircle } from 'lucide-react';
import PatientCard from '@/components/PatientCard';
import { mockPatients } from '@/lib/mockData';
import { CareStatus } from '@/lib/types';

const statusOrder: CareStatus[] = ['critical', 'monitoring', 'stable', 'improving'];

const statusGroupLabel: Record<CareStatus, string> = {
  critical: '緊急',
  monitoring: '監測中',
  stable: '穩定',
  improving: '改善中',
};

export default function PatientsPage() {
  const grouped = statusOrder
    .map(status => ({
      status,
      label: statusGroupLabel[status],
      patients: mockPatients.filter(p => p.careStatus === status),
    }))
    .filter(g => g.patients.length > 0);

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          返回儀表板
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <div className="w-9 h-9 bg-sky-600 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              患者管理
            </h1>
            <p className="text-slate-500 text-sm mt-1">照護狀態由 AI 自動評估，無需人工更新</p>
          </div>
          <Link
            href="/visit/new"
            className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            新增探視記錄
          </Link>
        </div>
      </div>

      {/* AI notice */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-800">
        <span className="font-semibold">AI 主動偵測：</span>
        以下照護狀態（緊急/監測中）均由 AI 在處理探視記錄後自動更新。
        傳統 CRM 需業務主管手動巡查，AI-Native CRM 主動標記流失/風險案例。
      </div>

      {grouped.map(group => (
        <section key={group.status}>
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-2">
            {(group.status === 'critical' || group.status === 'monitoring') && (
              <AlertCircle className="w-4 h-4 text-amber-500" />
            )}
            {group.label}
            <span className="font-normal">({group.patients.length})</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {group.patients.map(p => (
              <PatientCard key={p.id} patient={p} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

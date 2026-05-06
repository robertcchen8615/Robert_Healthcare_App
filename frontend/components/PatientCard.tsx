import Link from 'next/link';
import { Calendar, User, AlertCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Patient, CareStatus } from '@/lib/types';

const statusConfig: Record<CareStatus, { label: string; color: string; icon: React.ReactNode }> = {
  stable: {
    label: '穩定',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: <Minus className="w-3 h-3" />,
  },
  monitoring: {
    label: '監測中',
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: <AlertCircle className="w-3 h-3" />,
  },
  critical: {
    label: '緊急',
    color: 'bg-red-50 text-red-700 border-red-200',
    icon: <AlertCircle className="w-3 h-3" />,
  },
  improving: {
    label: '改善中',
    color: 'bg-sky-50 text-sky-700 border-sky-200',
    icon: <TrendingUp className="w-3 h-3" />,
  },
};

const cardBorder: Record<CareStatus, string> = {
  stable: 'border-l-emerald-400',
  monitoring: 'border-l-amber-400',
  critical: 'border-l-red-500',
  improving: 'border-l-sky-400',
};

export default function PatientCard({ patient }: { patient: Patient }) {
  const status = statusConfig[patient.careStatus];
  const border = cardBorder[patient.careStatus];

  return (
    <div
      className={`bg-white rounded-xl border border-slate-200 border-l-4 ${border} p-5 hover:shadow-md transition-all duration-200`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-slate-900 text-lg">{patient.name}</h3>
          <p className="text-sm text-slate-500">{patient.age} 歲</p>
        </div>
        <span
          className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${status.color}`}
        >
          {status.icon}
          {status.label}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {patient.conditions.map(c => (
          <span key={c} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
            {c}
          </span>
        ))}
      </div>

      <div className="space-y-1.5 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <User className="w-3.5 h-3.5" />
          <span>{patient.primaryNurse}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          <span>上次探視：{patient.lastVisit}</span>
        </div>
        {patient.nextVisit && (
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-sky-500" />
            <span className="text-sky-600 font-medium">下次探視：{patient.nextVisit}</span>
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100">
        <Link
          href={`/visit/new?patientId=${patient.id}`}
          className="text-xs text-sky-600 hover:text-sky-800 font-medium transition-colors"
        >
          + 新增探視記錄
        </Link>
      </div>
    </div>
  );
}

import { FileText, AlertTriangle, MessageSquare, Calendar, RefreshCw, Bell } from 'lucide-react';
import { ActivityFeedItem } from '@/lib/types';

const typeConfig = {
  record: { icon: FileText, color: 'text-slate-500 bg-slate-100' },
  alert: { icon: AlertTriangle, color: 'text-amber-600 bg-amber-50' },
  message: { icon: MessageSquare, color: 'text-sky-600 bg-sky-50' },
  schedule: { icon: Calendar, color: 'text-violet-600 bg-violet-50' },
  status: { icon: RefreshCw, color: 'text-emerald-600 bg-emerald-50' },
  notify: { icon: Bell, color: 'text-orange-600 bg-orange-50' },
};

const severityBg = {
  normal: '',
  warning: 'bg-amber-50/50',
  critical: 'bg-red-50/50',
};

export default function ActivityFeed({ items }: { items: ActivityFeedItem[] }) {
  return (
    <div className="space-y-1">
      {items.map(item => {
        const cfg = typeConfig[item.type];
        const Icon = cfg.icon;
        const bg = severityBg[item.severity ?? 'normal'];

        return (
          <div
            key={item.id}
            className={`flex items-start gap-3 p-3 rounded-lg ${bg} hover:bg-slate-50 transition-colors`}
          >
            <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${cfg.color}`}>
              <Icon className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-semibold text-slate-700">{item.patientName}</span>
                <span className="text-xs text-slate-400">{item.timestamp}</span>
                {item.severity === 'critical' && (
                  <span className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-medium">緊急</span>
                )}
                {item.severity === 'warning' && (
                  <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-medium">注意</span>
                )}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{item.action}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

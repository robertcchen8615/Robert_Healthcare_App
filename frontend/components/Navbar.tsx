import Link from 'next/link';
import { Activity, Users, Plus } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-slate-900">大心居護所</span>
                <span className="ml-2 text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full font-medium">
                  AI-Native CRM
                </span>
              </div>
            </Link>
            <div className="hidden sm:flex items-center gap-1">
              <Link
                href="/"
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
              >
                <Activity className="w-4 h-4" />
                儀表板
              </Link>
              <Link
                href="/patients"
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
              >
                <Users className="w-4 h-4" />
                患者管理
              </Link>
            </div>
          </div>
          <Link
            href="/visit/new"
            className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            新增探視記錄
          </Link>
        </div>
      </div>
    </nav>
  );
}

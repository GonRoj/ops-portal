export default function Topbar() {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="h-14 px-4 md:px-6 flex items-center justify-between">
        <div>
          <div className="text-slate-900 font-semibold leading-tight">Operations Portal</div>
          <div className="text-xs text-slate-500">Internal Operations Management</div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            Role: Technician
          </span>
          <div className="h-9 w-9 rounded-full bg-slate-200" title="Avatar placeholder" />
          <button className="text-sm px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
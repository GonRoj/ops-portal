import { NavLink } from "react-router-dom";

const nav = [
  { to: "/", label: "Dashboard" },
  { to: "/university", label: "Product University" },
  { to: "/analyzer", label: "Log Analyzer" },
  { to: "/training", label: "Training Mode" },
  { to: "/tickets", label: "Tickets Administrator" },
  { to: "/flows", label: "Flow Visualizer" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 shrink-0 border-r border-slate-200 bg-white hidden md:block">
      <div className="h-14 px-4 flex items-center border-b border-slate-200">
        <div className="h-8 w-8 rounded-lg bg-blue-600" />
        <div className="ml-3">
          <div className="text-sm font-semibold text-slate-900">OPS Portal</div>
          <div className="text-xs text-slate-500">Mockup</div>
        </div>
      </div>

      <nav className="p-3 space-y-1">
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                "block px-3 py-2 rounded-lg text-sm border transition",
                isActive
                  ? "bg-blue-50 text-blue-700 border-blue-200"
                  : "bg-white text-slate-700 border-transparent hover:bg-slate-50 hover:border-slate-200",
              ].join(" ")
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
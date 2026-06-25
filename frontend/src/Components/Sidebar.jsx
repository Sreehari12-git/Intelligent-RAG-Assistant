import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="h-screen w-60 bg-[#13111F] border-r border-[#2A2550]/60 flex flex-col px-4 py-6 shrink-0">

      <div className="flex items-center gap-2.5 px-2 mb-8">
        <div className="w-7 h-7 rounded-lg bg-[#6C5CE7]/20 border border-[#6C5CE7]/40 flex items-center justify-center">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#A89FE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
          </svg>
        </div>
        <p className="text-xs font-semibold tracking-widest uppercase text-[#6B6A8A]">Admin Panel</p>
      </div>

      <nav className="flex flex-col gap-1">
        <NavLink
          to="/admin/upload"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
              isActive
                ? "bg-[#6C5CE7]/15 text-[#A89FE8] border border-[#6C5CE7]/30"
                : "text-[#6B6A8A] hover:bg-[#1E1B2E] hover:text-[#D8D5F5] border border-transparent"
            }`
          }
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Upload Document
        </NavLink>

        <NavLink
          to="/admin/documents"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
              isActive
                ? "bg-[#6C5CE7]/15 text-[#A89FE8] border border-[#6C5CE7]/30"
                : "text-[#6B6A8A] hover:bg-[#1E1B2E] hover:text-[#D8D5F5] border border-transparent"
            }`
          }
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          View Documents
        </NavLink>
      </nav>

    </div>
  );
}

export default Sidebar;
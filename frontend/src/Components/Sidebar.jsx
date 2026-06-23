import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col px-4 py-6">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
        Admin Panel
      </p>

      <nav className="flex flex-col gap-1">
        <NavLink
          to="/admin/upload"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <span>📤</span> Upload Document
        </NavLink>

        <NavLink
          to="/admin/documents"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <span>📄</span> View Documents
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
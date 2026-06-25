import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";

function AdminPage() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.log(err);
    } finally {
      navigate("/chat");
    }
  };

  return (
    <div className="flex h-screen bg-[#0C0B18]">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">

        <div className="bg-[#13111F] border-b border-[#2A2550]/60 px-6 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-950/40 hover:bg-red-900/50 border border-red-800/40 hover:border-red-700/60 text-red-400 hover:text-red-300 text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-200 active:scale-[0.97]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>

        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default AdminPage;
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
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <div className="bg-white shadow px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
            <p className="font-semibold text-gray-800 text-sm">Admin Panel</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
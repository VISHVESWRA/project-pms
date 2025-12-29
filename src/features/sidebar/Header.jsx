import { Menu, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Header({ setSidebarOpen }) {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <header className="flex items-center justify-between bg-white shadow px-4 h-14 z-40">
      {/* Hamburger */}
      <button
        onClick={() => setSidebarOpen((prev) => !prev)}
        className="p-2 rounded hover:bg-gray-200"
      >
        <Menu />
      </button>

      {/* Profile */}
      <div className="relative">
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold"
        >
          V
        </button>

        {profileOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow rounded">
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full">
              <User size={16} /> Profile
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-red-600"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

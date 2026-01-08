import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Wallet,
  ShieldCheck,
  Banknote,
  Layers,
  Boxes,
  Settings,
  ChevronDown,
  ChevronRight,
  X,
} from "lucide-react";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  const [openMenu, setOpenMenu] = useState({
    policies: false,
    loans: false,
    chits: false,
  });

  const toggleMenu = (key) => {
    setOpenMenu((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  const subLinkClass = ({ isActive }) =>
    `flex items-center gap-2 pl-12 pr-4 py-2 text-sm rounded-md transition ${
      isActive ? "text-blue-400" : "text-gray-400 hover:text-white"
    }`;

  return (
    <>
      {/* Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed md:static z-50 top-0 left-0 min-h-screen w-64 bg-gray-900 p-4 transform transition-transform duration-300
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-white">PMS</h2>
          <button
            className="md:hidden text-gray-300"
            onClick={() => setSidebarOpen(false)}
          >
            <X />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <NavLink
            to="/dashboard"
            end
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
          <NavLink
            to="/hrDashboard"
            end
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            <LayoutDashboard size={18} /> New Dashboard
          </NavLink>

          <NavLink
            to="/dashboard/income/list"
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            <Wallet size={18} /> Income
          </NavLink>

          <NavLink
            to="/dashboard/expenses/list"
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            <Wallet size={18} /> Expenses
          </NavLink>

          {/* POLICIES */}
          <button
            onClick={() => toggleMenu("policies")}
            className="w-full flex items-center justify-between px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg"
          >
            <span className="flex items-center gap-3">
              <ShieldCheck size={18} /> Policies
            </span>
            {openMenu.policies ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </button>

          {openMenu.policies && (
            <div className="space-y-1">
              <NavLink
                to="/dashboard/policies/list"
                className={subLinkClass}
                onClick={() => setSidebarOpen(false)}
              >
                • List
              </NavLink>
              <NavLink
                to="/dashboard/policies/status"
                className={subLinkClass}
                onClick={() => setSidebarOpen(false)}
              >
                • Status
              </NavLink>
            </div>
          )}

          {/* LOANS */}

          <NavLink
            to="/dashboard/loan/list"
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            <Banknote size={18} /> Loans
          </NavLink>
          {/* <button
            onClick={() => toggleMenu("loans")}
            className="w-full flex items-center justify-between px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg"
          >
            <span className="flex items-center gap-3">
              <Banknote size={18} /> Loans
            </span>
            {openMenu.loans ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </button> */}

          {/* {openMenu.loans && (
            <div className="space-y-1">
              <NavLink
                to="/dashboard/loans/list"
                className={subLinkClass}
                onClick={() => setSidebarOpen(false)}
              >
                • List
              </NavLink>
              <NavLink
                to="/dashboard/loans/status"
                className={subLinkClass}
                onClick={() => setSidebarOpen(false)}
              >
                • Status
              </NavLink>
            </div>
          )} */}

          {/* CHITS */}
          <NavLink
            to="/dashboard/chits/list"
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            <Layers size={18} /> Chits
          </NavLink>

          {/* <button
            onClick={() => toggleMenu("chits")}
            className="w-full flex items-center justify-between px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg"
          >
            <span className="flex items-center gap-3">
              <Layers size={18} /> Chits
            </span>
            {openMenu.chits ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </button>

          {openMenu.chits && (
            <div className="space-y-1">
              <NavLink
                to="/dashboard/chits/list"
                className={subLinkClass}
                onClick={() => setSidebarOpen(false)}
              >
                • List
              </NavLink>
              <NavLink
                to="/dashboard/chits/status"
                className={subLinkClass}
                onClick={() => setSidebarOpen(false)}
              >
                • Status
              </NavLink>
            </div>
          )} */}

          <NavLink
            to="/dashboard/misc"
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            <Boxes size={18} /> Misc
          </NavLink>

          <NavLink
            to="/dashboard/settings"
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            <Settings size={18} /> Settings
          </NavLink>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;

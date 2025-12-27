import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../features/sidebar/Sidebar";
import Header from "../features/sidebar/Header";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(
    window.innerWidth >= 768 // open by default on desktop
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex flex-col flex-1 min-h-0 overflow-auto">
        <Header setSidebarOpen={setSidebarOpen} />

        {/* <main className="flex-1 min-h-0 overflow-y-auto bg-gray-100 p-4">
          <Outlet />
        </main> */}

        <main className="flex-1 overflow-auto bg-gray-200 p-4">
          <div className="max-w-screen mx-auto space-y-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;

import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Calendar,
  Search,
  Plus,
  Shield,
  CreditCard,
  Layers,
  DollarSign,
  FileText,
  Settings,
  Menu,
  Home,
  Bell,
  ChevronRight,
  Activity,
  Target,
  Award,
  Users,
} from "lucide-react";
import Sidebar from "../features/sidebar/testside/SideBar";
import Header from "../features/sidebar/testside/TestHeader";
import { Outlet } from "react-router-dom";

// Main Layout Component with Outlet
const PMSLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/pmsDashboard/home" },
    { icon: DollarSign, label: "Income", path: "/pmsDashboard/income/list" },
    {
      icon: CreditCard,
      label: "Expenses",
      path: "/pmsDashboard/expenses/list",
    },
    {
      icon: Shield,
      label: "Policies",
      path: "/pmsDashboard/policiesStatus",
      hasSubmenu: true,
    },
    { icon: Wallet, label: "Loans", path: "/pmsDashboard/loanStatus" },
    { icon: Layers, label: "Chits", path: "/pmsDashboard/chitStatus" },
    { icon: FileText, label: "Documents", path: "/pmsDashboard/documents" },
    { icon: FileText, label: "Misc", path: "/pmsDashboard/misc" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const pageTitles = {
    "/": "PMS Overview",
    "/income": "Income Management",
    "/expenses": "Expense Tracking",
    "/policies": "Insurance Policies",
    "/loans": "Loan Management",
    "/chits": "Chit Funds",
    "/misc": "Miscellaneous",
    "/settings": "Settings",
  };

  const currentTitle = pageTitles[window.location.pathname] || "PMS Overview";

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        menuItems={menuItems}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          title={currentTitle}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* This is where your routed content will appear */}
          <div className="outlet-content">
            {/* Your Router's <Outlet /> will render here */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default PMSLayout;

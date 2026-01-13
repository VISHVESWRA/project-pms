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

// Sidebar Component
export default function Sidebar({ isOpen, toggleSidebar, menuItems }) {
  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-slate-900/80 backdrop-blur-xl border-r border-slate-800/50 transition-all duration-300 flex flex-col ${
        isOpen ? "fixed md:relative" : "hidden md:flex"
      } z-50 h-screen`}
    >
      <div className="p-6 flex items-center justify-between border-b border-slate-800/50">
        {isOpen && (
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 via-violet-500 to-purple-600 flex items-center justify-center font-bold shadow-lg shadow-violet-500/50">
                <span className="text-white">P</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900"></div>
            </div>
            <div>
              <h1 className="font-bold text-lg text-white">PMS</h1>
              <p className="text-xs text-slate-400">Pro Suite</p>
            </div>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-slate-800/50 rounded-lg transition-all text-slate-400 hover:text-white"
        >
          <Menu size={20} />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item, idx) => (
          <a
            key={idx}
            href={item.path}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
              window.location.pathname === item.path
                ? "bg-gradient-to-r from-blue-500/20 to-violet-500/20 text-white border border-blue-500/30 shadow-lg shadow-blue-500/10"
                : "text-slate-400 hover:bg-slate-800/30 hover:text-white"
            }`}
          >
            <item.icon
              size={20}
              className={
                window.location.pathname === item.path ? "text-blue-400" : ""
              }
            />
            {isOpen && (
              <>
                <span className="flex-1 text-left font-medium text-sm">
                  {item.label}
                </span>
                {item.hasSubmenu && (
                  <ChevronRight size={16} className="opacity-50" />
                )}
              </>
            )}
          </a>
        ))}
      </nav>

      {isOpen && (
        <div className="p-4 border-t border-slate-800/50">
          <div className="bg-gradient-to-br from-blue-500/10 to-violet-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                <Award size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-400">Credit Score</p>
                <p className="text-sm font-bold text-white">750</p>
              </div>
            </div>
            <div className="h-1.5 bg-slate-800/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
                style={{ width: "75%" }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

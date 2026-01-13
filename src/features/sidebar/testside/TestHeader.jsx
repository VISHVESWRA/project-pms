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

export default function Header({ toggleSidebar, title }) {
  return (
    <header className="bg-slate-900/50 backdrop-blur-xl border-b border-slate-800/50 px-4 md:px-8 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 hover:bg-slate-800/50 rounded-lg transition-colors text-slate-400"
          >
            <Menu size={20} />
          </button>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              {title}
            </h2>
            <p className="text-slate-400 mt-0.5 text-xs md:text-sm hidden sm:block">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden lg:block">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="text"
              placeholder="Search transactions..."
              className="pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm focus:outline-none focus:border-blue-500/50 focus:bg-slate-800 text-white w-64 transition-all"
            />
          </div>
          <button className="p-2.5 hover:bg-slate-800/50 rounded-lg transition-all hidden md:block">
            <Calendar size={20} className="text-slate-400" />
          </button>
          <button className="relative p-2.5 hover:bg-slate-800/50 rounded-lg transition-all">
            <Bell size={20} className="text-slate-400" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
          </button>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 via-violet-500 to-purple-600 flex items-center justify-center font-bold shadow-lg shadow-violet-500/30 cursor-pointer hover:shadow-violet-500/50 transition-all">
            <span className="text-white">V</span>
          </div>
        </div>
      </div>
    </header>
  );
}

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
  Clock,
  Users,
} from "lucide-react";

const PMSDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");

  const menuItems = [
    { icon: Home, label: "Dashboard", id: "dashboard" },
    { icon: DollarSign, label: "Income", id: "income" },
    { icon: CreditCard, label: "Expenses", id: "expenses" },
    { icon: Shield, label: "Policies", id: "policies", hasSubmenu: true },
    { icon: Wallet, label: "Loans", id: "loans" },
    { icon: Layers, label: "Chits", id: "chits" },
    { icon: FileText, label: "Misc", id: "misc" },
    { icon: Settings, label: "Settings", id: "settings" },
  ];

  const financialOverview = [
    {
      label: "Total Income",
      value: "₹1,30,000",
      change: "+12.5%",
      trend: "up",
      gradient: "from-emerald-400 via-emerald-500 to-emerald-600",
      icon: TrendingUp,
      bgGlow: "bg-emerald-500/20",
    },
    {
      label: "Total Expenses",
      value: "₹5,080",
      change: "-3.2%",
      trend: "down",
      gradient: "from-rose-400 via-rose-500 to-rose-600",
      icon: TrendingDown,
      bgGlow: "bg-rose-500/20",
    },
    {
      label: "Net Balance",
      value: "₹1,24,920",
      change: "+8.3%",
      trend: "up",
      gradient: "from-blue-400 via-blue-500 to-blue-600",
      icon: Wallet,
      bgGlow: "bg-blue-500/20",
    },
    {
      label: "Investments",
      value: "₹2,50,000",
      change: "+15.2%",
      trend: "up",
      gradient: "from-violet-400 via-violet-500 to-violet-600",
      icon: Target,
      bgGlow: "bg-violet-500/20",
    },
  ];

  const loansData = [
    {
      name: "Business Loan",
      bank: "State Bank of India",
      remaining: "₹5,00,000",
      emi: "₹0/month",
      status: "Upcoming",
      progress: 0,
      statusColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    },
    {
      name: "Personal Loan",
      bank: "HDFC Bank",
      remaining: "₹26,000",
      emi: "₹4,000/month",
      status: "Active",
      progress: 87,
      statusColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    {
      name: "Education Loan",
      bank: "ICICI Bank",
      remaining: "₹3,80,000",
      emi: "₹20,000/month",
      status: "Active",
      progress: 24,
      statusColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
  ];

  const policiesData = [
    {
      name: "Life Insurance Premium",
      provider: "LIC of India",
      premium: "₹25,000",
      period: "Annual",
      status: "Active",
      icon: Shield,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      name: "Health Insurance",
      provider: "Star Health",
      premium: "₹15,000",
      period: "Annual",
      status: "Active",
      icon: Activity,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      name: "Vehicle Insurance",
      provider: "ICICI Lombard",
      premium: "₹8,500",
      period: "Annual",
      status: "Expiring Soon",
      icon: Award,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
  ];

  const chitsData = [
    {
      name: "Chit Fund Group A",
      group: "Community Group",
      monthly: "₹5,000",
      members: "20 Members",
      totalValue: "₹1,00,000",
      status: "Active",
    },
    {
      name: "Chit Fund Group B",
      group: "Office Circle",
      monthly: "₹10,000",
      members: "25 Members",
      totalValue: "₹2,50,000",
      status: "Active",
    },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-slate-900/80 backdrop-blur-xl border-r border-slate-800/50 transition-all duration-300 flex flex-col ${
          sidebarOpen ? "fixed md:relative" : "hidden md:flex"
        } z-50 h-screen`}
      >
        <div className="p-6 flex items-center justify-between border-b border-slate-800/50">
          {sidebarOpen && (
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 via-violet-500 to-purple-600 flex items-center justify-center font-bold shadow-lg shadow-violet-500/50">
                  <span className="text-white">P</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900"></div>
              </div>
              <div>
                <h1 className="font-bold text-lg text-white">FinanceHub</h1>
                <p className="text-xs text-slate-400">Pro Suite</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-800/50 rounded-lg transition-all text-slate-400 hover:text-white"
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
                item.id === activeSection
                  ? "bg-gradient-to-r from-blue-500/20 to-violet-500/20 text-white border border-blue-500/30 shadow-lg shadow-blue-500/10"
                  : "text-slate-400 hover:bg-slate-800/30 hover:text-white"
              }`}
            >
              <item.icon
                size={20}
                className={item.id === activeSection ? "text-blue-400" : ""}
              />
              {sidebarOpen && (
                <>
                  <span className="flex-1 text-left font-medium text-sm">
                    {item.label}
                  </span>
                  {item.hasSubmenu && (
                    <ChevronRight size={16} className="opacity-50" />
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        {sidebarOpen && (
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-slate-900/50 backdrop-blur-xl border-b border-slate-800/50 px-4 md:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 hover:bg-slate-800/50 rounded-lg transition-colors text-slate-400"
              >
                <Menu size={20} />
              </button>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  Financial Overview
                </h2>
                <p className="text-slate-400 mt-0.5 text-xs md:text-sm hidden sm:block">
                  Monday, January 12, 2026
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

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* Financial Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            {financialOverview.map((item, idx) => (
              <div
                key={idx}
                className="group relative bg-slate-900/40 backdrop-blur-xl border border-slate-700/40 rounded-2xl p-6 
  hover:border-violet-500/30 transition-all duration-300 
  hover:shadow-glow-md hover:-translate-y-1
  overflow-hidden"
              >
                <div
                  className={`absolute inset-0 ${item.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl`}
                ></div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-lg bg-gradient-to-br ${item.gradient} shadow-lg`}
                    >
                      <item.icon size={22} className="text-white" />
                    </div>
                    <div
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        item.trend === "up"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      }`}
                    >
                      {item.trend === "up" ? (
                        <ArrowUpRight size={14} />
                      ) : (
                        <ArrowDownRight size={14} />
                      )}
                      {item.change}
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm font-medium mb-1.5">
                    {item.label}
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    {item.value}
                  </p>
                  <div className="mt-4 h-1 bg-slate-800/50 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${item.gradient} rounded-full`}
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            {/* Loans Section */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl overflow-hidden hover:border-slate-700/50 transition-all">
              <div className="p-6 border-b border-slate-800/50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-violet-500/10">
                    <Wallet size={20} className="text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-white">
                      Loan Portfolio
                    </h3>
                    <p className="text-xs text-slate-500">3 Active Accounts</p>
                  </div>
                </div>
                <button className="text-blue-400 hover:text-blue-300 text-xs md:text-sm font-medium transition-colors">
                  Manage
                </button>
              </div>
              <div className="p-6 space-y-4">
                {loansData.map((loan, idx) => (
                  <div
                    key={idx}
                    className="group bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700/30 rounded-lg p-4 transition-all cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <p className="font-semibold text-white text-sm mb-0.5">
                          {loan.name}
                        </p>
                        <p className="text-xs text-slate-400">{loan.bank}</p>
                      </div>
                      <span
                        className={`text-xs px-2.5 py-1 rounded-md font-medium border ${loan.statusColor}`}
                      >
                        {loan.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Balance</p>
                        <p className="text-sm font-bold text-white">
                          {loan.remaining}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">EMI</p>
                        <p className="text-sm font-bold text-white">
                          {loan.emi}
                        </p>
                      </div>
                    </div>
                    {loan.status === "Active" && (
                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-slate-500">Progress</span>
                          <span className="text-slate-400 font-medium">
                            {loan.progress}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-500"
                            style={{ width: `${loan.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Policies Section */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl overflow-hidden hover:border-slate-700/50 transition-all">
              <div className="p-6 border-b border-slate-800/50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Shield size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-white">
                      Insurance
                    </h3>
                    <p className="text-xs text-slate-500">3 Active Policies</p>
                  </div>
                </div>
                <button className="text-blue-400 hover:text-blue-300 text-xs md:text-sm font-medium transition-colors">
                  Manage
                </button>
              </div>
              <div className="p-6 space-y-4">
                {policiesData.map((policy, idx) => (
                  <div
                    key={idx}
                    className="group bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700/30 rounded-lg p-4 transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`p-2.5 rounded-lg ${policy.bg}`}>
                        <policy.icon size={18} className={policy.color} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-white text-sm mb-0.5">
                          {policy.name}
                        </p>
                        <p className="text-xs text-slate-400">
                          {policy.provider}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">Premium</p>
                        <p className="text-sm font-bold text-white">
                          {policy.premium}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500 mb-0.5">Period</p>
                        <p className="text-sm font-medium text-slate-300">
                          {policy.period}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chits Section */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl overflow-hidden hover:border-slate-700/50 transition-all">
              <div className="p-6 border-b border-slate-800/50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10">
                    <Layers size={20} className="text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-white">
                      Chit Funds
                    </h3>
                    <p className="text-xs text-slate-500">2 Active Groups</p>
                  </div>
                </div>
                <button className="text-blue-400 hover:text-blue-300 text-xs md:text-sm font-medium transition-colors">
                  Manage
                </button>
              </div>
              <div className="p-6 space-y-4">
                {chitsData.map((chit, idx) => (
                  <div
                    key={idx}
                    className="group bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700/30 rounded-lg p-4 transition-all cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <p className="font-semibold text-white text-sm mb-0.5">
                          {chit.name}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span>{chit.group}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Users size={12} />
                            {chit.members}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-md font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {chit.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-700/50">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Monthly</p>
                        <p className="text-sm font-bold text-white">
                          {chit.monthly}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">
                          Total Value
                        </p>
                        <p className="text-sm font-bold text-white">
                          {chit.totalValue}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg font-medium transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 flex items-center justify-center gap-2">
                  <Plus size={18} />
                  <span className="text-sm">Add Chit Fund</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6 hover:border-slate-700/50 transition-all">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Quick Actions</h3>
              <span className="text-xs text-slate-500 font-medium">
                Frequently Used
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
              {[
                {
                  label: "Add Income",
                  icon: Plus,
                  gradient: "from-emerald-500 to-green-600",
                  shadow: "shadow-emerald-500/20 hover:shadow-emerald-500/40",
                },
                {
                  label: "Add Expense",
                  icon: Plus,
                  gradient: "from-rose-500 to-red-600",
                  shadow: "shadow-rose-500/20 hover:shadow-rose-500/40",
                },
                {
                  label: "New Loan",
                  icon: Wallet,
                  gradient: "from-violet-500 to-purple-600",
                  shadow: "shadow-violet-500/20 hover:shadow-violet-500/40",
                },
                {
                  label: "New Policy",
                  icon: Shield,
                  gradient: "from-blue-500 to-cyan-600",
                  shadow: "shadow-blue-500/20 hover:shadow-blue-500/40",
                },
                {
                  label: "New Chit",
                  icon: Layers,
                  gradient: "from-cyan-500 to-teal-600",
                  shadow: "shadow-cyan-500/20 hover:shadow-cyan-500/40",
                },
              ].map((action, idx) => (
                <button
                  key={idx}
                  className={`group relative flex flex-col items-center justify-center p-5 md:p-6 rounded-lg bg-gradient-to-br ${action.gradient} transition-all hover:-translate-y-1 shadow-lg ${action.shadow} overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors"></div>
                  <action.icon
                    size={24}
                    className="text-white mb-2 relative z-10"
                  />
                  <span className="text-white font-medium text-xs md:text-sm relative z-10">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PMSDashboard;

import React, { use, useEffect, useState } from "react";
import { Users, Briefcase, FolderOpen } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";

export default function HRDashboard() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [showOutlet, setShowOutlet] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/hrDashboard/home" },
    { name: "Income", path: "/income" },
    { name: "Expenses", path: "/expenses" },
    { name: "Policies", path: "/hrDashboard/policiesStatus" },
    { name: "Loans", path: "/hrDashboard/loanStatus" },
    { name: "Chits", path: "/hrDashboard/chitStatus" },
    { name: "Documents", path: "/hrDashboard/documents" },
    { name: "Misc", path: "/misc" },
    { name: "Setting", path: "/home" },
  ];

  // Get active menu from current URL path on mount and when path changes
  useEffect(() => {
    const path = window.location.pathname;
    const menuItem = menuItems.find((item) => path.includes(item.path));
    if (menuItem) {
      setActiveMenu(menuItem.name.toLowerCase());
    }
  }, []);

  const handleNavigation = (path, menuId) => {
    setActiveMenu(menuId);
    setMenuOpen(false);
    // In your actual app with react-router, navigation will automatically show the Outlet content
    setShowOutlet(menuId !== "dashboard");
    navigate(path);
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-yellow-50 via-white to-yellow-100 rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="text-xl sm:text-2xl font-bold border-2 border-black rounded-full px-4 sm:px-6 py-1.5 sm:py-2">
              PMS
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex gap-2">
              {menuItems.map((item, i) => (
                <button
                  key={item.name}
                  onClick={() =>
                    handleNavigation(item.path, item.name.toLowerCase())
                  }
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    activeMenu === item.name.toLowerCase()
                      ? "bg-gray-800 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            <div className="flex gap-2 sm:gap-3">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="xl:hidden p-2 hover:bg-gray-100 rounded-full"
              >
                ☰
              </button>

              <button className="p-2 hover:bg-gray-100 rounded-full">⚙️</button>
              <button className="p-2 hover:bg-gray-100 rounded-full">🔔</button>
              <button className="p-2 hover:bg-gray-100 rounded-full text-white bg-blue-500 w-8 h-8 flex items-center justify-center text-sm">
                V
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {menuOpen && (
            <nav className="xl:hidden mt-4 flex flex-wrap gap-2">
              {menuItems.map((item, i) => (
                <button
                  key={item.name}
                  onClick={() =>
                    handleNavigation(item.path, item.name.toLowerCase())
                  }
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    activeMenu === item.name.toLowerCase()
                      ? "bg-gray-800 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          )}
        </header>

        {/* Content Area - This is where Outlet will render in your actual app */}
        <div>
          {/* Welcome Section */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
            Welcome in
          </h1>

          {/* Stats Bar */}
          {/* <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6 sm:mb-8">
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <div>
                <div className="text-xs sm:text-sm text-gray-600 mb-2">
                  Interviews
                </div>
                <div className="bg-gray-800 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium">
                  15%
                </div>
              </div>
              <div>
                <div className="text-xs sm:text-sm text-gray-600 mb-2">
                  Hired
                </div>
                <div className="bg-yellow-400 text-gray-800 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium">
                  15%
                </div>
              </div>
              <div>
                <div className="text-xs sm:text-sm text-gray-600 mb-2">
                  Project time
                </div>
                <div className="bg-linear-to-r from-gray-200 to-gray-100 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium">
                  60%
                </div>
              </div>
              <div>
                <div className="text-xs sm:text-sm text-gray-600 mb-2">
                  Output
                </div>
                <div className="border-2 border-gray-300 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium">
                  10%
                </div>
              </div>
            </div>

            <div className="flex gap-6 sm:gap-8">
              <div className="text-center">
                <div className="flex items-center gap-2 text-2xl sm:text-3xl lg:text-4xl font-bold">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8" />
                  78
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Employee</div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2 text-2xl sm:text-3xl lg:text-4xl font-bold">
                  <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" />
                  56
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Hirings</div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2 text-2xl sm:text-3xl lg:text-4xl font-bold">
                  <FolderOpen className="w-6 h-6 sm:w-8 sm:h-8" />
                  203
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Projects</div>
              </div>
            </div>
          </div> */}

          {/* Outlet Content Area */}
          <div className="mt-6">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* Main Content Grid */
}
{
  /* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-12 gap-4 sm:gap-6">
          Employee Card
          <div className="sm:col-span-2 lg:col-span-1 xl:col-span-3 bg-linear-to-br from-gray-300 to-gray-400 rounded-3xl p-6 relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop"
              alt="Employee"
              className="w-full h-64 object-cover rounded-2xl mb-4"
            />
            <div className="text-white">
              <h3 className="text-xl font-bold">Lora Piterson</h3>
              <p className="text-sm opacity-90">UX/UI Designer</p>
            </div>
            <div className="absolute bottom-6 right-6 bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-medium">
              $1,200
            </div>
          </div>

          Progress Card
          <div className="sm:col-span-2 lg:col-span-1 xl:col-span-3 bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Progress</h3>
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="mb-4">
              <div className="text-4xl font-bold">6.1h</div>
              <div className="text-sm text-gray-600">
                Work Time
                <br />
                this week
              </div>
            </div>
            <div className="flex justify-between items-end h-32 border-b border-gray-200 pb-2">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                <div key={day} className="flex flex-col items-center gap-2">
                  <div
                    className={`w-3 rounded-full ${
                      i === 5 ? "bg-yellow-400 h-24" : "bg-gray-800"
                    }`}
                    style={{ height: `${[40, 60, 50, 70, 60][i] || 0}%` }}
                  />
                  {i === 5 && (
                    <div className="absolute bg-yellow-400 text-xs px-2 py-1 rounded -mt-8 font-medium">
                      5h 23m
                    </div>
                  )}
                  <span className="text-xs text-gray-500">{day}</span>
                </div>
              ))}
            </div>
          </div>

          Time Tracker
          <div className="sm:col-span-2 lg:col-span-1 xl:col-span-3 bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Time tracker</h3>
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="relative w-48 h-48 mx-auto mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="12"
                  strokeDasharray="502"
                  strokeDashoffset="150"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold">02:35</div>
                <div className="text-sm text-gray-600">Work Time</div>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200">
                <Play className="w-5 h-5" />
              </button>
              <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200">
                <Pause className="w-5 h-5" />
              </button>
              <button className="p-4 bg-gray-800 text-white rounded-full hover:bg-gray-700">
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>

          Onboarding
          <div className="sm:col-span-2 lg:col-span-1 xl:col-span-3 bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Onboarding</h3>
              <div className="text-3xl font-bold">18%</div>
            </div>
            <div className="flex gap-2 mb-6">
              <div className="flex-1 text-center">
                <div className="bg-yellow-400 text-xs py-2 rounded-t-lg font-medium">
                  Task
                </div>
                <div className="text-xs text-gray-600 mt-1">30%</div>
              </div>
              <div className="flex-1 text-center">
                <div className="bg-gray-800 text-xs py-2 rounded-t-lg text-white font-medium h-16"></div>
                <div className="text-xs text-gray-600 mt-1">25%</div>
              </div>
              <div className="flex-1 text-center">
                <div className="bg-gray-400 text-xs py-2 rounded-t-lg font-medium h-8"></div>
                <div className="text-xs text-gray-600 mt-1">0%</div>
              </div>
            </div>
            <div className="bg-gray-800 text-white rounded-2xl p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Onboarding Task</span>
                <span className="text-xl font-bold">2/8</span>
              </div>
              {[
                { name: "Interview", date: "Sep 15, 08:30", done: true },
                { name: "Team Meeting", date: "Sep 13, 10:30", done: true },
                { name: "Project Update", date: "Sep 13, 13:00", done: false },
                {
                  name: "Discuss Q3 Goals",
                  date: "Sep 14, 14:45",
                  done: false,
                },
                {
                  name: "HR Policy Review",
                  date: "Sep 15, 16:30",
                  done: false,
                },
              ].map((task, i) => (
                <div key={i} className="flex items-center gap-3 py-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      task.done ? "bg-yellow-400" : "bg-gray-600"
                    }`}
                  >
                    {task.done && <Check className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm">{task.name}</div>
                    <div className="text-xs text-gray-400">{task.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          Sidebar
          <div className="sm:col-span-2 lg:col-span-3 xl:col-span-3 space-y-3">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="font-medium">Pension contributions</span>
                <span>▼</span>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium">Devices</span>
                <span>▲</span>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=60&fit=crop"
                  alt="MacBook"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="font-medium text-sm">MacBook Air</div>
                  <div className="text-xs text-gray-600">Version M1</div>
                </div>
                <button className="text-gray-400">⋮</button>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="font-medium">Compensation Summary</span>
                <span>▼</span>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="font-medium">Employee Benefits</span>
                <span>▼</span>
              </div>
            </div>
          </div>

          Calendar
          <div className="sm:col-span-2 lg:col-span-3 xl:col-span-9 bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <button className="text-gray-400 text-sm">August</button>
              <h3 className="text-lg sm:text-xl font-bold">September 2024</h3>
              <button className="text-gray-400 text-sm">October</button>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-7 gap-2 sm:gap-4 mb-4">
              {["Mon 22", "Tue 23", "Wed 24", "Thu 25", "Fri 26", "Sat 27"].map(
                (day) => (
                  <div
                    key={day}
                    className="text-center text-xs sm:text-sm text-gray-600"
                  >
                    {day}
                  </div>
                )
              )}
            </div>
            <div className="space-y-2">
              <div className="text-xs text-gray-500">8:00 am</div>
              <div className="bg-gray-800 text-white rounded-xl p-3 flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">Weekly Team Sync</div>
                  <div className="text-xs text-gray-400">
                    Discuss progress on projects
                  </div>
                </div>
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-yellow-400 border-2 border-white"></div>
                  <div className="w-6 h-6 rounded-full bg-blue-400 border-2 border-white"></div>
                  <div className="w-6 h-6 rounded-full bg-pink-400 border-2 border-white"></div>
                </div>
              </div>
              <div className="text-xs text-gray-500">9:00 am</div>
              <div className="text-xs text-gray-500">10:00 am</div>
              <div className="bg-yellow-100 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">Onboarding Session</div>
                  <div className="text-xs text-gray-600">
                    Introduction for new hires
                  </div>
                </div>
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-purple-400 border-2 border-white"></div>
                  <div className="w-6 h-6 rounded-full bg-green-400 border-2 border-white"></div>
                </div>
              </div>
              <div className="text-xs text-gray-500">11:00 am</div>
            </div>
          </div>
        </div> */
}

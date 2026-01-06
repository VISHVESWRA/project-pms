import { useEffect, useState } from "react";
import api from "../../app/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Filter,
  Plus,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";

export default function ChitStatus() {
  const [chits, setChits] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeFilter, setActiveFilter] = useState("all");

  const fetchChits = async () => {
    const res = await api.get("/chits");
    setChits(res.data);
  };

  const handlePayChit = async (chitId) => {
    if (!window.confirm("Confirm monthly payment?")) return;

    await api.post(`/chits/${chitId}/pay`);
    fetchChits();
  };

  useEffect(() => {
    fetchChits();
  }, []);

  const handleAdd = () => {
    navigate("/dashboard/chits/list");
  };

  const filteredChits = chits.filter((chit) => {
    if (activeFilter === "all") return true;
    return chit.status === activeFilter;
  });

  // Calculate stats
  const stats = {
    all: chits.length,
    active: chits.filter((c) => c.status === "active").length,
    upcoming: chits.filter((c) => c.status === "upcoming").length,
    closed: chits.filter((c) => c.status === "closed").length,

    totalRemaining: chits
      .filter((c) => c.status === "active")
      .reduce(
        (sum, c) => sum + (c.duration - c.paidMonths) * c.monthlyAmount,
        0
      ),

    monthlyEmi: chits
      .filter((c) => c.status === "active")
      .reduce((sum, c) => sum + c.monthlyAmount, 0),
  };

  const filters = [
    { id: "all", label: "All Loans", count: stats.all, icon: Filter },
    { id: "active", label: "Active", count: stats.active, icon: TrendingDown },
    { id: "upcoming", label: "Upcoming", count: stats.upcoming, icon: Clock },
    { id: "closed", label: "Closed", count: stats.closed, icon: CheckCircle },
  ];

  return (
    <>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Chit Status
            </h2>
            <p className="text-gray-600">
              Track monthly contributions and progress
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            Add Chit
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <TrendingDown className="w-5 h-5 text-red-600" />
              </div>
              <div className="text-sm font-medium text-gray-600">
                Total Outstanding
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              ₹{(stats.remainingBalance / 100000).toFixed(2)}L
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-sm font-medium text-gray-600">
                Monthly EMI
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              ₹{stats.monthlyEmi.toLocaleString()}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-sm font-medium text-gray-600">
                Active Loans
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {stats.active}
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 p-2 mb-6 inline-flex gap-2">
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
                  activeFilter === filter.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{filter.label}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    activeFilter === filter.id
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {filter.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Loans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredChits.length === 0 ? (
            <div className="col-span-full bg-white rounded-xl border border-gray-200 p-12 text-center">
              <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No loans found
              </h3>
              <p className="text-gray-600">
                No {activeFilter !== "all" ? activeFilter : ""} loans to display
              </p>
            </div>
          ) : (
            filteredChits.map((chit) => (
              <div
                key={chit._id}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {chit.chitName}
                    </h3>
                    <p className="text-sm text-gray-500">{chit.groupName}</p>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-semibold border ${
                      chit.status === "closed"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : chit.status === "upcoming"
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : "bg-orange-50 text-orange-700 border-orange-200"
                    }`}
                  >
                    {chit.status.toUpperCase()}
                  </span>
                </div>

                {/* Balance */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-600 mb-1">
                    Remaining Balance
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹
                    {(
                      (chit.duration - chit.paidMonths) *
                      chit.monthlyAmount
                    ).toLocaleString()}
                  </p>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-600 mb-2">
                    <span>{chit.progress}% paid</span>
                    <span>
                      {chit.paidMonths}/{chit.duration} EMIs
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full transition-all ${
                        chit.status === "closed"
                          ? "bg-green-600"
                          : chit.status === "upcoming"
                          ? "bg-blue-600"
                          : "bg-orange-600"
                      }`}
                      style={{ width: `${chit.progress}%` }}
                    />
                  </div>
                </div>

                {/* Additional Info */}
                <div className="text-xs text-gray-600 mb-4">
                  {chit.status === "active" && chit.nextDueDate && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>
                        Next EMI:{" "}
                        {new Date(chit.nextDueDate).toLocaleDateString("en-IN")}
                      </span>
                    </div>
                  )}
                  {chit.status === "upcoming" && chit.startDate && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>
                        Starts:{" "}
                        {new Date(chit.startDate).toLocaleDateString("en-IN")}
                      </span>
                    </div>
                  )}
                  {chit.status === "closed" && chit.closedDate && (
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      <span>
                        Closed:{" "}
                        {new Date(chit.closedDate).toLocaleDateString("en-IN")}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action */}
                <button
                  onClick={() => handlePayChit(chit._id)}
                  disabled={
                    chit.status === "closed" || chit.status === "upcoming"
                  }
                  className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all ${
                    chit.status === "closed" || chit.status === "upcoming"
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md"
                  }`}
                >
                  {chit.status === "closed"
                    ? "Chit Closed"
                    : chit.status === "upcoming"
                    ? "Not Started"
                    : `Pay Monthly (₹${chit.monthlyAmount.toLocaleString()})`}
                </button>
              </div>
            ))
          )}
        </div>
        {/* </div> */}
      </div>
    </>
  );
}

// import PolicyCard from "../components/PolicyCard";
// import StatusSummary from "../components/StatusSummary";
import { useEffect, useState } from "react";
import api from "../../app/axios";
import StatusSummary from "./components/StatusSummary";
import PolicyCard from "./components/PolicyCard";
import { useNavigate } from "react-router-dom";
import {
  Filter,
  Plus,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";

export default function PolicyStatus() {
  const [policies, setPolicies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/policies").then((res) => {
      setPolicies(res.data);
    });
  }, []);

  const active = policies.filter((p) => p.status === "active");
  const upcoming = policies.filter((p) => p.status === "upcoming");
  const expired = policies.filter((p) => p.status === "expired");

  const handleAdd = () => {
    navigate("/dashboard/policies/list");
  };

  return (
    <div className="space-y-8">
      {/* <h1 className="text-xl font-semibold text-gray-800">
        Policy Status Overview
      </h1> */}

      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Policies Status
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
          Add Policy
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatusSummary
          label="Active"
          count={active.length}
          color="bg-green-400"
        />
        <StatusSummary
          label="Upcoming"
          count={upcoming.length}
          color="bg-yellow-400"
        />
        <StatusSummary
          label="Expired"
          count={expired.length}
          color="bg-red-400"
        />
      </div>

      {/* Active */}
      <Section title="Active Policies" data={active} />

      {/* Upcoming */}
      <Section title="Upcoming Policies" data={upcoming} />

      {/* Expired */}
      <Section title="Expired Policies" data={expired} />
    </div>
  );
}

function Section({ title, data }) {
  if (!data.length) return null;

  return (
    <div>
      <h2 className="text-base font-semibold text-gray-700 mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((policy) => (
          <PolicyCard key={policy._id} policy={policy} />
        ))}
      </div>
      {/* <div className="h-px bg-gray-200 mb-6" /> */}
    </div>
  );
}

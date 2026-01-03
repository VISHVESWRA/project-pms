// import PolicyCard from "../components/PolicyCard";
// import StatusSummary from "../components/StatusSummary";
import { useEffect, useState } from "react";
import api from "../../app/axios";
import StatusSummary from "./components/StatusSummary";
import PolicyCard from "./components/PolicyCard";

export default function PolicyStatus() {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    api.get("/policies").then((res) => {
      setPolicies(res.data);
    });
  }, []);

  const active = policies.filter((p) => p.status === "active");
  const upcoming = policies.filter((p) => p.status === "upcoming");
  const expired = policies.filter((p) => p.status === "expired");

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-semibold text-gray-800">
        Policy Status Overview
      </h1>

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
      <div className="h-px bg-gray-200 mb-6" />
    </div>
  );
}

export default function PolicyCard({ policy }) {
  const statusMap = {
    active: {
      badge: "bg-green-100 text-green-700",
      bar: "bg-green-500",
    },
    upcoming: {
      badge: "bg-yellow-100 text-yellow-700",
      bar: "bg-yellow-500",
    },
    expired: {
      badge: "bg-red-100 text-red-700",
      bar: "bg-red-500",
    },
  };

  const s = statusMap[policy.status];

  return (
    <div className="relative bg-white rounded-xl shadow hover:shadow-md transition p-4">
      {/* Left status bar */}
      <span
        className={`absolute left-0 top-0 h-full w-1 rounded-l-xl ${s.bar}`}
      />

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-800">{policy.policyName}</h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {policy.provider || "—"}
          </p>
        </div>

        <span className={`text-xs px-2 py-0.5 rounded ${s.badge}`}>
          {policy.status.toUpperCase()}
        </span>
      </div>

      {/* Body */}
      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-500 text-xs">Premium</p>
          <p className="font-medium">
            ₹{policy.premiumAmount}{" "}
            <span className="text-xs text-gray-500">/ {policy.frequency}</span>
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-xs">Type</p>
          <p className="font-medium uppercase">{policy.policyType}</p>
        </div>
      </div>

      {/* Dates */}
      <p className="mt-3 text-xs text-gray-500">
        {policy.startDate ? policy.startDate.slice(0, 10) : "NA"} →{" "}
        {policy.endDate ? policy.endDate.slice(0, 10) : "NA"}
      </p>

      {/* Actions */}
      {/* <div className="flex justify-end gap-4 mt-4 text-sm">
        <button className="text-blue-600 hover:underline">View</button>
        <button className="text-gray-600 hover:underline">Edit</button>
      </div> */}
    </div>
  );
}

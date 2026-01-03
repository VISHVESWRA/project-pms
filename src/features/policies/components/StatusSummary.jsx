function StatusSummary({ label, count, color }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-3xl font-semibold mt-1">{count}</p>
      </div>
      <div className={`w-10 h-10 rounded-full ${color}`} />
    </div>
  );
}
export default StatusSummary;

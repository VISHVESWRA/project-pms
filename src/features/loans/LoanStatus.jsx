import { useEffect, useState } from "react";
import api from "../../app/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function LoanStatus() {
  const [loans, setLoans] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchLoans = async () => {
    const res = await api.get("/loans");
    setLoans(res.data);
  };

  const handlePayEmi = async (loanId) => {
    if (!window.confirm("Confirm EMI payment?")) return;

    try {
      await api.post(`/loans/${loanId}/pay-emi`);
      fetchLoans();
    } catch (err) {
      alert(err.response?.data?.message || "Payment failed");
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const handleAdd = () => {
    navigate("/dashboard/loans/list");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold mb-1">Loan Status</h2>
        <button
          onClick={handleAdd} // ✅ correct
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          + Add Loan
        </button>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        Track EMI progress and remaining balances
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loans.map((loan) => (
          <div
            key={loan._id}
            className="bg-white border rounded-xl p-5 shadow-sm"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-gray-800">{loan.loanName}</h3>
                <p className="text-sm text-gray-500">{loan.lender}</p>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full font-medium
                ${
                  loan.status === "closed"
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {loan.status.toUpperCase()}
              </span>
            </div>

            {/* Balance */}
            <p className="text-sm text-gray-600 mb-1">Remaining Balance</p>
            <p className="text-lg font-bold text-gray-900 mb-3">
              ₹{loan.remainingBalance?.toLocaleString()}
            </p>

            {/* Progress */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className={`h-2 rounded-full
                ${loan.status === "closed" ? "bg-green-600" : "bg-blue-600"}`}
                style={{ width: `${loan.progress}%` }}
              />
            </div>

            <div className="flex justify-between text-xs text-gray-500">
              <span>{loan.progress}% paid</span>
              <span>
                {loan.paidEmis}/{loan.tenure} EMIs
              </span>
            </div>

            {/* Action */}
            <button
              onClick={() => handlePayEmi(loan._id)}
              disabled={loan.status === "closed"}
              className={`mt-4 w-full py-2 rounded-lg text-sm font-medium
                ${
                  loan.status === "closed"
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }
              `}
            >
              Pay EMI
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

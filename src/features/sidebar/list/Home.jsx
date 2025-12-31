import { useEffect, useState } from "react";
import api from "../../../app/axios";

function Home() {
  const [totalAmt, setTotalAmt] = useState(0);

  const fetchTotal = async () => {
    const { data } = await api.get("/dashboard/total");
    setTotalAmt(data);
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTotal();
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Home</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500">Income</h3>
          <p className="text-2xl font-bold text-green-600">
            ₹{totalAmt.income}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500">Expenses</h3>
          <p className="text-2xl font-bold text-red-600">₹{totalAmt.expense}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500">Balance</h3>
          <p className="text-2xl font-bold text-blue-600">
            ₹{totalAmt.balance}{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;

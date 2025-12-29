import api from "../../app/axios";

export const createIncome = async (incomeData) => {
  const res = await api.post("/income", incomeData);
  return res.data;
};

export const fetchIncomeList = async () => {
  const res = await api.get("/income");
  return res.data;
};

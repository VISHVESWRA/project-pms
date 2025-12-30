import api from "../../app/axios";

export const createIncome = async (incomeData) => {
  console.log("incomeData service", incomeData);

  const res = await api.post("/income", incomeData);
  return res.data;
};

export const fetchIncomeList = async () => {
  const res = await api.get("/income");
  return res.data;
};

export const deleteIncome = async (id) => {
  await api.delete(`/income/${id}`);
  return id;
};

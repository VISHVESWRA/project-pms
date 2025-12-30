import { configureStore } from "@reduxjs/toolkit";
import incomeReducer from "../features/income/IncomeSlice";
import expenseReducer from "../features/expenses/ExpenseSlice";

export const store = configureStore({
  reducer: {
    income: incomeReducer,
    expenses: expenseReducer,
  },
});

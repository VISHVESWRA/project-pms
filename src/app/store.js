import { configureStore } from "@reduxjs/toolkit";
import incomeReducer from "../features/income/IncomeSlice";
import expenseReducer from "../features/expenses/ExpenseSlice";
import policyReducer from "../features/policies/policySlice";
import LoanReducer from "../features/loans/LoanSlice";

export const store = configureStore({
  reducer: {
    income: incomeReducer,
    expenses: expenseReducer,
    policies: policyReducer,
    loans: LoanReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import incomeReducer from "../features/income/IncomeSlice";
import expenseReducer from "../features/expenses/ExpenseSlice";
import policyReducer from "../features/policies/PolicySlice";
import LoanReducer from "../features/loans/LoanSlice";
import ChitReducer from "../features/chits/ChitSliece";

export const store = configureStore({
  reducer: {
    income: incomeReducer,
    expenses: expenseReducer,
    policies: policyReducer,
    loans: LoanReducer,
    chits: ChitReducer,
  },
});

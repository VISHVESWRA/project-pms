import { configureStore } from "@reduxjs/toolkit";
import incomeReducer from "../features/income/IncomeSlice";

export const store = configureStore({
  reducer: {
    income: incomeReducer,
  },
});

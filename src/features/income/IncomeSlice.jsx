import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as incomeService from "./IncomeService";

export const addIncome = createAsyncThunk(
  "income/add",
  async (incomeData, thunkAPI) => {
    try {
      return await incomeService.createIncome(incomeData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add income"
      );
    }
  }
);

export const getIncomeList = createAsyncThunk(
  "income/list",
  async (_, thunkAPI) => {
    try {
      return await incomeService.fetchIncomeList();
    } catch (e) {
      return thunkAPI.rejectWithValue("Failed to fetch income", e);
    }
  }
);

const incomeSlice = createSlice({
  name: "income",
  initialState: {
    list: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetIncomeState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // ADD
      .addCase(addIncome.pending, (state) => {
        state.loading = true;
      })
      .addCase(addIncome.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.list.push(action.payload);
      })
      .addCase(addIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LIST
      .addCase(getIncomeList.fulfilled, (state, action) => {
        state.list = action.payload;
      });
  },
});

export const { resetIncomeState } = incomeSlice.actions;
export default incomeSlice.reducer;

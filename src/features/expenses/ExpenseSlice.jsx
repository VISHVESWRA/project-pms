import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/expenses";

// Async Thunks
export const fetchExpenses = createAsyncThunk("expenses/fetch", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addExpense = createAsyncThunk("expenses/add", async (expense) => {
  const response = await axios.post(API_URL, expense);
  return response.data;
});

export const updateExpense = createAsyncThunk(
  "expenses/update",
  async ({ id, data }) => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  }
);

export const deleteExpense = createAsyncThunk("expenses/delete", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

// Slice
const expenseSlice = createSlice({
  name: "expenses",
  initialState: { items: [], loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (e) => e._id === action.payload._id
        );
        if (index >= 0) state.items[index] = action.payload;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.items = state.items.filter((e) => e._id !== action.payload);
      });
  },
});

export default expenseSlice.reducer;

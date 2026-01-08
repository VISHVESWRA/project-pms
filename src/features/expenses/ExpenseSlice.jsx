import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../app/axios";

// Async Thunks
export const fetchExpenses = createAsyncThunk(
  "expenses/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/expenses");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch expenses");
    }
  }
);

export const addExpense = createAsyncThunk(
  "expenses/add",
  async (expense, { rejectWithValue }) => {
    try {
      const response = await api.post("/expenses", expense);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to add expense");
    }
  }
);

export const updateExpense = createAsyncThunk(
  "expenses/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/expenses/${id}`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to update expense");
    }
  }
);

export const deleteExpense = createAsyncThunk(
  "expenses/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/expenses/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to delete expense");
    }
  }
);

// Slice
const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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

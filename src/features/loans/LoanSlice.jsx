import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/axios";

export const fetchLoans = createAsyncThunk("loans/fetch", async () => {
  const res = await api.get("/loans");
  return res.data;
});

export const createLoan = createAsyncThunk("loans/create", async (data) => {
  const res = await api.post("/loans", data);
  return res.data;
});

export const updateLoan = createAsyncThunk(
  "loans/update",
  async ({ id, data }) => {
    const res = await api.put(`/loans/${id}`, data);
    return res.data;
  }
);

export const deleteLoan = createAsyncThunk("loans/delete", async (id) => {
  await api.delete(`/loans/${id}`);
  return id;
});

const loanSlice = createSlice({
  name: "loans",
  initialState: {
    items: [], // ⚠️ MUST be array
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoans.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(createLoan.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateLoan.fulfilled, (state, action) => {
        const i = state.items.findIndex((l) => l._id === action.payload._id);
        state.items[i] = action.payload;
      })
      .addCase(deleteLoan.fulfilled, (state, action) => {
        state.items = state.items.filter((l) => l._id !== action.payload);
      });
  },
});

export default loanSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../app/axios";

const API_URL = "http://localhost:5000/api/policies";

export const fetchPolicies = createAsyncThunk("policies/fetch", async () => {
  const res = await api.get(API_URL);
  return res.data;
});

export const addPolicy = createAsyncThunk("policies/add", async (policy) => {
  const res = await api.post(API_URL, policy);
  return res.data;
});

export const updatePolicy = createAsyncThunk(
  "policies/update",
  async ({ id, data }) => {
    const res = await api.put(`${API_URL}/${id}`, data);
    return res.data;
  }
);

export const deletePolicy = createAsyncThunk("policies/delete", async (id) => {
  await api.delete(`${API_URL}/${id}`);
  return id;
});

const policySlice = createSlice({
  name: "policies",
  initialState: { items: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPolicies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPolicies.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(addPolicy.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updatePolicy.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index >= 0) state.items[index] = action.payload;
      })
      .addCase(deletePolicy.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p._id !== action.payload);
      });
  },
});

export default policySlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../app/axios";

// Fetch all policies
export const fetchPolicies = createAsyncThunk(
  "policies/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/policies");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch policies");
    }
  }
);

// Add policy
export const addPolicy = createAsyncThunk(
  "policies/add",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/policies", formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to add policy");
    }
  }
);

// Update policy
export const updatePolicy = createAsyncThunk(
  "policies/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/policies/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to update policy");
    }
  }
);

// Delete policy
export const deletePolicy = createAsyncThunk(
  "policies/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/policies/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to delete policy");
    }
  }
);

const policySlice = createSlice({
  name: "policies",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPolicies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPolicies.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchPolicies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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

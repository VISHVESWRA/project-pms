import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/axios";

/* =======================
   ASYNC THUNKS
======================= */

// FETCH ALL
export const fetchChits = createAsyncThunk(
  "chits/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/chits");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// CREATE
export const createChit = createAsyncThunk(
  "chits/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/chits", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// UPDATE
export const updateChit = createAsyncThunk(
  "chits/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      console.log("call updated");

      const res = await api.put(`/chits/${id}`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// DELETE
export const deleteChit = createAsyncThunk(
  "chits/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/chits/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* =======================
   SLICE
======================= */

const chitSlice = createSlice({
  name: "chits",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchChits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChits.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchChits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createChit.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })

      // UPDATE
      .addCase(updateChit.fulfilled, (state, action) => {
        const index = state.list.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteChit.fulfilled, (state, action) => {
        state.list = state.list.filter((c) => c._id !== action.payload);
      });
  },
});

export default chitSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/axios";
import axios from "axios";

/* =======================
   ASYNC THUNKS
======================= */

const API_URL = "https://project-pms-backend.onrender.com/api/chits";

// Async Thunks
export const fetchChits = createAsyncThunk("chits/fetch", async () => {
  console.log("get");

  const response = await axios.get(API_URL);
  return response.data;
});

// export const fetchChits = createAsyncThunk("chits/fetch", async () => {
//   const res = await api.get("/chits");
//   console.log(res.data);
//   return res.data;
// });

export const createChit = createAsyncThunk("chits/create", async (data) => {
  const res = await api.post("/chits", data);
  console.log(res.data);

  return res.data;
});

export const updateChit = createAsyncThunk(
  "chits/update",
  async ({ id, data }) => {
    const res = await api.put(`/chits/${id}`, data);
    return res.data;
  }
);

export const deleteChit = createAsyncThunk("chits/delete", async (id) => {
  await api.delete(`/chits/${id}`);
  return id;
});

/* =======================
   SLICE
======================= */

const chitSlice = createSlice({
  name: "chits",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchChits.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChits.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
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

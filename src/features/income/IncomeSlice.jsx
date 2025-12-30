import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as incomeService from "./IncomeService";

export const addIncome = createAsyncThunk(
  "income/add",
  async (incomeData, thunkAPI) => {
    try {
      console.log("income slice");

      return await incomeService.createIncome(incomeData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add income"
      );
    }
  }
);

// LIST
export const fetchIncomes = createAsyncThunk(
  "income/fetch",
  async (_, thunkAPI) => {
    try {
      return await incomeService.fetchIncomeList();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch income"
      );
    }
  }
);

// UPDATE
export const updateIncome = createAsyncThunk(
  "income/update",
  async ({ id, data }, thunkAPI) => {
    try {
      return await incomeService.updateIncome(id, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update income"
      );
    }
  }
);

// DELETE
export const deleteIncome = createAsyncThunk(
  "income/delete",
  async (id, thunkAPI) => {
    try {
      return await incomeService.deleteIncome(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete income"
      );
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
        state.list.unshift(action.payload);
      })
      .addCase(addIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LIST
      .addCase(fetchIncomes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIncomes.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchIncomes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateIncome.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateIncome.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const index = state.list.findIndex(
          (item) => item._id === action.payload._id
        );

        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteIncome.fulfilled, (state, action) => {
        state.list = state.list.filter((item) => item._id !== action.payload);
      });
  },
});

export const { resetIncomeState } = incomeSlice.actions;
export default incomeSlice.reducer;

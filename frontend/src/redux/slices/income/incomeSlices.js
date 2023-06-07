import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";

//Actions for redirect
export const resetIncCreated = createAction("income/created/reset");
export const resetIncUpdate = createAction("income/update/reset");
export const resetIncomeDeleted = createAction("income/deleted/reset");

export const createIncAction = createAsyncThunk(
  "income/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //get token from store

    const userToken = getState()?.users?.userAuth?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };
    //http call
    try {
      const { data } = await axios.post(`/api/income`, payload, config);
      dispatch(resetIncCreated());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch all

export const fetchAllIncAction = createAsyncThunk(
  "expense/fetch",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //get token from store

    const userToken = getState()?.users?.userAuth?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };
    //http call
    try {
      const { data } = await axios.get(
        `/api/income?page=${1}`,

        config
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateIncAction = createAsyncThunk(
  "expense/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //get token from store

    const userToken = getState()?.users?.userAuth?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };
    //http call
    try {
      const { data } = await axios.put(
        `/api/income/${payload?.id}`,
        payload,
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Delete
export const deleteIncomeAction = createAsyncThunk(
  "income/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.delete(`/api/incomes/${id}`, config);
      //dispatch
      dispatch(resetIncomeDeleted());
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const incomeSlices = createSlice({
  name: "income",
  initialState: {},
  extraReducers: (builder) => {
    // Create Expense

    builder.addCase(createIncAction.pending, (state, action) => {
      state.loading = true;
    });

    //reset Action
    builder.addCase(resetIncCreated, (state, action) => {
      state.isIncCreated = true;
    });

    builder.addCase(createIncAction.fulfilled, (state, action) => {
      state.loading = false;
      state.incomeCreated = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.IncCreated = false;
    });
    builder.addCase(createIncAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //fetchallExp
    builder.addCase(fetchAllIncAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAllIncAction.fulfilled, (state, action) => {
      state.loading = false;
      state.incomeList = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchAllIncAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //update
    //fetchallExp
    builder.addCase(updateIncAction.pending, (state, action) => {
      state.loading = true;

      //reset Action
      builder.addCase(resetIncUpdate, (state, action) => {
        state.isIncUpdated = true;
      });
    });
    builder.addCase(updateIncAction.fulfilled, (state, action) => {
      state.loading = false;
      state.incomeUpdated = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.isIncUpdated = false;
    });
    builder.addCase(updateIncAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default incomeSlices.reducer;

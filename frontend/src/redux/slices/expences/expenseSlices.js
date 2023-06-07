import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";

//Actions for redirect
export const resetExpCreated = createAction("expense/created/reset");
export const resetExpUpdate = createAction("expense/update/reset");
//create Action
export const createExpAction = createAsyncThunk(
  "expense/create",
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
      const { data } = await axios.post(`/api/expenses`, payload, config);

      //dispatch
      dispatch(resetExpCreated());
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

export const fetchAllExpAction = createAsyncThunk(
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
        `/api/expenses?page=${1}`,

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
//update
export const updateExpAction = createAsyncThunk(
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
        `/api/expenses/${payload?.id}`,
        payload,
        config
      );
      dispatch(resetExpUpdate());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const expenseSlices = createSlice({
  name: "expences",
  initialState: {},
  extraReducers: (builder) => {
    // Create Expense
    builder.addCase(createExpAction.pending, (state, action) => {
      state.loading = true;
    });

    //reset Action
    builder.addCase(resetExpCreated, (state, action) => {
      state.isExpCreated = true;
    });
    builder.addCase(createExpAction.fulfilled, (state, action) => {
      state.loading = false;
      state.expenseCreated = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.isExpCreated = false;
    });
    builder.addCase(createExpAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //fetchallExp
    builder.addCase(fetchAllExpAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAllExpAction.fulfilled, (state, action) => {
      state.loading = false;
      state.expensesList = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchAllExpAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //update
    //fetchallExp
    builder.addCase(updateExpAction.pending, (state, action) => {
      state.loading = true;
    });

    //reset Action
    builder.addCase(resetExpUpdate, (state, action) => {
      state.isExpUpdated = true;
    });
    builder.addCase(updateExpAction.fulfilled, (state, action) => {
      state.loading = false;
      state.expenseUpdated = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updateExpAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default expenseSlices.reducer;

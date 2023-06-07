import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//fetch all

export const fetchAccountStatsAction = createAsyncThunk(
  "account/fetch",
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
        `/api/account-stats`,

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

const accountStatsSlices = createSlice({
  name: "account",
  initialState: {},
  extraReducers: (builder) => {
    //fetchallExp
    builder.addCase(fetchAccountStatsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAccountStatsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.accountDetails = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchAccountStatsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default accountStatsSlices.reducer;

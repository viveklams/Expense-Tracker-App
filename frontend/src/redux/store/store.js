import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlices";
import expenseReducer from "../slices/expences/expenseSlices";

import incomeReducer from "../slices/income/incomeSlices";
import account from "../slices/accountStats/accountStatsSlices";

const store = configureStore({
  reducer: {
    users: usersReducer,
    expenses: expenseReducer,
    income: incomeReducer,
    account,
  },
});

export default store;

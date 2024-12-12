import { createSlice } from "@reduxjs/toolkit";
// import { transactionsApi } from "@/store/api/transactions.api";
import { TransactionsState } from "./transactions.types";
import { transactionsApi } from "@/store/api/transactions.api";
import { toast } from "react-toastify";

const initialState: TransactionsState = {
  isTransactions: [],
};

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        transactionsApi.endpoints.getTransactions.matchFulfilled,
        (state, { payload }) => {
          if (payload !== undefined) {
            state.isTransactions = payload;
            toast.success("Transactions successfully downloaded!");
          }
        }
      )
      .addMatcher(
        transactionsApi.endpoints.getTransactions.matchRejected,
        () => {
          toast.error("An error occurred getting transactions.");
        }
      );
  },
});

export const {} = transactionsSlice.actions;

import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/store.types";
import { TransactionsState } from "./transactions.types";

export const selectTransactionState = (state: RootState) => state.transactions;

export const selectTransactions = createSelector(
  selectTransactionState,
  (state: TransactionsState) => state.isTransactions
);

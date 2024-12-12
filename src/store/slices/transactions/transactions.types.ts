import { TransactionType } from "@/utils/schemas/transactions.schemas";

export type TransactionsState = {
  isTransactions: TransactionType[];
};

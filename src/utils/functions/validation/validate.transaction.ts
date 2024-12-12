import { transactionSchema } from "@/utils/schemas/transactions.schemas";

export const validateTransaction = (transaction: any) => {
  try {
    transactionSchema.parse(transaction);
    return true;
  } catch (error) {
    console.error("Invalid transaction:", error);
    return false;
  }
};

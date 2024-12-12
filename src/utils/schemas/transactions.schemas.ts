import { z } from "zod";
import { TransactionTypeEnum } from "../enums/common.enums";

export const transactionSchema = z.object({
  id: z.string(),
  type: z.enum([
    TransactionTypeEnum.CREDIT,
    TransactionTypeEnum.PAYMENT,
  ] as const),
  amount: z.number().nonnegative(),
  name: z.string(),
  description: z.string().optional(),
  date: z.string(),
  isPending: z.boolean(),
  authorizedUser: z.string().optional(),
});

export type TransactionType = z.infer<typeof transactionSchema>;

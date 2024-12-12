import { BASE_API_URL } from "@/configs/env.config";
import {
  transactionSchema,
  TransactionType,
} from "@/utils/schemas/transactions.schemas";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { z } from "zod";

type TransactionsLimit = {
  limit?: number;
};

export const transactionsApi = createApi({
  reducerPath: "transactionsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_API_URL}` }),
  endpoints: (builder) => ({
    getTransactions: builder.query<TransactionType[], TransactionsLimit>({
      query: ({ limit }) => `?limit=${limit}`,
      transformResponse: (response: any) =>
        z.array(transactionSchema).parse(response),
    }),
  }),
});

export const { useGetTransactionsQuery } = transactionsApi;

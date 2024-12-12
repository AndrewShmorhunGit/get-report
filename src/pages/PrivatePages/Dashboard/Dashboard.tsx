import React from "react";
import styled, { useTheme } from "styled-components/macro";
import {
  Box,
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import {
  calculatePoints,
  displayPrice,
} from "@/utils/helpers/transactions.helpers";
import { TransactionType } from "@/utils/schemas/transactions.schemas";

import { FlexBox } from "@/styles/styled/boxes";
import {
  Body2Typography,
  H1Typography,
  H2Typography,
  H3Typography,
} from "@/components/Typography";
import { Icon } from "@/components/Icons/Icon";
import { IconName, TransactionTypeEnum } from "@/utils/enums/common.enums";
import { extractTime, transformDate } from "@/utils/helpers/date.helpers";
import { useGetTransactionsQuery } from "@/store/api/transactions.api";
import DashboardLoader from "./DashboardLoader";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const DashboardWrapper = styled(Box)`
  padding: 16px 0px;
`;

export const GreyText = styled(Body2Typography)`
  color: ${({ theme }) => theme.palette.grey[400]} !important;
`;

export const SectionCard = styled(Card)`
  // margin-bottom: 16px;
  flex: 1;
`;

export const SectionTitle = styled(H2Typography)`
  padding-bottom: 12px;
`;

const IconBox = styled(FlexBox)<{ payment: "true" | "false" }>`
  background: ${({ payment, theme }) =>
    payment === "true"
      ? theme.palette.grey[500]
      : `linear-gradient(90deg, ${theme.palette.secondary.dark} 50%, ${theme.palette.secondary.main} 100%)`};
  padding: 0.7rem;
  border-radius: 4px;
`;

export default function Dashboard() {
  const { t } = useTranslation();
  const {
    data: transactions,
    isLoading,
    isError,
  } = useGetTransactionsQuery({ limit: 10 });

  if (isLoading) {
    return <DashboardLoader />;
  }

  if (!transactions && isError) return "No data";

  const balance = transactions
    ? 1500 - transactions.reduce((sum, t) => sum + t.amount / 100, 0)
    : 0;
  const points = calculatePoints();

  return (
    <DashboardWrapper>
      <FlexBox
        sx={{
          gap: 2,
          mb: 4,
          alignItems: "stretch",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            flex: 1,
          }}
        >
          <SectionCard>
            <CardContent>
              <H3Typography>{t("general.cardBalance")}</H3Typography>
              <H1Typography
                pt={1}
                pb={1}
                fontWeight={800}
                fontFamily={"Roboto"}
              >
                $0.20
              </H1Typography>
              <GreyText>
                ${transactions !== undefined && balance}{" "}
                {t("general.available")}
              </GreyText>
            </CardContent>
          </SectionCard>

          <SectionCard>
            <CardContent>
              <H3Typography pb={1}>{t("general.dailyPoints")}</H3Typography>
              <GreyText>{points}</GreyText>
            </CardContent>
          </SectionCard>
        </Box>

        <SectionCard>
          <CardContent>
            <H3Typography pb={1}>{t("general.noPaymentDue")}</H3Typography>
            <GreyText>{t("general.paidBalance")}</GreyText>
          </CardContent>
        </SectionCard>
      </FlexBox>
      <SectionTitle>{t("general.latestsTransactions")}</SectionTitle>
      <SectionCard>
        <CardContent>
          <List>
            {transactions &&
              transactions
                .slice(0, 10)
                .map((transaction) => (
                  <TransactionListItem
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))}
          </List>
        </CardContent>
      </SectionCard>
    </DashboardWrapper>
  );
}

interface TransactionListItemProps {
  transaction: TransactionType;
}

const TransactionListItem: React.FC<TransactionListItemProps> = ({
  transaction,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const transactionAmount = displayPrice(transaction.amount);
  const transactionDate = transformDate(transaction.date);
  const transactionTime = extractTime(transaction.date);
  const isPayment: boolean = transaction.type === TransactionTypeEnum.PAYMENT;
  const formattedAmount = isPayment
    ? `${transactionAmount}`
    : `+${transactionAmount}`;

  return (
    <>
      <ListItemButton
        sx={{ p: 0 }}
        onClick={() => navigate(`/transaction/${transaction.id}`)}
      >
        <ListItemIcon sx={{ pr: 2, pl: 1 }}>
          <IconBox payment={isPayment.toString() as "true" | "false"}>
            <Icon
              name={transaction.name.toLowerCase() as IconName}
              color={"#fff"}
              fill={"#fff"}
            />
          </IconBox>
        </ListItemIcon>
        <ListItemText
          primary={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span>{transaction.name}</span>
              <Box
                sx={{ pr: 1, display: "flex", alignItems: "center", gap: 1 }}
              >
                <Body2Typography color={isPayment ? "error" : "success"}>
                  {formattedAmount}
                </Body2Typography>
                <Icon name={IconName.ARROW} fill={theme.palette.text.primary} />
              </Box>
            </Box>
          }
          secondary={
            <>
              {transaction.isPending ? <span>Pending - </span> : ""}
              {transaction.description && (
                <span>{transaction.description}</span>
              )}
              <br />
              {transactionDate} {transactionTime}
            </>
          }
        />
      </ListItemButton>
      <Divider sx={{ pl: 1 }} />
    </>
  );
};

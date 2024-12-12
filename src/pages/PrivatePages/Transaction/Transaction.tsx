import { useParams } from "react-router-dom";
import { Box, Divider } from "@mui/material";
import { useAppSelector } from "@/store/store.hooks";
import { selectTransactions } from "@/store/slices/transactions/transactions.selectors";
import { extractTime, transformDate } from "@/utils/helpers/date.helpers";
import { GreyText } from "../Dashboard/Dashboard";
import { Body2Typography, H1Typography } from "@/components/Typography";
import { useTheme } from "styled-components/macro";
import { FlexBox } from "@/styles/styled/boxes";
import { useTranslation } from "react-i18next";

export default function TransactionDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const isTransactions = useAppSelector(selectTransactions);
  const theme = useTheme();
  const { t } = useTranslation();
  const transaction = isTransactions.filter(
    (transaction) => transaction.id === id
  )[0];

  const status =
    transaction.hasOwnProperty("isPending") === true ? "Pending" : "Approved";

  const formattedDate = transaction.date;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "30vh",
        gap: 1,
        background: `${theme.palette.background.default} !important`,
      }}
    >
      {/* <Box sx={{ background: theme.palette.background.paper }}> */}
      <H1Typography fontSize="58px !important" pb={1}>
        ${(transaction.amount / 100).toFixed(2)}
      </H1Typography>
      {/* </Box> */}
      {transaction.authorizedUser && (
        <GreyText>{transaction.authorizedUser}</GreyText>
      )}
      <GreyText>
        {transformDate(formattedDate) + ", " + extractTime(formattedDate)}
      </GreyText>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          p: 2,
          borderRadius: "8px",
          gap: 1,
          background: `${theme.palette.background.paper} !important`,
        }}
      >
        <Body2Typography fontWeight={"700 !important"}>
          {t("general.status")}: {status}
        </Body2Typography>
        <GreyText>{transaction.name}</GreyText>
        <Divider />
        <FlexBox sx={{ justifyContent: "space-between" }}>
          <Body2Typography fontWeight={"700 !important"}>
            {t("general.total")}
          </Body2Typography>
          <Body2Typography fontWeight={"700 !important"}>
            ${(transaction.amount / 100).toFixed(2)}
          </Body2Typography>
        </FlexBox>
      </Box>
    </Box>
  );
}

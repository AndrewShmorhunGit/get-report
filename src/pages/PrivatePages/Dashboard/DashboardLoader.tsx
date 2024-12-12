import { Box, CardContent, Skeleton } from "@mui/material";
import { DashboardWrapper, SectionCard, SectionTitle } from "./Dashboard";

export default function DashboardLoader() {
  return (
    <DashboardWrapper>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 4,
          alignItems: "stretch",
        }}
      >
        <SectionCard>
          <CardContent>
            <Skeleton variant="text" width="40%" height={30} />
            <Skeleton
              variant="rectangular"
              width="60%"
              height={50}
              sx={{ my: 2 }}
            />
            <Skeleton variant="text" width="50%" height={20} />
          </CardContent>
        </SectionCard>

        {/* Daily Points Section Placeholder */}
        <SectionCard>
          <CardContent>
            <Skeleton variant="text" width="40%" height={30} />
            <Skeleton variant="text" width="30%" height={20} sx={{ mt: 2 }} />
          </CardContent>
        </SectionCard>

        {/* Payment Status Placeholder */}
        <SectionCard>
          <CardContent>
            <Skeleton variant="text" width="50%" height={30} />
            <Skeleton variant="text" width="70%" height={20} sx={{ mt: 2 }} />
          </CardContent>
        </SectionCard>
      </Box>

      {/* Latest Transactions Section Placeholder */}
      <SectionTitle>
        <Skeleton variant="text" width="30%" height={30} />
      </SectionTitle>
      <SectionCard>
        <CardContent>
          {[...Array(5)].map((_, idx) => (
            <Box key={idx} sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Skeleton variant="rectangular" width={40} height={40} />
              <Skeleton variant="text" width="70%" height={20} />
            </Box>
          ))}
        </CardContent>
      </SectionCard>
    </DashboardWrapper>
  );
}

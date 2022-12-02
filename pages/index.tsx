import * as React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import useSWR, { Fetcher } from "swr";
import { getResults } from "../src/api/home";
import Dashboard from "../src/components/Dashboard";
import DashboardViewFilter from "../src/components/DashboardViewFilter";

export const token =
  "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImsycXJqdEN6S2RwRnlTSnJRQ1Q0dUEiLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE2Njk5NDMwODQsImV4cCI6MTY2OTk0NjY4NCwiaXNzIjoiaHR0cHM6Ly9pZHAucmV2ZWFsLWRldi5uZXQiLCJhdWQiOlsiYXBpLmFwaTEiLCJhcGkudXNlcm1hbmFnZW1lbnQiXSwiY2xpZW50X2lkIjoiTVRNLXVpLXJjcC1jbGllbnQiLCJzdWIiOiI4YjNmMGRjMS0xMTEwLTQzZWQtYjE2NC1hYTEzNWRiMWUwNGEiLCJhdXRoX3RpbWUiOjE2Njk5NDMwODAsImlkcCI6ImxvY2FsIiwiUGVyc29uSWQiOiIzMzI3OTEyIiwicGVybWlzc2lvbiI6WyJhcGkucmNwLm1hbmFnZXIiLCJhcGkucGVyc29ub3JnLnBlcnNvbiIsImFwaS51c2VybWFuYWdlbWVudC5wZXJzb24iLCJyb2xlOkFEQU1hbmFnZXIiLCJyb2xlOlBlcnNvbiJdLCJlbWFpbCI6IkJhcnJ5X1JUQ0BZb3BtYWlsLmNvbSIsInNjb3BlIjpbImlkLmN1c3RvbSIsInByb2ZpbGUiLCJvcGVuaWQiLCJhcGkuYXBpMSIsImFwaS51c2VybWFuYWdlbWVudCJdLCJhbXIiOlsicHdkIl19.p-VGgsW4v6tmCmdMBbL1g-35AYdZfPhZv08GjgCKK-V_hmC1B8dPhc-1kHAOaKjVpxmEOXtkmy8Y4tB2dRNvDG_-E945GRrV_2aMH66TygzsvF2d6fhfAZ-aByiROln8pURqUCzu5fDf_uxasa22dZ_mML8YiGG8_tDBAHgAYL7qpKXIZlyBhFfG1RHpGM98dtZVAAd2xNoBTItCyX2x8gGybPAyVxdwua7h9RD-Xefno8SI0PG8qklB_58pFYIWGa526SnxgjL49J18q7mYJ9U9CYLCAZZy8r_8FhoIQIGxnJe4v-z41OtJ3PhTQj4GoYYfYTSVE8yY2gpLMTuiDg";

const Home: NextPage<{
  webApps: any;
  userOrgs: any;
  filters: any;
}> = ({ filters }) => {
  const fetcher: Fetcher<any> = () => getResults();
  const { data } = useSWR("/api", fetcher);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h1" gutterBottom>
          Material UI v5 with Next.js in TypeScript
        </Typography>
        <Typography variant="question" color="secondary">
          Boilerplate for building faster.
        </Typography>
        <Box
          sx={{
            width: "100%",
            my: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <DashboardViewFilter filters={filters} />
          {data && data.results.length > 0 ? (
            <Box sx={{ my: 1 }}>
              <Dashboard columns={filters[0].columns} data={data.results} />
            </Box>
          ) : null}
        </Box>
      </Box>
    </Container>
  );
};

export async function getServerSideProps() {
  const webApps = await axios.get(
    "https://api.reveal-dev.net/personorg/person/v1/webApps",
    {
      headers: {
        Authorization: token,
      },
    }
  );
  const userOrgs = await axios.get(
    "https://api.reveal-dev.net/personorg/organization/v1/organizationChildren?organizationTypeId=8",
    {
      headers: {
        Authorization: token,
      },
    }
  );
  const filters = await axios.get(
    "https://api.reveal-dev.net/rcp/caseViews/v1/my?offset=0&limit=10",
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return {
    props: {
      webApps: webApps.data,
      userOrgs: userOrgs.data,
      filters: filters.data,
    },
  };
}

export default Home;

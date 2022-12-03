import * as React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import axios from "axios";
import useSWR, { Fetcher } from "swr";
import { getResults } from "../src/api/home";
import Dashboard from "../src/components/Dashboard";
import DashboardViewFilter from "../src/components/DashboardViewFilter";
import PageHeader from "../src/components/PageHeader";
import HomeIcon from "../public/assets/icons/home.svg";
import { stringOnly } from "../src/constants/strings";
import Header from "../src/components/Header";
import Head from "next/head";

export const token =
  "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImsycXJqdEN6S2RwRnlTSnJRQ1Q0dUEiLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE2NzAwNzQzNDAsImV4cCI6MTY3MDA3Nzk0MCwiaXNzIjoiaHR0cHM6Ly9pZHAucmV2ZWFsLWRldi5uZXQiLCJhdWQiOlsiYXBpLmFwaTEiLCJhcGkudXNlcm1hbmFnZW1lbnQiXSwiY2xpZW50X2lkIjoiTVRNLXVpLXJjcC1jbGllbnQiLCJzdWIiOiI4YjNmMGRjMS0xMTEwLTQzZWQtYjE2NC1hYTEzNWRiMWUwNGEiLCJhdXRoX3RpbWUiOjE2NzAwNzQzMzUsImlkcCI6ImxvY2FsIiwiUGVyc29uSWQiOiIzMzI3OTEyIiwicGVybWlzc2lvbiI6WyJhcGkucmNwLm1hbmFnZXIiLCJhcGkucGVyc29ub3JnLnBlcnNvbiIsImFwaS51c2VybWFuYWdlbWVudC5wZXJzb24iLCJyb2xlOkFEQU1hbmFnZXIiLCJyb2xlOlBlcnNvbiJdLCJlbWFpbCI6IkJhcnJ5X1JUQ0BZb3BtYWlsLmNvbSIsInNjb3BlIjpbImlkLmN1c3RvbSIsInByb2ZpbGUiLCJvcGVuaWQiLCJhcGkuYXBpMSIsImFwaS51c2VybWFuYWdlbWVudCJdLCJhbXIiOlsicHdkIl19.S1T9BLE9Kzp_DoQMVQoN0PrqW7Wj2nMhfF7aDgwCwlX-z7OfBGswgEyN-OMsDtxDuqXP4s-BhXAtpqqYxQjuZmi4_G3mVyDKa5AZVD5VZKOBiSf8Nna5CxJQiBg_J65KCFfKuBii8K2rfvARKbZDivVFWQEOyAxzrXqHQQDIsSk8DXqN4N3W8etH6H2WPPxrdLUdT7T-d5NqDRvjkRjn-iKL8QpRl8dNyMN4HE7ns7aeFsBnaWz69C9ZRdiXG3kqW-dSVIY0oNa2xTNoHoSNDydevzNuOPj-IB1nKdTwa8lA90VZYull6It0xugJTT4EigPNMo4ZJiAR9TS46udK1g";

const Home: NextPage<{
  webApps: any;
  userOrgs: any;
  filters: any;
}> = ({ filters }) => {
  const fetcher: Fetcher<any> = () => getResults();
  const { data } = useSWR("/api", fetcher);

  const strings = stringOnly({
    title: "mtm.rcp.home.title",
  });

  return (
    <Box>
      <Head>
        <title>RCP NextJs</title>
        <meta name="description" content="Home page of RCP NextJs" />
      </Head>
      <Header />
      <PageHeader title={strings.title}>
        <HomeIcon />
      </PageHeader>
      <Container maxWidth="lg">
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
      </Container>
    </Box>
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

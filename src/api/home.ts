import axios from "axios";
import { token } from "../../pages";

export async function getResults() {
  const results = await axios.post(
    "https://api.reveal-dev.net/rcp/caseViews/v1/results/search",
    {
      criteria: { viewId: "NEW_APPLICATIONS", columns: [] },
      sort: [],
      limit: 10,
      offset: 0,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return results.data;
}

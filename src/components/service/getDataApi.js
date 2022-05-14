import axios from "axios";
const API_KEY = "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";
const getDataApi = async (url) => {
  const res = await axios.get(url, {
    headers: {
      Authorization: "Token " + API_KEY,
    },
  });
  return res;
};
export default getDataApi;

import axios from "axios";
const getDataApi = async (url) => {
  const res = await axios.get(url);
  return res;
};
export default getDataApi;

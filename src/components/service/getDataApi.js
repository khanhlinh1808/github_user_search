import axios from 'axios'
const API_KEY = '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'
const getDataApi = async (url) => {
  const res = await axios.get(url, {
    headers: {
      Authorization: 'Token' + API_KEY,
    },
  })
  return res
}
export default getDataApi

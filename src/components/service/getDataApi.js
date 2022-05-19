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

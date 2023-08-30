import axios from 'axios'

const BASE_URL = process.env.NODE_ENV === 'development' ? '/api' : '/'

export const request = axios.create({ baseURL: BASE_URL, withCredentials: true })

export const fetcher = (url: string) => {
  return request.get(url).then(res => res.data.data)
}

// export const getIndexList = (url: string) => {
//   return request.get(url).then(res => res.data)
// }

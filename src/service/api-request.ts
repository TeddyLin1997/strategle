import axios from 'axios'
import { isDevelopmentMode } from '@/utils'

const BASE_URL = isDevelopmentMode() ? '/api' : '/'

export const request = axios.create({ baseURL: BASE_URL, withCredentials: true })

export const fetcherData = (url: string) => {
  return request.get(url).then(res => res.data.data)
}

export const fetcher = (url: string) => {
  return request.get(url).then(res => res.data)
}

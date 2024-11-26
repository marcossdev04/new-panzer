import axios from 'axios'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REACT_APP_API_PANZER_URL,
})

const getToken = () => cookies.get('token_panzer_football')

api.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

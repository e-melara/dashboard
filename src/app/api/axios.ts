import axios from 'axios'

import { API_HOST_ROUTE } from 'app/const'

export const api = axios.create({
  baseURL: API_HOST_ROUTE
})

api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject((error.response && error.response.data) || 'Tenemos un grave problema')
)


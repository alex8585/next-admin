import axios from "axios"
import queryString from "query-string"
import Cookies from "js-cookie"
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
})


axiosClient.interceptors.request.use(
  function (config) {
    if (typeof window !== "undefined") {
      let token =  Cookies.get('token') ?? null
      if (!token) {
        token = localStorage.getItem("token")
      }
      const auth = token ? `Bearer ${token}` : ""
      if (!config.headers) {
        config.headers = {}
      }
      config.headers.Authorization = auth
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axiosClient.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status == 401) {
      if (window.location.pathname !== "/login") {
        window.location.href = "/login"
      }
    }
    return Promise.reject(error)
  }
)
export default axiosClient

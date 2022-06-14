import axios from "axios"
import queryString from "query-string"
import cookie from "cookie"
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
})

axiosClient.interceptors.request.use(
  function (config) {
    if (typeof window !== "undefined") {
      let token: string | null = cookie.parse(document.cookie).token
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
      console.log(error.response.config.url)
      if (window.location.pathname !== "/login") {
        window.location.href = "/login"
      }
    }
    return Promise.reject(error)
  }
)
export default axiosClient

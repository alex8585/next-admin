import React, { useState } from "react"
import axiosClient from "@/support/axiosClient"

export default function useAuth() {
  const url = "/api/v1/auth"
  const [user, setUser] = useState(null)
  const [isLoged, setIsLoged] = useState(false)
  const login = async (email: string, password: string) => {
    const result: { error?: boolean; msg?: ErrorsObj | {}; token?: string } = {}

    try {
      const resp = await axiosClient.post(`${url}/login`, {
        email,
        password,
      })

      const token = resp?.data?.access_token
      setIsLoged(true)
      localStorage.setItem("token", token)
      result.error = false
      result.token = token
      return result
    } catch (error: any) {
      localStorage.removeItem("token")
      setIsLoged(false)
      result.error = true
      if (error.response.status == 401) {
        result.msg = { global: ["Incorrect login or password"] }
      } else {
        result.msg = error.response.data.errors
      }
      return result
    }
  }

  const register = async (email: string, password: string) => {
    const result: { error?: boolean; msg?: ErrorsObj; token?: string } = {}

    try {
      const resp = await axiosClient.post(`${url}/register`, {
        email,
        password,
      })

      const token = resp?.data?.access_token
      setIsLoged(true)

      localStorage.setItem("token", token)
      result.error = false
      result.token = token
      return result
    } catch (error: any) {
      setIsLoged(false)

      result.error = true
      result.msg = error.response.data.errors

      return result
    }
  }
  function getToken() {
    return localStorage.getItem("token")
  }

  async function logout() {
    try {
      const resp = await axiosClient.post(`${url}/logout`)
      // console.log(resp.data)
      setIsLoged(false)

      localStorage.removeItem("token")
      setUser(null)
    } catch (error: any) {
      console.log(error.response.data.message)
    }
  }

  async function getUser() {
    const token = getToken()
    if (!token) {
      setIsLoged(false)
      setUser(null)
      return null
    }
    try {
      const resp = await axiosClient.get(`${url}/me`)
      setIsLoged(true)
      setUser(resp.data)
      return resp.data
    } catch (error: any) {
      setIsLoged(false)
      localStorage.removeItem("token")
      console.log(error.response.data.message)
      return null
    }
  }

  //  onMounted(async () => {});

  return { logout, isLoged, user, getUser, login, register }
}

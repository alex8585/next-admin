import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import useAuth from "@/hooks/auth"
import { useRouter } from "next/router"

import React, { useState, useEffect } from "react"
const Logout: () => void = () => {
  const { logout } = useAuth()
  const router = useRouter()
  useEffect(() => {
    ;(async () => {
      await logout()
      router.push("/login")
    })()
  }, [logout, router])
}

export default Logout

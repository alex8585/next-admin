import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import { useRouter } from "next/router"

import React, { useState, useEffect } from "react"
const Home: () => void = () => {
  const router = useRouter()
  useEffect(() => {
    ;(async () => {
      router.push("/dashboard")
    })()
  }, [router])
}

export default Home

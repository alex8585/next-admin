import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import AdminLayout from "@/layout/AdminLayout"

const Tags: NextPage = () => {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/tags"
  // console.log(url)
  return <AdminLayout title="Tags">Tags</AdminLayout>
}

export default Tags

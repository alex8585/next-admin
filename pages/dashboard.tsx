import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import AdminLayout from "@/layout/AdminLayout"

const Home: NextPage = () => {
  return <AdminLayout title="Dashboard">Dashboard</AdminLayout>
}

export default Home

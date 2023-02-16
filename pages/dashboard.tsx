import type { NextPage } from "next"
import styles from "../styles/Home.module.css"
import AdminLayout from "@/layout/AdminLayout"

import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"

import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import BeachAccessIcon from "@mui/icons-material/BeachAccess"
import Typography from "@mui/material/Typography"

import { fetchUrl } from "@/support/query"

import React, { useState, useEffect } from "react"

import Button from "@mui/material/Button"
const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
}

const Home: NextPage = () => {
  const [dashboard, setDashboard] = useState([])

  useEffect(() => {
    const url = "/api/v1/dashboard"

    fetchUrl(url).then((res) => {
      console.log(res.data)
      setDashboard(res.data)
    })
  }, [])

  function handleConnect() {
    let url = `https://telegram.me/${dashboard.botUsername}`
    console.log(url)
    window.open(url, "_blank").focus()
  }

  return (
    <AdminLayout title="Dashboard">
      <List sx={style}>
        <ListItem>
          <ListItemText primary="Bot ID:" />
          <ListItemText primary={dashboard.botId} />
        </ListItem>
        <Divider component="li" />
        <ListItem>
          <ListItemText primary="Bot name:" />
          <ListItemText primary={dashboard.botName} />
        </ListItem>
        <Divider component="li" />
        <ListItem>
          <ListItemText primary="Bot username:" />
          <ListItemText primary={dashboard.botUsername} />
        </ListItem>
        <Divider component="li" />
        <ListItem>
          <ListItemText primary="Chat id:" />
          <ListItemText primary={dashboard.chatId ?? "not connected yet"} />
        </ListItem>
        <Divider component="li" />
      </List>
      {!dashboard.chatId && (
        <Button sx={{ mb: 1 }} variant="contained" onClick={handleConnect}>
          Connect
        </Button>
      )}
      {dashboard.chatId && (
        <Button sx={{ mb: 1 }} variant="contained" onClick={handleConnect}>
          Reconnect
        </Button>
      )}
    </AdminLayout>
  )
}

export default Home

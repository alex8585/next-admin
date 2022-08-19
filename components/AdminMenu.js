import React, { useState } from "react"
import CssBaseline from "@mui/material/CssBaseline"
import MuiDrawer from "@mui/material/Drawer"

import MuiAppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"

import Typography from "@mui/material/Typography"

import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import NotificationsIcon from "@mui/icons-material/Notifications"
import LeftMenu from "@/components/LeftMenu"
import AccountMenu from "@/components/AccountMenu"

function AdminMenu({ title = "Dashboard" }) {
  const [open, setOpen] = useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }
  return (
    <>
      <CssBaseline />
      <div position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {title}
          </Typography>
          {/* <a target="_blank" className={classes.url}>
            Frontend
          </a> */}
          <AccountMenu />
        </Toolbar>
      </div>

      <div variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <div className={"classes.imgwrap"}>
            {" "}
            <a href="/admin">Crypto stat </a>
          </div>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>

        <LeftMenu />
      </div>
    </>
  )
}

export default AdminMenu

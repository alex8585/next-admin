import * as React from "react"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

import ListItemText from "@mui/material/ListItemText"
import ListItem from "@mui/material/ListItem"
import Link from "next/link"
export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }


  // const {
  //   auth: { user },
  // } = usePage().props

  return (
    <div className={'classes.menu'}>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="outlined"
      >
        { "Menu"}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >

        <Link href="/logout">
          <ListItem
            button
          >
            <ListItemText primary="Logout" />
          </ListItem>
        </Link>
      </Menu>
    </div>
  )
}

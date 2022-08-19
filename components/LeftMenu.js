import * as React from "react"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import DashboardIcon from "@mui/icons-material/Dashboard"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import PeopleIcon from "@mui/icons-material/People"
import TagIcon from "@mui/icons-material/Tag"
import List from "@mui/material/List"
import Link from "next/link"
import { useRouter } from "next/router"
import CategoryIcon from "@mui/icons-material/Category"
import ArticleIcon from "@mui/icons-material/Article"
const LeftMenu = () => {
  const router = useRouter()
  return (
    <div>
      <List className={"classes.link"}>
        <Link href="/dashboard">
          <ListItem
            button
            className={router.asPath == "/dashboard" ? "active" : ""}
            disabled={router.asPath == "/dashboard"}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>

        <Link href="/tags">
          <ListItem
            button
            className={router.asPath == "/tags" ? "active" : ""}
            disabled={router.asPath == "/tags"}
          >
            <ListItemIcon>
              <TagIcon />
            </ListItemIcon>
            <ListItemText primary="Tags" />
          </ListItem>
        </Link>
        <Link href="/categories">
          <ListItem
            button
            className={router.asPath == "/categories" ? "active" : ""}
            disabled={router.asPath == "/categories"}
          >
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Categories" />
          </ListItem>
        </Link>

        <Link href="/posts">
          <ListItem
            button
            className={router.asPath == "/posts" ? "active" : ""}
            disabled={router.asPath == "/posts"}
          >
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary="Posts" />
          </ListItem>
        </Link>
        <Link href="/users">
          <ListItem
            button
            className={router.asPath == "/users" ? "active" : ""}
            disabled={router.asPath == "/users"}
          >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        </Link>
      </List>
    </div>
  )
}
export default LeftMenu

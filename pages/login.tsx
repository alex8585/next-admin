import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import Stack from "@mui/material/Stack"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import useAuth from "@/hooks/auth"
import { useRouter } from "next/router"
import useChangeForm from "@/hooks/formChange"
import React, { useMemo, useState, useEffect } from "react"

import Alert from "@mui/material/Alert"
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      React Admin {}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const theme = createTheme()

const Login: NextPage | null = () => {
  const { login, getUser } = useAuth()
  const router = useRouter()

  const initState = useMemo(() => ({ email: "", password: "" }), [])

  const [errors, setErrors] = useState<ErrorsObj>({})
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const { handleChange, values, setValues } = useChangeForm(initState)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // const data = new FormData(event.currentTarget)
    // let email = data.get("email") as string
    // let pass = data.get("password") as string
    const res = await login(values.email, values.password)
    if (res.error) {
      if (res.msg) {
        console.log(res.msg)
        setErrors(res.msg)
      }
    } else {
      router.push("/dashboard")
    }
    // console.log(res)
  }

  useEffect(() => {
    if (user) return
    const fetchUser = async () => {
      const u = await getUser()
      setLoading(false)

      // console.log(u)
      if (u) {
        setUser(u)
        router.push("/dashboard")
      }
    }
    fetchUser()
  }, [getUser, router, user])

  if (user || loading) {
    return null
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <div>
              {errors?.global && (
                <Alert severity="error">{errors.global}</Alert>
              )}
            </div>

            <TextField
              value={values.email}
              onChange={handleChange}
              error={errors?.email ? true : false}
              helperText={errors.email && errors.email[0]}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              value={values.password}
              onChange={handleChange}
              error={errors?.password ? true : false}
              helperText={errors.password && errors.password[0]}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}

export default Login

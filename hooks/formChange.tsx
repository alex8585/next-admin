import axiosClient from "@/support/axiosClient"
import { useRef, useState, useEffect } from "react"

export default function useFormChange(initState: any) {
  const [values, setValues] = useState({ ...initState })

  function handleChange(e: any) {
    const key = e.target.name
    const value = e.target.value
    setValues((values: any) => ({
      ...values,
      [key]: value,
    }))
  }
  return { handleChange, values, setValues }
}

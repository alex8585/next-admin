
import axiosClient from "@/support/axiosClient"
import  { useRef, useState, useEffect } from "react"
export default function useCreate(url: string,doQuery:() => Promise<void>) {

  const [createOpen, setCreateOpen] = useState(false)
  const [createErrors, setCreateErrors] = useState<ErrorsObj>({})

  const handleCreateOpen = () => {
    setCreateOpen(true)
  }

  const handleCreateClose = () => {
    setCreateErrors({})
    setCreateOpen(false)
  }

  const handleCreateSubmit = (values: any) => {
    axiosClient
      .post(url, values)
      .then(function (res) {
        const msg = res.data.message
        console.log(msg)
        doQuery()
        handleCreateClose()
      })
      .catch(function (error) {
        if (error.response.status == 403) {
          setCreateErrors({ global: ["Unauthorized action."] })
        }
        if (error.response.data.errors) {
          setCreateErrors(error.response.data.errors)
        }
      })
  }

    return {createOpen, setCreateOpen,createErrors,setCreateErrors,handleCreateOpen,handleCreateClose,handleCreateSubmit}
}

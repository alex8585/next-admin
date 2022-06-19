
import axiosClient from "@/support/axiosClient"
import  { useRef, useState, useEffect } from "react"
interface TableRow {
    id:number
}
export default function useEdit(url: string,doQuery:() => Promise<void>) {

  const [editOpen, setEditOpen] = useState(false)
  const [editErrors, setEditErrors] = useState<ErrorsObj>({})
    const [currentRow, setCurrentRow] = useState<TableRow|null>(null)
    const handleEditOpen = (row:any) => {
    setCurrentRow(row)
    setEditOpen(true)
  }

  const handleEditClose = () => {
    setEditErrors({})
    setEditOpen(false)
  }

  const handleEditSubmit = (values: any) => {
    if(!currentRow) return
    axiosClient
          .put(url+'/'+currentRow?.id, values)
      .then(function (res) {
        const msg = res.data.message
        console.log(msg)
        doQuery()
        handleEditClose()
      })
      .catch(function (error) {
        if (error.response.status == 403) {
          setEditErrors({ global: "Unauthorized action." })
        }
        if (error.response.data.errors) {
          setEditErrors(error.response.data.errors)
        }
      })
  }

    return {currentRow, editOpen, setEditOpen,editErrors,setEditErrors,handleEditOpen,handleEditClose,handleEditSubmit}
}

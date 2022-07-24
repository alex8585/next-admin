import axiosClient from "@/support/axiosClient"
import { useRef, useState, useEffect } from "react"
interface TableRow {
  id: number
}
export default function useDelete(url: string, doQuery: () => Promise<void>) {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteErrors, setDeleteErrors] = useState<ErrorsObj>({})
  const [deletingRow, setDeletingRow] = useState<TableRow | null>(null)
  const handleDeleteOpen = (row: any) => {
    setDeletingRow(row)
    setDeleteOpen(true)
  }

  const handleDeleteClose = () => {
    setDeleteErrors({})
    setDeleteOpen(false)
  }

  const handleDeleteSubmit = () => {
    if (!deletingRow) return
    axiosClient
      .delete(url + "/" + deletingRow?.id)
      .then(function (res) {
        const msg = res.data.message
        console.log(msg)
        doQuery()
        handleDeleteClose()
      })
      .catch(function (error) {
        if (error.response.status == 403) {
          setDeleteErrors({ global: ["Unauthorized action."] })
        }
        if (error.response.data.errors) {
          setDeleteErrors(error.response.data.errors)
        }
      })
  }

  return {
    deletingRow,
    deleteOpen,
    setDeleteOpen,
    deleteErrors,
    setDeleteErrors,
    handleDeleteOpen,
    handleDeleteClose,
    handleDeleteSubmit,
  }
}

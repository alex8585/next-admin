import axiosClient from "@/support/axiosClient"
import { useRef, useState, useEffect } from "react"
interface TableRow {
  id: number
}
export default function useEdit(url: string, doQuery: () => Promise<void>) {
  const [editOpen, setEditOpen] = useState(false)
  const [editErrors, setEditErrors] = useState<ErrorsObj>({})
  const [currentRow, setCurrentRow] = useState<TableRow | null>(null)
  const handleEditOpen = (row: any) => {
    let newRow = { ...row }
    for (const locale in row.tr) {
      for (const field in row.tr[locale]) {
        let newFieldName = `${locale}_${field}`
        let value = row.tr[locale][field]
        newRow[newFieldName] = value
      }
    }

    delete newRow.tr
    setCurrentRow(newRow)
    setEditOpen(true)
  }

  const handleEditClose = () => {
    setEditErrors({})
    setEditOpen(false)
  }

  const handleEditSubmit = (values: any) => {
    if (!currentRow) return
    axiosClient
      .put(url + "/" + currentRow?.id, values)
      .then(function (res) {
        const msg = res.data.message
        console.log(msg)
        doQuery()
        handleEditClose()
      })
      .catch(function (error) {
        if (error.response.status == 403) {
          setEditErrors({ global: ["Unauthorized action."] })
        }
        if (error.response.data.errors) {
          setEditErrors(error.response.data.errors)
        }
      })
  }

  return {
    currentRow,
    editOpen,
    setEditOpen,
    editErrors,
    setEditErrors,
    handleEditOpen,
    handleEditClose,
    handleEditSubmit,
  }
}

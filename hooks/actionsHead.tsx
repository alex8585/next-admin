import { useEffect } from "react"
import  { HeadCells } from "@/components/EnhancedTableHead"

export default function useActionsHead(items: any, headCells: HeadCells) {
  let canDelete = items?.metaData.can_delete ?? false
  let canUpdate = items?.metaData.can_update ?? false

  useEffect(() => {
    if (canUpdate || canDelete) {
      const present = headCells.find(
        ({ id }: { id: string }) => id === "actions"
      )
      if (present) return

      headCells.push({
        id: "actions",
        label: "Actions",
        sort: false,
      })
    }
  }, [canDelete, canUpdate, headCells])

  return  headCells 
}

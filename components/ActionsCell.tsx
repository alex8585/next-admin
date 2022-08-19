import TableCell from "@mui/material/TableCell"
import TableSortLabel from "@mui/material/TableSortLabel"
import TableRow from "@mui/material/TableRow"
import TableHead from "@mui/material/TableHead"
import { visuallyHidden } from "@mui/utils"
import Box from "@mui/material/Box"

import Button from "@mui/material/Button"

interface Props {
  handleEditOpen: (row: any) => void
  handleDeleteOpen: (row: any) => void
  row: any
  canDelete: boolean
  canUpdate: boolean
}

function ActionsCell(props: Props) {
  const { canDelete, canUpdate, handleEditOpen, handleDeleteOpen, row } = props

  if (!canUpdate && !canDelete) return null
  return (
    <TableCell>
      {canUpdate && (
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleEditOpen(row)}
        >
          Edit
        </Button>
      )}
      {canDelete && (
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleDeleteOpen(row)}
        >
          Delete
        </Button>
      )}
    </TableCell>
  )
}

export default ActionsCell

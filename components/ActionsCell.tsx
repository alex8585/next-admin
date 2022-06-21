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
}

function ActionsCell(props: Props) {
  const { handleEditOpen, handleDeleteOpen,row } = props

  return (
    <TableCell align="left">
      <Button variant="text" size="small" onClick={() => handleEditOpen(row)}>
        Edit
      </Button>
      <Button variant="text" size="small" onClick={() => handleDeleteOpen(row)}>
        Delete
      </Button>
    </TableCell>
  )
}

export default ActionsCell

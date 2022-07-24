import TableCell from "@mui/material/TableCell"
import TableSortLabel from "@mui/material/TableSortLabel"
import TableRow from "@mui/material/TableRow"
import TableHead from "@mui/material/TableHead"
import { visuallyHidden } from "@mui/utils"
import Box from "@mui/material/Box"

interface HeadCell {
  id: string
  label: string
  sort?: boolean
}

type HeadCells = Array<HeadCell>

type Order = "asc" | "desc"

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void
  order: Order
  orderBy: string
  headCells: Array<HeadCell>
  canUpdate: boolean
  canDelete: boolean
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { canUpdate, canDelete, order, orderBy, onRequestSort, headCells } =
    props
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  let actionsHide = false
  if (!canUpdate && !canDelete) {
    actionsHide = true
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => {
          let hide = actionsHide && headCell.id == "actions"
          return (
            !hide && (
              <TableCell
                key={headCell.id}
                align="left"
                padding="normal"
                sortDirection={orderBy === headCell.id ? order : false}
              >
                {headCell?.sort !== false ? (
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={createSortHandler(headCell.id)}
                  >
                    {" "}
                    {headCell.label}
                    {orderBy === headCell.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                ) : (
                  <div> {headCell.label} </div>
                )}
              </TableCell>
            )
          )
        })}
      </TableRow>
    </TableHead>
  )
}

export default EnhancedTableHead
export type { HeadCell, HeadCells, Order }

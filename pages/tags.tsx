import type { NextPage } from "next"
import Button from "@mui/material/Button"
import AdminLayout from "@/layout/AdminLayout"
import { useRef, useState, useEffect } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableContainer from "@mui/material/TableContainer"
import Paper from "@mui/material/Paper"
import TablePagination from "@mui/material/TablePagination"
import EnhancedTableHead, { HeadCells } from "@/components/EnhancedTableHead"
import TableRow from "@mui/material/TableRow"
import usePaginateAndSort from "@/hooks/paginateAndSort"
import TableCell from "@mui/material/TableCell"
import CreateForm from "@/components/tags/CreateForm"
import EditForm from "@/components/tags/EditForm"
import DeleteForm from "@/components/tags/DeleteForm"
import useCreate from "@/hooks/create"
import useEdit from "@/hooks/edit"
import useDelete from "@/hooks/delete"
const headCells: HeadCells = [
  {
    id: "id",
    label: "ID",
  },
  {
    id: "name",
    label: "Name",
  },
  {
    id: "actions",
    label: "Actions",
    sort: false,
  },
]

const Tags: NextPage | null = () => {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/tags"
  const {
    items,
    page,
    order,
    orderBy,
    handleRequestSort,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    doQuery,
  } = usePaginateAndSort(url)

  const {
    createOpen,
    createErrors,
    handleCreateOpen,
    handleCreateClose,
    handleCreateSubmit,
  } = useCreate(url, doQuery)

  const {
    editOpen,
    setEditOpen,
    editErrors,
    setEditErrors,
    handleEditOpen,
    handleEditClose,
    handleEditSubmit,
    currentRow,
  } = useEdit(url, doQuery)

  const {
    deletingRow,
    deleteOpen,
    setDeleteOpen,
    deleteErrors,
    setDeleteErrors,
    handleDeleteOpen,
    handleDeleteClose,
    handleDeleteSubmit,
  } = useDelete(url, doQuery)
   if (!items) return null

  return (
    <AdminLayout title="Tags">
      <Button sx={{ mb: 1 }} variant="contained" onClick={handleCreateOpen}>
        Create
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <EnhancedTableHead
            headCells={headCells}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {items.data.map((row: any) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => handleEditOpen(row)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => handleDeleteOpen(row)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 25]}
        component="div"
        count={items?.metaData?.rowsNumber}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <CreateForm
        open={createOpen}
        errors={createErrors}
        handleClose={handleCreateClose}
        handleSubmit={handleCreateSubmit}
      />
      <EditForm
        currentRow={currentRow}
        open={editOpen}
        errors={editErrors}
        handleClose={handleEditClose}
        handleSubmit={handleEditSubmit}
      />
      <DeleteForm
        deletingRow={deletingRow}
        open={deleteOpen}
        errors={deleteErrors}
        handleClose={handleDeleteClose}
        handleSubmit={handleDeleteSubmit}
      />
    </AdminLayout>
  )
}

export default Tags

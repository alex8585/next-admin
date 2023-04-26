import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import AdminLayout from "@/layout/AdminLayout"
import React, { useState, useEffect } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableContainer from "@mui/material/TableContainer"
import Paper from "@mui/material/Paper"
import TablePagination from "@mui/material/TablePagination"
import Checkbox from "@mui/material/Checkbox"
import EnhancedTableHead, { HeadCells } from "@/components/EnhancedTableHead"
import TableRow from "@mui/material/TableRow"
import usePaginateAndSort from "@/hooks/paginateAndSort"
import TableCell from "@mui/material/TableCell"

import CreateForm from "@/components/notifications/CreateForm"
import EditForm from "@/components/notifications/EditForm"
import DeleteForm from "@/components/notifications/DeleteForm"
import useCreate from "@/hooks/create"
import useEdit from "@/hooks/edit"
import useDelete from "@/hooks/delete"

import { fetchAll } from "@/support/query"
import { getApiUrl } from "@/support/helpers"
import ActionsCell from "@/components/ActionsCell"
import FilterForm from "@/components/notifications/FilterForm"

const Users: NextPage | null = () => {
  let headCells: HeadCells = [
    {
      id: "id",
      label: "ID",
    },
    {
      id: "symbol",
      label: "Symbol",
    },
    {
      id: "direction",
      label: "Direction",
    },
    {
      id: "price",
      label: "Price",
    },
    {
      id: "sent",
      label: "Sent",
    },
  ]

  headCells.push({
    id: "actions",
    label: "Actions",
    sort: false,
  })
  const url = getApiUrl("notifications")
  const {
    items,
    page,
    order,
    orderBy,
    handleRequestSort,
    handleChangeFilter,
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

  const [symbols, setSymbols] = useState([])

  useEffect(() => {
    const symbolsUrl = "/api/v1/symbols"

    fetchAll(symbolsUrl).then((res) => {
      setSymbols(res.data)
    })
  }, [])

  let canCreate = items?.metaData.can_create ?? false
  let canDelete = items?.metaData.can_delete ?? false
  let canUpdate = items?.metaData.can_update ?? false

  if (!items) return null
  return (
    <AdminLayout title="Notifications">
      {canCreate && (
        <Button sx={{ mb: 1 }} variant="contained" onClick={handleCreateOpen}>
          Create
        </Button>
      )}
      <FilterForm handleChangeFilter={handleChangeFilter} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <EnhancedTableHead
            canDelete={canDelete}
            canUpdate={canUpdate}
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
                <TableCell align="left">{row.symbol}</TableCell>
                <TableCell align="left">{row.direction ? "<" : ">"}</TableCell>
                <TableCell align="left">{row.price}</TableCell>
                <TableCell align="left">{row.sent ? "yes" : "no"}</TableCell>

                <ActionsCell
                  canDelete={canDelete}
                  canUpdate={canUpdate}
                  row={row}
                  handleEditOpen={handleEditOpen}
                  handleDeleteOpen={handleDeleteOpen}
                />
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
        symbols={symbols}
        open={createOpen}
        errors={createErrors}
        handleClose={handleCreateClose}
        handleSubmit={handleCreateSubmit}
      />
      <EditForm
        symbols={symbols}
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

export default Users

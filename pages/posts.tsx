import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
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

import CreateForm from "@/components/posts/CreateForm"
import EditForm from "@/components/posts/EditForm"
import DeleteForm from "@/components/posts/DeleteForm"
import useCreate from "@/hooks/create"
import useEdit from "@/hooks/edit"
import useDelete from "@/hooks/delete"
import { fetchAll } from "@/support/query"

import { getTranslation } from "@/support/helpers"
import ActionsCell from "@/components/ActionsCell"
import FilterForm from "@/components/posts/FilterForm"
const Posts: NextPage | null = () => {
  let headCells: HeadCells = [
    {
      id: "id",
      label: "ID",
    },
    {
      id: "title",
      label: "Title",
    },
    {
      id: "description",
      label: "Description",
      sort: false,
    },
  ]

  headCells.push({
    id: "actions",
    label: "Actions",
    sort: false,
  })
  const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/posts"
  const {
    items,
    page,
    order,
    orderBy,
    handleChangeFilter,
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

  const [cats, setCats] = useState([])
  const [tags, setTags] = useState([])

  useEffect(() => {
    const catsUrl = "/api/v1/categories"
    const tagsUrl = "/api/v1/tags"

    const tags = fetchAll(tagsUrl).then((res) => {
      // console.log(res.data)
      setTags(res.data)
    })
    const cats = fetchAll(catsUrl).then((res) => {
      setCats(res.data)
    })
  }, [])

  let canCreate = items?.metaData.can_create ?? false
  let canDelete = items?.metaData.can_delete ?? false
  let canUpdate = items?.metaData.can_update ?? false

  if (!items) return null
  let currentLoc = items.metaData?.locale

  return (
    <AdminLayout title="Posts">
      {canCreate && (
        <Button sx={{ mb: 1 }} variant="contained" onClick={handleCreateOpen}>
          Create
        </Button>
      )}

      <TableContainer component={Paper}>
        <FilterForm handleChangeFilter={handleChangeFilter} />
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
                <TableCell>{row.id}</TableCell>
                <TableCell align="left">
                  {getTranslation(row, currentLoc, "title")}{" "}
                </TableCell>
                <TableCell align="left">
                  {getTranslation(row, currentLoc, "description")}{" "}
                </TableCell>
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
        meta={items?.metaData}
        tags={tags}
        cats={cats}
        open={createOpen}
        errors={createErrors}
        handleClose={handleCreateClose}
        handleSubmit={handleCreateSubmit}
      />
      <EditForm
        meta={items?.metaData}
        tags={tags}
        cats={cats}
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

export default Posts

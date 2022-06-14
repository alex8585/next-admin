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

const headCells: HeadCells = [
  {
    id: "id",
    label: "ID",
  },
  {
    id: "name",
    label: "Name",
  },
]

const Categories: NextPage | null = () => {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/categories"
  const {
    items,
    page,
    order,
    orderBy,
    handleRequestSort,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePaginateAndSort(url)

  if (!items) return null 
  return (
    <AdminLayout title="Categories">
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
    </AdminLayout>
  )
}

export default Categories


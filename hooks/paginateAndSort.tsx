import { HeadCells, Order } from "@/components/EnhancedTableHead"
import { fetchMany } from "@/support/query"
import React, { useState, useEffect,useCallback } from "react"
interface ItemsType {
  data: []
    metaData: {locales:Array<string>, locale:string, rowsNumber: number , can_create:boolean, can_update:boolean, can_delete:boolean}
}
export default function usePaginateAndSort(url: string) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [items, setItems] = useState<ItemsType | null>(null)
  const [order, setOrder] = useState<Order>("asc")
  const [orderBy, setOrderBy] = useState("id")

    
  const doQuery = useCallback(async () => {
    let filter = {}
    let descending = order == "asc" ? true : false
    let res = await fetchMany(
      url,
      page + 1,
      rowsPerPage,
      orderBy,
      descending,
      filter
    )
    setItems(res.data)
  },[url, page, rowsPerPage, orderBy, order])

  useEffect(() => {
    doQuery()
  }, [url, page, rowsPerPage, orderBy, order,doQuery])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  return {
    items,
    page,
    order,
    orderBy,
    handleRequestSort,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    doQuery,
  }
}

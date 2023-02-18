import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import OutlinedInput from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { useState, useEffect, useMemo } from "react"
import Alert from "@mui/material/Alert"
import useChangeForm from "@/hooks/formChange"

import MenuItem from "@mui/material/MenuItem"
import InputLabel from "@mui/material/InputLabel"

import ErrorsMessages from "@/components/ErrorsMessages"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"

type EditFromProps = {
  symbols: Array<any>
  open: boolean
  errors: ErrorsObj
  handleClose: React.MouseEventHandler<HTMLButtonElement>
  handleSubmit: (values: { symbol: { value: string }; price: string }) => any
  currentRow: any
}

const EditForm = ({
  symbols,
  currentRow,
  open,
  errors,
  handleClose,
  handleSubmit,
}: EditFromProps) => {
  const initState = useMemo<{
    symbol: { value: string }
    direction: { value: string }
  }>(() => {
    return {
      price: "",
      symbol: { value: "" },
      direction: { value: "" },
    }
  }, [])

  const { handleChange, values, setValues } = useChangeForm(initState)

  useEffect(() => {
    if (currentRow) {
      let symbol = currentRow.symbol_id
        ? { value: currentRow.symbol_id }
        : { value: "" }

      let direction = { value: currentRow.direction }

      setValues({
        id: currentRow.id,
        price: currentRow.price,
        symbol,
        direction,
      })
    }
  }, [currentRow, setValues])

  function handleChangeSymbol(e: any) {
    const value = e.target.value
    let symbol = { value }
    setValues((values: any) => ({
      ...values,
      symbol,
    }))
  }

  function handleChangeDirection(e: any) {
    const value = e.target.value
    let direction = { value }
    setValues((values: any) => ({
      ...values,
      direction,
    }))
  }

  const directions = [
    { id: 0, name: ">" },
    { id: 1, name: "<" },
  ]

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create notification</DialogTitle>
        <ErrorsMessages errors={errors} />
        <div>
          {errors?.global && <Alert severity="error">{errors.global}</Alert>}
        </div>
        <DialogContent sx={{ width: 500 }}>
          <div className="form-row">
            <FormControl sx={{ mt: 0, width: 150 }}>
              <InputLabel id="select-label-symbol">Symbol</InputLabel>
              <Select
                sx={{ minWidth: 30 }}
                name="symbol"
                labelId="select-label-symbol"
                id="symbol-select"
                value={values.symbol.value}
                label="Symbol"
                onChange={handleChangeSymbol}
              >
                {symbols.map((symbol: { id: number; name: string }) => (
                  <MenuItem key={symbol.id} value={symbol.id}>
                    {symbol.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ mt: 0, width: 100 }}>
              <InputLabel id="select-label-direction">Direction</InputLabel>
              <Select
                sx={{ minWidth: 30 }}
                name="direction"
                labelId="select-label-direction"
                id="symbol-select"
                value={values.direction.value}
                label="Direction"
                onChange={handleChangeDirection}
              >
                {directions.map((direction: { id: number; name: string }) => (
                  <MenuItem key={direction.id} value={direction.id}>
                    {direction.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <OutlinedInput
              sx={{ mb: 1, width: 150 }}
              error={errors?.price ? true : false}
              name="price"
              value={values.price}
              onChange={handleChange}
              id="price"
              label="Price"
              helperText={errors.price && errors.price[0]}
            />
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleSubmit(values)}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
// CreateForm.displayName = "CreateFrom"
export default EditForm

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

type EditFromProps = {
  open: boolean
  errors: ErrorsObj
  handleClose: React.MouseEventHandler<HTMLButtonElement>
  handleSubmit: (values: {
    name: string
    email: string
    password: string
  }) => any
  currentRow: any
}

const CreateForm = ({
  open,
  errors,
  handleClose,
  handleSubmit,
  currentRow,
}: EditFromProps) => {
  const initState = useMemo(
    () => ({
      name: "",
      email: "",
      password: "",
    }),
    []
  )
  const { handleChange, values, setValues } = useChangeForm(initState)

  useEffect(() => {
    if (currentRow) {
      setValues({ ...currentRow, password: "" })
    }
  }, [currentRow, setValues])

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit user</DialogTitle>
        <div>
          {errors?.global && <Alert severity="error">{errors.global}</Alert>}
        </div>
        <DialogContent sx={{ width: 500 }}>
          <div>
            <OutlinedInput
              sx={{ mb: 1, width: "100%" }}
              error={errors?.name ? true : false}
              name="name"
              value={values.name}
              onChange={handleChange}
              id="name"
              label="Name"
              helperText={errors.name && errors.name[0]}
            />
          </div>
          <div>
            <OutlinedInput
              sx={{ mb: 1, width: "100%" }}
              error={errors?.email ? true : false}
              name="email"
              value={values.email}
              onChange={handleChange}
              id="email"
              label="Email"
              helperText={errors.email && errors.email[0]}
            />
          </div>
          <div>
            <OutlinedInput
              sx={{ mb: 1, width: "100%" }}
              type="password"
              error={errors?.password ? true : false}
              name="password"
              value={values.password}
              onChange={handleChange}
              id="password"
              label="Password"
              helperText={errors.password && errors.password[0]}
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
export default CreateForm

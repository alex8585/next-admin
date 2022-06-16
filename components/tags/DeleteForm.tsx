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
type DeleteFormProps = {
  open: boolean
  errors: ErrorsObj
  handleClose: React.MouseEventHandler<HTMLButtonElement>
  handleSubmit: () => any
  deletingRow: any
}

const DeleteForm = ({
  open,
  errors,
  handleClose,
  handleSubmit,
  deletingRow,
}: DeleteFormProps) => {
  const initState = useMemo(() => ({ name: "" }), [])
  const [values, setValues] = useState({ ...initState })

  function handleChange(e: any) {
    const key = e.target.name
    const value = e.target.value
    setValues((values) => ({
      ...values,
      [key]: value,
    }))
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete tag</DialogTitle>
        <div>
          {errors?.global && <Alert severity="error">{errors.global}</Alert>}
        </div>
        <DialogContent>
          Are you shore you want to delete &quot; {deletingRow?.name} &quot; ?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleSubmit()}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
// CreateForm.displayName = "CreateFrom"
export default DeleteForm

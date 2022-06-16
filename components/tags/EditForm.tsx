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
type EditFromProps = {
  open: boolean
  errors: ErrorsObj
  handleClose: React.MouseEventHandler<HTMLButtonElement>
  handleSubmit: (values: { name: string }) => any
  currentRow: any
}

const CreateForm = ({
  open,
  errors,
  handleClose,
  handleSubmit,
  currentRow,
}: EditFromProps) => {
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

  useEffect(() => {
    if (currentRow) {
      setValues({ ...currentRow })
    }
  }, [currentRow])

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit tag</DialogTitle>
        <div>
          {errors?.global && <Alert severity="error">{errors.global}</Alert>}
        </div>
        <DialogContent>
          <OutlinedInput
            error={errors?.name ? true : false}
            name="name"
            value={values.name}
            onChange={handleChange}
            id="name"
            label="Name"
            helperText={errors.name && errors.name[0]}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleSubmit(values)}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
// CreateForm.displayName = "CreateFrom"
export default CreateForm

import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { forwardRef, useRef, useImperativeHandle, useState } from "react"

type CreateFromProps = {
  open: boolean
  handleClose: React.MouseEventHandler<HTMLButtonElement>
}

const CreateForm = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false)

  useImperativeHandle(ref, () => ({
    handleClickOpen()  {
      setOpen(true)
    },
  }))

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
})
CreateForm.displayName = "CreateFrom"
export default CreateForm

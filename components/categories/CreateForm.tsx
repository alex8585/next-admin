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
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import ErrorsMessages from "@/components/ErrorsMessages"
import { MouseEvent } from "react"
import { getLocalesFields } from "@/support/helpers"

type CreateFromProps = {
  open: boolean
  errors: ErrorsObj
  handleClose: React.MouseEventHandler<HTMLButtonElement>
  handleSubmit: (values: { name: string }) => any
  meta: { locale: string; locales: Array<string> }
}

const CreateForm = ({
  meta,
  open,
  errors,
  handleClose,
  handleSubmit,
}: CreateFromProps) => {
  const initState = useMemo(() => {
    let fields = getLocalesFields(["name"])
    return fields
  }, [])

  const { handleChange, values, setValues } = useChangeForm(initState)

  const handleChangeLang = (event: MouseEvent<HTMLElement>, lang: string) => {
    if (!lang) return
    setLang(lang)
  }

  const [selectedLang, setLang] = useState(meta.locale)
  useEffect(() => {
    setValues({ ...initState })
  }, [open, initState, setValues])

  useEffect(() => {
    if (!open) {
      setLang(meta.locale)
    }
  }, [setLang, open, meta.locale])

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create category</DialogTitle>
        <ErrorsMessages errors={errors} />
        <DialogContent sx={{ textAlign: "center", minWidth: 500 }}>
          <ToggleButtonGroup
            sx={{ mb: 2 }}
            color="primary"
            value={selectedLang}
            exclusive
            onChange={handleChangeLang}
          >
            {meta.locales.map((lang: string) => (
              <ToggleButton key={lang} value={lang}>
                {" "}
                {lang}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          {meta.locales.map((lang: string) => {
            let display = lang == selectedLang ? "inline-flex" : "none"
            let nameField = `${lang}_name`
            return (
              <OutlinedInput
                key={lang}
                sx={{ width: "100%", display: display }}
                error={errors[nameField] != undefined ? true : false}
                name={nameField}
                value={values[nameField]}
                onChange={handleChange}
                id={nameField}
                label="Name"
                helperText={errors[nameField] && errors[nameField][0]}
              />
            )
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleSubmit(values)}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
export default CreateForm

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

import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import { MouseEvent } from "react"
import useChangeForm from "@/hooks/formChange"

type EditFromProps = {
  open: boolean
  errors: ErrorsObj
  handleClose: React.MouseEventHandler<HTMLButtonElement>
  handleSubmit: (values: { name: string }) => any
  currentRow: any
  meta: {locale:string, locales: Array<string> }

}

const CreateForm = ({
  meta,
  open,
  errors,
  handleClose,
  handleSubmit,
  currentRow,
}: EditFromProps) => {
  const initState = useMemo(() => ({ en_name: "",uk_name:"",ru_name:"" }), [])
  const { handleChange, values, setValues } = useChangeForm(initState)

  const [selectedLang, setLang] = useState(meta.locale)

  const handleChangeLang = (event: MouseEvent<HTMLElement>, lang: string) => {
    if(!lang)
          return
    setLang(lang)
  }

  useEffect(() => {
    if (currentRow) {
      setValues({ ...currentRow })
    }
  }, [currentRow, setValues])

  useEffect(() => {
    if (!open) {
         setLang(meta.locale)
    }
  }, [setLang,open,meta.locale])

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit tag</DialogTitle>
        <div>
          {errors?.global && <Alert severity="error">{errors.global}</Alert>}
        </div>
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

          {meta.locales.map((lang:string) =>{
              let display = lang == selectedLang ? 'inline-flex':'none'
              return(
          <OutlinedInput key={lang}
            sx={{ width: "100%", display: display}}
            error={errors?.name ? true : false}
            name={lang + '_name'}
            value={values[lang + '_name'] ?? ''}
            onChange={handleChange}
            id={lang + '_name'}
            label="Name"
            helperText={errors.name && errors.name[0]}
          /> )})}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={ () => { handleSubmit(values)  }}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
// CreateForm.displayName = "CreateFrom"
export default CreateForm

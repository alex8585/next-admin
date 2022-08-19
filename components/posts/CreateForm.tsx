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
import Select, { SelectChangeEvent } from "@mui/material/Select"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import useChangeForm from "@/hooks/formChange"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import ErrorsMessages from "@/components/ErrorsMessages"
import { MouseEvent } from "react"
import { getLocalesFields } from "@/support/helpers"

type CreateFromProps = {
  tags: Array<any>
  cats: Array<any>
  open: boolean
  errors: ErrorsObj
  handleClose: React.MouseEventHandler<HTMLButtonElement>
  handleSubmit: (values: {
    title: string
    description: string
    category: any
  }) => any
  meta: { locale: string; locales: Array<string> }
}

const CreateForm = ({
  meta,
  open,
  errors,
  handleClose,
  handleSubmit,
  tags,
  cats,
}: CreateFromProps) => {
  const initState = useMemo<{
    category: { value: string }
    tags: Array<any>
  }>(() => {
    let fields = getLocalesFields(["title", "description"])
    return {
      ...fields,
      category: { value: "" },
      tags: [],
    }
  }, [])

  const [selectedTags, setSelectedTags] = useState([])

  const { handleChange, values, setValues } = useChangeForm(initState)

  const handleChangeLang = (event: MouseEvent<HTMLElement>, lang: string) => {
    if (!lang) return
    setLang(lang)
  }

  const [selectedLang, setLang] = useState(meta.locale)

  function handleChangeCat(e: any) {
    const value = e.target.value
    let category = { value }
    setValues((values: any) => ({
      ...values,
      category,
    }))
  }

  function handleChangeTags(e: any) {
    const newTags = e.target.value

    setValues((values: any) => ({
      ...values,
      tags: [...newTags],
    }))
  }

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
        <DialogTitle>Create post</DialogTitle>
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
            let titleField = `${lang}_title`
            let descriotionField = `${lang}_description`
            return (
              <div key={lang}>
                <div>
                  <OutlinedInput
                    sx={{ mb: 1, width: "100%", display: display }}
                    error={errors[titleField] != undefined ? true : false}
                    name={titleField}
                    value={values[titleField]}
                    onChange={handleChange}
                    id={titleField}
                    label="Title"
                    helperText={errors[titleField] && errors[titleField][0]}
                  />
                </div>
                <div>
                  <OutlinedInput
                    sx={{ mb: 1, width: "100%", display: display }}
                    error={errors[descriotionField] != undefined ? true : false}
                    name={descriotionField}
                    value={values[descriotionField]}
                    onChange={handleChange}
                    id={descriotionField}
                    label="Description"
                    helperText={
                      errors[descriotionField] && errors[descriotionField][0]
                    }
                  />
                </div>
              </div>
            )
          })}

          <div className="form-row">
            <FormControl sx={{ mt: 1, width: 180 }}>
              <InputLabel id="select-label-cat">Category</InputLabel>
              <Select
                sx={{ minWidth: 30 }}
                name="category"
                labelId="select-label-cat"
                id="cat-select"
                value={values.category.value}
                label="Category"
                onChange={handleChangeCat}
              >
                {cats.map((cat: { id: number; name: string }) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ mt: 1, width: 180 }}>
              <InputLabel id="select-label-tags">Tags</InputLabel>
              <Select
                multiple
                sx={{ minWidth: 30 }}
                name="tags"
                labelId="select-label-tags"
                id="tag-select"
                value={values.tags}
                label="Tags"
                onChange={handleChangeTags}
              >
                {tags.map((tag: { id: number; name: string }) => (
                  <MenuItem key={tag.id} value={tag.id}>
                    {tag.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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

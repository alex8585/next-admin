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

type EditFromProps = {
  tags: Array<any>
  cats: Array<any>
  open: boolean
  errors: ErrorsObj
  handleClose: React.MouseEventHandler<HTMLButtonElement>
  handleSubmit: (values: { title: string; description: string }) => any
  currentRow: any
}

const CreateForm = ({
  cats,
  tags,
  open,
  errors,
  handleClose,
  handleSubmit,
  currentRow,
}: EditFromProps) => {

  const initState = useMemo<{
    title: string
    description: string
    category: { value: string }
    tags: Array<any>
  }>(
    () => ({
      title: "",
      description: "",
      category: { value: "" },
      tags: [],
    }),
    []
  )
  const [values, setValues] = useState({ ...initState })

  function handleChange(e: any) {
    const key = e.target.name
    const value = e.target.value
    setValues((values) => ({
      ...values,
      [key]: value,
    }))
  }

  function handleChangeCat(e: any) {
    const value = e.target.value
    let category = { value }
    setValues((values) => ({
      ...values,
      category,
    }))
  }

  function handleChangeTags(e: any) {
    const newTags = e.target.value

    setValues((values) => ({
      ...values,
      tags: [...newTags],
    }))
  }

  useEffect(() => {
    if (currentRow) {
      let category = currentRow.category.id
        ? { value: currentRow.category.id }
        : { value: "" }
      let tags = currentRow.tags.map(({ id }: { id: number }) => id)
      setValues({ ...currentRow, category, tags })
    }
  }, [currentRow])

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit post</DialogTitle>
        <div>
          {errors?.global && <Alert severity="error">{errors.global}</Alert>}
        </div>
        <DialogContent>
          <div>
            <OutlinedInput
              sx={{ mb: 1 }}
              error={errors?.title ? true : false}
              name="title"
              value={values.title}
              onChange={handleChange}
              id="title"
              label="Title"
              helperText={errors.title && errors.title[0]}
            />
          </div>
          <div>
            <OutlinedInput
              sx={{ mb: 1 }}
              error={errors?.description ? true : false}
              name="description"
              value={values.description}
              onChange={handleChange}
              id="description"
              label="Description"
              helperText={errors.description && errors.description[0]}
            />
          </div>
          <div>
            <FormControl sx={{ width: 200 }}>
              <InputLabel id="select-label-cat">Category</InputLabel>
              <Select
                sx={{ minWidth: 30 }}
                name="category"
                labelId="select-label-cat"
                id="demo-simple-select"
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
          </div>
          <div>
            <FormControl sx={{ mt: 1, width: 200 }}>
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

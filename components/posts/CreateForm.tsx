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
}

const CreateForm = ({
  open,
  errors,
  handleClose,
  handleSubmit,
  tags,
  cats,
}: CreateFromProps) => {
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
  const [selectedTags, setSelectedTags] = useState([])

  const { handleChange, values, setValues } = useChangeForm(initState)

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
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create post</DialogTitle>
        <div>
          {errors?.global && <Alert severity="error">{errors.global}</Alert>}
        </div>
        <DialogContent sx={{ minWidth: 500 }}>
          <div>
            <OutlinedInput
              sx={{ mb: 1, width: '100%' }}
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
                sx={{ mb: 1,width:'100%'  }}
              error={errors?.description ? true : false}
              name="description"
              value={values.description}
              onChange={handleChange}
              id="description"
              label="Description"
              helperText={errors.description && errors.description[0]}
            />
          </div>
          <div className='form-row' >
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

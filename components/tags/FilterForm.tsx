import Button from "@mui/material/Button"
import OutlinedInput from "@mui/material/TextField"
import { useMemo } from "react"
import useChangeForm from "@/hooks/formChange"
import { Stack, FormControl } from "@mui/material"
import Paper from "@mui/material/Paper"

type CreateFromProps = {
  handleChangeFilter: any
}

const CreateForm = ({ handleChangeFilter }: CreateFromProps) => {
  const initState = useMemo(() => {
    return { name: "" }
  }, [])

  const { handleChange, values, setValues } = useChangeForm(initState)

  function resetFilter() {
    setValues(initState)
    handleChangeFilter(initState)
  }

  return (
    <Paper sx={{ width: "500px", mt: 1, mb: 2, pt: 3, pb: 3 }}>
      <FormControl sx={{ width: "100%", mb: 2, pr: 3, pl: 3 }}>
        <OutlinedInput
          name="name"
          value={values["name"]}
          onChange={handleChange}
          id="name"
          label="Name"
        />
      </FormControl>
      <Stack
        sx={{
          mr: 3,
          ml: 3,
          alignItems: "center",
          justifyContent: "space-between",
        }}
        spacing={2}
        direction="row"
      >
        <Button onClick={() => handleChangeFilter(values)} variant="contained">
          Filter
        </Button>
        <Button onClick={resetFilter} variant="outlined">
          Reset
        </Button>
      </Stack>
    </Paper>
  )
}
export default CreateForm

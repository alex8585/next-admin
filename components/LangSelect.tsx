import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import {Typography} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {getCurrLang,getLocales} from "@/support/helpers"
import Cookies from "js-cookie"

export default function LangSelect() {
  const [lang, setLang] = React.useState(getCurrLang());
  const locales = getLocales()

  const handleChange = (event: SelectChangeEvent) => {
    let locale = event.target.value
    if(locale) {
        setLang(locale as string);
        Cookies.set('locale', locale )
        window.location.href = window.location.href;
    }
  };

  return (
    <div>
      <Select
        sx={{fontSize: "22px", "& div":{pt:"10px"},  color: "#fff" }}
        labelId="lang-select"
        id="lang-select"
        value={lang}
        label="Lang"
        onChange={handleChange}
      >
          {locales.map((loc)=>(<MenuItem key={loc} value={loc}>{loc}</MenuItem>))}
      </Select>
    </div>
  )
}

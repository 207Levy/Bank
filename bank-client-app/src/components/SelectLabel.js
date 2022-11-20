import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";

export default function SelectLabels(props) {
  const [category, setCategory] = React.useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setCategory(value);
    props.changeCategory(value);
  };

  return (
    <Box id='xxxx' sx={{ display: 'inline' }}>
      <FormControl sx={{m:1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={category}
          label="Category"
          onChange={handleChange}
        >
          {props.categories.map((c) => (
            <MenuItem value={c}>{c}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

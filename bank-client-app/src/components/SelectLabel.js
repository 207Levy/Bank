import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectLabels(props) {
  const [category, setCategory] = React.useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setCategory(value);
    props.changeCategory(value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={category}
          label="Cateory"
          onChange={handleChange}
        >
          {props.categories.map((c) => (
            <MenuItem value={c}>{c}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useState } from "react";
import { MenuItem, Select, TextareaAutosize, TextField } from "@mui/material";
import SelectLabels from "./SelectLabel";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function NewTransactionCard(props) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div" color="primary">
          New Transaction
        </Typography>
        
        <TextField
          required
          id="outlined-required"
          label="Vendor-info"
          defaultValue=""
          placeholder="Vendor"
        />
        <br/>
        <br/>
        <SelectLabels categories={props.categories}/>
        <br/>
        <br/>


        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value="Category"
          label="Age"
          //   onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <br/>
        <br/>

        <TextField
          component="div"
          required
          label="Amount"
          id="outlined-required"
          type="number"
          placeholder="Amount"
        />
        <br/>
        <br/>

        <TextField id="date-input" type="date" />
      </CardContent>
      <CardActions>
        <Button variant="contained" color="success">
          Add Trnsaction
        </Button>
      </CardActions>
    </Card>
  );
}

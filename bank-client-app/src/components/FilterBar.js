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

export default function FilterBar(props) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const changeCategory = (cat) => {
    setCategory(cat);
  };

  const handleDate = (event) => {
    const value = event.target.value;
    setDate(value);
  };

  const handleAmount = (event) => {
    const value = event.target.value;
    setAmount(value);
  };

  const filterTransactions = () => {
    const filters = {
      amount: amount,
      date: date,
      category: category,
    };
    props.filter(filters);
  };
  return (
    <div sx={{ minWidth: 275 }}>
      <Box  sx={{ display: 'inline' }}>
        <SelectLabels
          categories={props.categories}
          changeCategory={changeCategory}
        />
        <TextField
          sx={{ m: 1, minWidth: 120 }}
          label="Amount"
          type="number"
          placeholder="Amount"
          onChange={handleAmount}
        />

        <TextField
          sx={{ m: 1, minWidth: 120 }}
          id="date-input"
          type="date"
          onChange={handleDate}
        />
      </Box>

      <Box  sx={{ display: 'inline' }}>
        <Button
          sx={{ m: 1, minWidth: 120 }}
          variant="contained"
          color="success"
          onClick={filterTransactions}
        >
          Filter
        </Button>
        <Button
          sx={{ m: 1, minWidth: 120 }}
          variant="contained"
          color="primary"
          onClick={props.reset}
        >
          Reset
        </Button>
      </Box>
    </div>
  );
}

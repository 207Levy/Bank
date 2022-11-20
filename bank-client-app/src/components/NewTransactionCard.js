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

export default function NewTransactionCard(props) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [vendor, setVendor] = useState("");
  const [date, setDate] = useState("");

  const changeCategory = (cat) => {
    setCategory(cat);
  };

  const handleDate = (event) => {
    const value = event.target.value;
    setDate(value);
  };

  const handleVendor = (event) => {
    const value = event.target.value;
    setVendor(value);
  };

  const handleAmount = (event) => {
    const value = event.target.value;
    setAmount(value);
  };

  const addNewTransaction = () => {
    if (vendor === "" || category === "") {
      alert("You must input all requires lines *");
      return;
    }
    const transaction = {
      vendor: vendor,
      amount: amount,
      tr_date: date,
      category: category,
    };
    props.addNewTransaction(transaction);
  };
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h4" component="div" color="primary">
          New Transaction
        </Typography>

        <TextField
          sx={{ m: 1, minWidth: 120 }}
          required
          id="outlined-required"
          label="Vendor-info"
          defaultValue=""
          placeholder="Vendor"
          onChange={handleVendor}
        />
        <br />
        <br />
        <SelectLabels
          categories={props.categories}
          changeCategory={changeCategory}
        />
        <br />
        <br />

        <TextField
          sx={{ m: 1, minWidth: 120 }}
          component="div"
          required
          label="Amount"
          id="outlined-required"
          type="number"
          placeholder="Amount"
          onChange={handleAmount}
        />
        <br />
        <br />

        <TextField
          sx={{ m: 1, minWidth: 120 }}
          id="date-input"
          type="date"
          onChange={handleDate}
        />
      </CardContent>
      <CardActions>
        <Button variant="contained" color="success" onClick={addNewTransaction}>
          Add Trnsaction
        </Button>
      </CardActions>
    </Card>
  );
}

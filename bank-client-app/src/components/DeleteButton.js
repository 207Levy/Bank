import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DeleteButton(props) {
  const deleteTransaction = () => {
    props.deleteFunk(props.id);
  };
  return (
    <Button variant="contained" color="warning" onClick={deleteTransaction}>
      <DeleteIcon />
    </Button>
  );
}

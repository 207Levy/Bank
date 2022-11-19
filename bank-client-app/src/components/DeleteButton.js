import Button from "@mui/material/Button";

export default function DeleteButton(props) {
  const deleteTransaction = () => {
    props.deleteFunk(props.id);
  };
  return (
    <Button variant="contained" color="warning" href="/" onClick={deleteTransaction}>
      Delete
    </Button>
  );
}

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@material-ui/core";
import { useState, useEffect } from "react";

export const EditNameDialog = (props: {
  onSave: (userName: string) => void;
  onCancel: () => void;
  isOpen: boolean;
  name: string;
}) => {
  const { isOpen, onCancel, onSave, name } = props;
  const [newName, setNewName] = useState(name);

  useEffect(() => {
    setNewName(name);
  }, [name]);

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onCancel}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {name.trim().length === 0 ? "Add" : "Change"} your name
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To make the fitness tracker more friendly for our users, we kindly
            ask to input your name in the box below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Your name"
            defaultValue={newName}
            fullWidth
            onChange={(e) => setNewName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={() => onSave(newName.trim())} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

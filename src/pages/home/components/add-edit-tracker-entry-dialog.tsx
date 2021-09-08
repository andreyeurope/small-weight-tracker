import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem,
  Box,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { Mood } from "../../../common/models/mood";
import { TrackerEntry } from "../../../common/models/tracker-entry";

interface AddEditTrackerEntryDialogProps {
  isOpen: boolean;
  trackerEntry?: TrackerEntry;
  onCancel: () => void;
  onSave: (value: TrackerEntry) => void;
}

export const AddEditTrackerEntryDialog = (
  props: AddEditTrackerEntryDialogProps
) => {
  const { isOpen, onCancel, onSave, trackerEntry } = props;
  const isEditing = trackerEntry !== undefined;

  const [date, setDate] = useState(
    trackerEntry ? new Date(trackerEntry.date) : new Date()
  );
  const [bodyWeight, setBodyWeight] = useState(trackerEntry?.bodyWeight ?? 0);
  const [waistCircumference, setWaistCircumference] = useState(
    trackerEntry?.waistCircumference ?? 0
  );
  const [happinessLevel, setHappinessLevel] = useState(
    trackerEntry?.happinessLevel ?? Mood.Ok
  );

  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {isEditing ? "Edit" : "Add"} tracker entry
      </DialogTitle>
      <DialogContent>
        <TextField
          id="entry-date"
          label="Date"
          type="date"
          fullWidth
          value={formatDate(new Date(date))}
          onChange={(e) => {
            try {
              console.log(e.target.value);
              setDate(new Date(e.target.value));
            } catch (error) {}
          }}
        />
        <TextField
          id="body-weight"
          label="Body weight"
          type="number"
          fullWidth
          value={bodyWeight}
          onChange={(e) => setBodyWeight(parseFloat(e.target.value))}
        />
        <TextField
          id="waist-circumference"
          label="Waist circumference"
          type="number"
          fullWidth
          value={waistCircumference}
          onChange={(e) => setWaistCircumference(parseFloat(e.target.value))}
        />
        <TextField
          id="mood"
          select
          label="How do you feel?"
          value={happinessLevel}
          onChange={(e) => {
            setHappinessLevel(parseInt(e.target.value));
          }}
          fullWidth
        >
          {Object.keys(Mood)
            .filter((value) => isNaN(parseInt(value)))
            .map((key) => (
              <MenuItem key={key} value={Mood[key as keyof typeof Mood]}>
                {key}
              </MenuItem>
            ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onSave({
              id: trackerEntry?.id ?? 0,
              bodyWeight: bodyWeight,
              date: date.getTime(),
              happinessLevel: happinessLevel,
              waistCircumference: waistCircumference,
            });
          }}
          color="primary"
        >
          {isEditing ? "Save" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const formatDate = (value: Date): string => {
  const dd = String(value.getDate()).padStart(2, "0");
  const mm = String(value.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = value.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};

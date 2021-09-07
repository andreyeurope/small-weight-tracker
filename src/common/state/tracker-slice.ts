import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TrackerEntry } from "../models/tracker-entry";
import { RootState } from "./store";

interface TrackerState {
  entries: TrackerEntry[];
}

interface EntryShell extends Omit<TrackerEntry, "id"> {}

interface EditEntryPayload {
  id: number;
  entry: EntryShell;
}

const initialState: TrackerState = {
  entries: [],
};

export const trackerSlice = createSlice({
  name: "tracker",
  initialState,
  reducers: {
    addTrackerEntry: (state, action: PayloadAction<EntryShell>) => {
      state.entries = [
        ...state.entries,
        {
          ...action.payload,
          id: generateId(),
        },
      ];
    },
    editTrackerEntry: (state, action: PayloadAction<EditEntryPayload>) => {
      const filteredEntries = state.entries.filter(
        (e) => e.id !== action.payload.id
      );
      if (state.entries.length === filteredEntries.length) {
        return;
      }
      state.entries = [
        ...filteredEntries,
        {
          ...action.payload.entry,
          id: action.payload.id,
        },
      ];
    },
    removeTrackerEntry: (state, action: PayloadAction<number>) => {
      state.entries = state.entries.filter((e) => e.id !== action.payload);
    },
  },
});

export const { addTrackerEntry, editTrackerEntry, removeTrackerEntry } =
  trackerSlice.actions;

export default trackerSlice.reducer;

function generateId(): number {
  const currentDate = new Date();

  // create some randomness for the sake of uniqueness
  // not totally safe, but better than timestamp alone
  const random = Math.random();

  return currentDate.getTime() * 1000 + random;
}

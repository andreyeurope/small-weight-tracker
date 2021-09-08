import { Box, Container, Grid, Paper } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../common/hooks/store-hooks";
import { changeName } from "../../common/state/user-slice";
import { Line } from "react-chartjs-2";
import { AddEditTrackerEntryDialog } from "./components/add-edit-tracker-entry-dialog";
import { TrackerEntry } from "../../common/models/tracker-entry";
import {
  addTrackerEntry,
  editTrackerEntry,
  removeTrackerEntry,
} from "../../common/state/tracker-slice";
import { EditNameDialog } from "./components/edit-name-dialog";
import { Header } from "./components/header";
import { TrackerEntryTable } from "./components/tracker-entry-table";

const graphOptions = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

export const Home = () => {
  const userState = useAppSelector((state) => state.user);
  const userName = userState.name;

  const trackerEntries = useAppSelector((state) => state.tracker.entries);

  const [openNameDialog, setNameDialogShown] = useState(false);
  const [openTrackerEntryDialog, setTrackerEntryDialogShown] = useState(false);
  const [editEntry, setEditEntry] = useState<undefined | TrackerEntry>();

  const dispatch = useAppDispatch();

  const onEditNameClicked = () => {
    setNameDialogShown(true);
  };

  const data = {
    labels: [
      ...trackerEntries.map(
        (e) =>
          `${String(new Date(e.date).getDate()).padStart(2, "0")} ${new Date(
            e.date
          ).toLocaleString("default", { month: "short" })}`
      ),
    ],
    datasets: [
      {
        label: "Weight over time",
        data: [...trackerEntries.map((e) => e.bodyWeight)],
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  useEffect(() => {
    if (!openTrackerEntryDialog) {
      setEditEntry(undefined);
    }
  }, [openTrackerEntryDialog]);

  return (
    <>
      <Container maxWidth="md">
        <Box
          minHeight="100vh"
          bgcolor="#E6E6FA"
          paddingLeft="24px"
          paddingRight="24px"
        >
          <Box height="30px" />
          <Grid container spacing={3}>
            <Grid item md={12} alignItems="center">
              <Header
                userName={userName}
                onEditName={onEditNameClicked}
                onAddTrackerEntry={() => setTrackerEntryDialogShown(true)}
              />
            </Grid>
            <Grid item md={12} alignItems="center">
              <Paper>
                <Line data={data} options={graphOptions} />
              </Paper>
            </Grid>
            <Grid item md={12}>
              <TrackerEntryTable
                items={trackerEntries}
                onEditItem={(entry) => {
                  setEditEntry(entry);
                  setTrackerEntryDialogShown(true);
                }}
                onRemoveItem={(id) => {
                  dispatch(removeTrackerEntry(id));
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>

      <EditNameDialog
        isOpen={openNameDialog}
        onCancel={() => {
          setNameDialogShown(false);
        }}
        name={userName}
        onSave={(newName) => {
          setNameDialogShown(false);
          dispatch(changeName(newName));
        }}
      />
      {openTrackerEntryDialog && (
        <AddEditTrackerEntryDialog
          isOpen={openTrackerEntryDialog}
          trackerEntry={editEntry}
          onCancel={function (): void {
            setTrackerEntryDialogShown(false);
            setEditEntry(undefined);
          }}
          onSave={function (value: TrackerEntry): void {
            setTrackerEntryDialogShown(false);
            dispatch(
              value.id === 0
                ? addTrackerEntry(value)
                : editTrackerEntry({ entry: value, id: value.id })
            );
            setEditEntry(undefined);
          }}
        />
      )}
    </>
  );
};

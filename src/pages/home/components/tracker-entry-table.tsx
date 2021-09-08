import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import {
  Edit,
  Mood as MoodIcon,
  SentimentVeryDissatisfied,
  SentimentSatisfied,
} from "@material-ui/icons";
import { Mood } from "../../../common/models/mood";
import { TrackerEntry } from "../../../common/models/tracker-entry";

interface TrackerEntryTableProps {
  items: TrackerEntry[];
  onEditItem: (entry: TrackerEntry) => void;
}

export const TrackerEntryTable = (props: TrackerEntryTableProps) => {
  const { items, onEditItem } = props;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Body weight (kg)</TableCell>
            <TableCell align="right">Waist circumference (cm)</TableCell>
            <TableCell align="right">Happiness level</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {new Date(row.date).toLocaleString("default", {
                  month: "short",
                  year: "numeric",
                  day: "2-digit",
                })}
              </TableCell>
              <TableCell align="right">{row.bodyWeight}</TableCell>
              <TableCell align="right">{row.waistCircumference}</TableCell>
              <TableCell align="right">
                {getMoodIcon(row.happinessLevel)}
              </TableCell>
              <TableCell align="right">
                <Tooltip title="Edit">
                  <IconButton onClick={() => onEditItem(row)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

function getMoodIcon(mood: Mood) {
  switch (mood) {
    case Mood.Happy:
      return <MoodIcon />;
    case Mood.Sad:
      return <SentimentVeryDissatisfied />;
    case Mood.Ok:
    default:
      return <SentimentSatisfied />;
  }
}

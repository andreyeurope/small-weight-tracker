import { Box, Typography, IconButton, Fab, Tooltip } from "@material-ui/core";
import { Add, Edit } from "@material-ui/icons";

export const Header = (props: {
    userName: string;
    onEditName: () => void;
    onAddTrackerEntry: () => void;
  }) => {
    const { userName, onEditName, onAddTrackerEntry } = props;
    const isNameEmpty = userName.trim().length === 0;
    return (
      <Box display="flex" alignItems="center">
        <Typography variant="h3" component="span">
          Hello{!isNameEmpty ? ` ${userName}` : ""},
        </Typography>
        <Tooltip title={isNameEmpty ? "Add your name here" : "Edit your name"}>
          <IconButton onClick={() => onEditName()}>
            {isNameEmpty && <Add />}
            {!isNameEmpty && <Edit />}
          </IconButton>
        </Tooltip>
        <Box flex="1" />
        <Tooltip title="Add new tracker entry">
          <Fab color="secondary" aria-label="add" onClick={onAddTrackerEntry}>
            <Add />
          </Fab>
        </Tooltip>
      </Box>
    );
  };
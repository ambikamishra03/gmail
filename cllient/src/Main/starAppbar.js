import React from "react";
import { makeStyles } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArchiveIcon from "@mui/icons-material/Archive";
import ReportIcon from "@mui/icons-material/Report";
import DeleteIcon from "@mui/icons-material/Delete";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import ScheduleIcon from "@mui/icons-material/Schedule";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "white",
    marginTop: 10,
    marginLeft: 15
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  root2: {
    display: "flex",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(0.6)
    }
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  typography: {
    padding: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: "white"
  }
}));
export default function SentAppbar() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "white" }}>
        <Toolbar>
          <IconButton
            onClick={() => history.push("/starred")}
            edge="start"
            className={classes.menuButton}
            color="black"
            aria-label="menu"
            style={{ justifyContent: "space-between" }}
          >
            <ArrowBackIcon />
          </IconButton>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="black"
            aria-label="menu"
            style={{ justifyContent: "space-between" }}
          >
            <ArchiveIcon />
          </IconButton>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="black"
            aria-label="menu"
            style={{ justifyContent: "space-between" }}
          >
            <ReportIcon />
          </IconButton>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="black"
            aria-label="menu"
            style={{ justifyContent: "space-between" }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="black"
            aria-label="menu"
            style={{ justifyContent: "space-between" }}
          >
            <MarkunreadIcon />
          </IconButton>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="black"
            aria-label="menu"
            style={{ justifyContent: "space-between" }}
          >
            <ScheduleIcon />
          </IconButton>

          <IconButton
            edge="start"
            className={classes.menuButton}
            color="black"
            aria-label="menu"
            style={{ justifyContent: "space-between" }}
          >
            <MoveToInboxIcon />
          </IconButton>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="black"
            aria-label="menu"
            style={{ justifyContent: "space-between" }}
          >
            <MoreVertIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="black"
            aria-label="menu"
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="black"
            aria-label="menu"
          >
            <ChevronRightIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

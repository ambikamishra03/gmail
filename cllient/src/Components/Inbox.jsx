import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import RefreshIcon from "@mui/icons-material/Refresh";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import InboxView from "./InboxView";
import Paper from "@mui/material/Paper";
import Header from "../Main/Header";
import Sidebar from "../Main/Sidebar";
import { auth } from "../Auth/firebase";
import { useHistory } from "react-router-dom";
import axios from "../Auth/axios";

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
  }
}));
export default function Inbox() {
  const classes = useStyles();
  const [inbox, setinbox] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    try {
      axios.get(`/users/${user?.uid}`).then((res) => {
        setinbox(res.data.inbox);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div>
      <Header />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div className={classes.root}>
          <AppBar position="static" style={{ backgroundColor: "white" }}>
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="black"
                aria-label="menu"
                style={{ justifyContent: "space-between" }}
              >
                <CheckBoxOutlineBlankIcon />
              </IconButton>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="black"
                aria-label="menu"
                style={{ justifyContent: "space-between" }}
              >
                <RefreshIcon />
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

          {inbox?.map((val) => (
            <InboxView
              id={val._id}
              fromname={val.fromname}
              subject={val.subject}
              messagebox={val.messagebox}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

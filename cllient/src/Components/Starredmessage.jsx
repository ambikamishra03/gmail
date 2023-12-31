import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
//import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
//import RefreshIcon from "@mui/icons-material/Refresh";
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
import ForwardIcon from "@mui/icons-material/Forward";
import { useHistory } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import ReplyIcon from "@mui/icons-material/Reply";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import SendIcon from "@mui/icons-material/Send";
import Header from "../Main/Header";
import Sidebar from "../Main/Sidebar";
import { useParams } from "react-router-dom";
import axios from "../Auth/axios";
import { auth } from "../Auth/firebase";
import SentAppbar from "../Main/starAppbar";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";
import TextFormatIcon from "@mui/icons-material/TextFormat";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import LinkIcon from "@mui/icons-material/Link";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ImageIcon from "@mui/icons-material/Image";
import Popover from "@mui/material/Popover";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  },
  root3: {
    display: "flex",
    flexWrap: "wrap",
    zIndex: 1,
    position: "absolute",
    bottom: 20,
    right: 0,

    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(75),
      height: theme.spacing(70)
    }
  }
}));
export default function Starredmessage() {
  const [msgbox, setmsgbox] = useState([]);
  const classes = useStyles();
  const history = useHistory();
  const [dis, setdis] = useState(false);
  const [value, setvalue] = useState("");
  const [userid, setuserid] = useState("");
  const [subject, setsubject] = useState("");
  const [message, setmessage] = useState("");
  const [username, setusername] = useState("");
  const [opens, setOpen] = React.useState(false);
  useEffect(() => {
    axios.get("/fav").then((res) => setmsgbox(res.data));
  }, []);

  const handleClickv = () => {
    setOpen(true);
  };

  const handleClosev = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const details = (ide) => {
    try {
      axios.get(`/users/${ide}`).then((res) => setusername(res.data.username));
    } catch (error) {
      console.log(error);
    }
  };

  const d = new Date();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [uses, setusers] = useState([]);
  useEffect(() => {
    axios.get("/users").then((res) => setusers(res.data));
  }, []);
  const update = () => {
    try {
      axios.put("/inbox", {
        _id: userid,
        inbox: [
          {
            fromname: user.displayName,
            fromemail: user.email,
            subject: subject,
            messagebox: message,
            userid: user.uid,
            timestamp: d.getHours() + ":" + d.getMinutes()
          }
        ]
      });
    } catch (err) {}
    try {
      axios
        .put("/sentbox", {
          _id: user.uid,
          sentbox: [
            {
              toname: username,
              toemail: value,
              subject: subject,
              messagebox: message,
              userid: user.uid,
              timestamp: d.getHours() + ":" + d.getMinutes()
            }
          ]
        })
        .then(() => {});
    } catch (err) {
      console.log(err);
    }
    handleClickv();
    setsubject("");
    setvalue("");
    setmessage("");
    setdis(false);
  };
  const user = auth.currentUser;
  const { msgid } = useParams();

  console.log(msgbox);
  return (
    <div>
      <Header />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div className={classes.root}>
          <SentAppbar />
          {msgbox.map((k) =>
            k._id === msgid ? (
              <div
                style={{
                  overflowY: "scroll",
                  height: "80vh"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flex: 1,
                    alignItems: "center",
                    margin: 10
                  }}
                >
                  <Typography style={{ fontSize: 23, flex: 0.8 }}>
                    {k.subject}
                  </Typography>
                  <ForwardIcon style={{ flex: 0.2, opacity: 0.6 }} />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 10,
                      flex: 1
                    }}
                  >
                    <div
                      style={{ cursor: "pointer" }}
                      className={classes.root2}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                      <Typography
                        style={{ opacity: 1, fontSize: 18, fontWeight: "bold" }}
                      >
                        {k.fromname}
                      </Typography>
                      <Typography
                        style={{
                          opacity: 0.8,
                          fontSize: 13,
                          fontWeight: "bold"
                        }}
                      >
                        {k.fromemail}
                      </Typography>
                    </div>
                  </div>
                  <div>
                    <IconButton
                      edge="start"
                      className={classes.menuButton}
                      color="black"
                      aria-label="menu"
                    >
                      <ReplyIcon />
                    </IconButton>
                    <IconButton
                      edge="start"
                      className={classes.menuButton}
                      color="black"
                      aria-label="menu"
                    >
                      <StarOutlineIcon />
                    </IconButton>
                    <IconButton
                      edge="start"
                      className={classes.menuButton}
                      color="black"
                      aria-label="menu"
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </div>
                </div>
                <div>
                  <Typography>{k.message}</Typography>
                  <div style={{ marginTop: 10 }}>
                    <Button
                      onClick={() => setdis(true)}
                      variant="contained"
                      color="default"
                      className={classes.button}
                      startIcon={<ReplyIcon />}
                    >
                      Reply
                    </Button>
                    <Button
                      onClick={() => setdis(true)}
                      variant="contained"
                      color="default"
                      className={classes.button}
                      startIcon={<SendIcon />}
                    >
                      Forward
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )
          )}
        </div>
      </div>
      <div
        style={{ display: dis ? "block" : "none" }}
        className={classes.root3}
      >
        <Paper elevation={3}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div
              style={{
                flex: 1,
                height: 30,
                backgroundColor: "#566573",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                display: "flex",
                alignItems: "center"
              }}
            >
              <p style={{ color: "white", marginLeft: 5, fontSize: 17 }}>
                New message
              </p>
              <CloseIcon
                onClick={() => setdis(false)}
                style={{
                  color: "white",
                  padding: 5,
                  fontSize: 22,
                  position: "absolute",
                  right: 5,
                  cursor: "pointer",
                  opacity: 0.7
                }}
              />
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                height: 30,
                alignItems: "center",
                borderBottom: "0.4px solid lightgray"
              }}
            >
              <p style={{ marginLeft: 5 }}>TO</p>
              <input
                type="email"
                value={value}
                onChange={(e) => setvalue(e.target.value)}
                onClick={handleClick}
                style={{
                  flex: 1,
                  outline: "none",
                  borderBottom: "none",
                  height: 30,
                  fontSize: 16,
                  fontWeight: "bold",
                  padding: 10,
                  opacity: 0.5,
                  border: "none"
                }}
              />
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                height: 30,
                alignItems: "center",
                borderBottom: "0.4px solid lightgray"
              }}
            >
              <p style={{ marginLeft: 5 }}>Subject</p>
              <input
                type="text"
                value={subject}
                onChange={(e) => setsubject(e.target.value)}
                style={{
                  flex: 1,
                  outline: "none",
                  borderBottom: "none",
                  height: 30,
                  fontSize: 16,
                  fontWeight: "bold",
                  padding: 10,
                  opacity: 0.5,
                  border: "none"
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <textarea
                value={message}
                onChange={(e) => setmessage(e.target.value)}
                style={{
                  height: 356,
                  resize: "none",
                  outline: "none",
                  border: "none",
                  fontWeight: "bold"
                }}
              ></textarea>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 10,
              height: 40,
              flex: 1,
              display: "flex",
              flexDirection: "row"
            }}
          >
            <div
              style={{
                flex: 0.3,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                margin: 2
              }}
            >
              <Button onClick={update} variant="contained" color="primary">
                send
              </Button>
              <TextFormatIcon style={{ margin: 2, cursor: "pointer" }} />
              <AttachFileIcon style={{ margin: 2, cursor: "pointer" }} />
              <LinkIcon style={{ margin: 2, cursor: "pointer" }} />
              <EmojiEmotionsIcon style={{ margin: 2, cursor: "pointer" }} />
              <ImageIcon style={{ margin: 2, cursor: "pointer" }} />
            </div>
          </div>
          <DeleteIcon
            style={{
              position: "absolute",
              bottom: 10,
              right: 10,
              cursor: "pointer"
            }}
          />
        </Paper>
      </div>
    </div>
  );
}

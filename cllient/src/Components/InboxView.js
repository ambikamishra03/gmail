import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import "../styles.css";
import { auth } from "../Auth/firebase";
import { useHistory } from "react-router-dom";
import axios from "../Auth/axios";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
export default function InboxView({ id, fromname, subject, messagebox }) {
  const history = useHistory();
  const [star, setstar] = useState(false);
  const [check, setcheck] = useState(false);
  const user = auth.currentUser;
  const fav = () => {
    try {
      axios.post("/fav", {
        _id: id,
        fromname: fromname,
        subject: subject,
        message: messagebox,
        userid: user.uid
      });
    } catch (error) {
      console.log(error);
    }
    setstar(!star);
  };

  return (
    <div
      className="inboxview"
      style={{
        flex: 1,
        backgroundColor: "#FDFEFE",
        height: 50,
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        borderBottom: "0.2px solid lightgray",
        cursor: "pointer"
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          flex: 0.17,
          justifyContent: "space-evenly"
        }}
      >
        {check ? (
          <CheckBoxIcon
            style={{ opacity: 0.7, color: "blue" }}
            onClick={() => setcheck(!check)}
          />
        ) : (
          <CheckBoxOutlineBlankIcon
            style={{ opacity: 0.4 }}
            onClick={() => setcheck(!check)}
          />
        )}

        {star ? (
          <StarIcon
            style={{ opacity: 0.7, color: "gold" }}
            onClick={() => setstar(!star)}
          />
        ) : (
          <StarBorderIcon onClick={fav} style={{ opacity: 0.7 }} />
        )}

        <h4>{fromname}</h4>
      </div>
      <div style={{ flex: 0.1 }}></div>

      <div
        onClick={() => history.push(`/messagebox/${id}`)}
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          flex: 1
        }}
      >
        <h4>{subject}-</h4>
        <p style={{ opacity: 0.5 }}>{messagebox}</p>
      </div>
    </div>
  );
}

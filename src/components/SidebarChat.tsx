import { Avatar, Typography } from "@material-ui/core";
import React from "react";
import { StyledTypography } from "./Sidebar";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { db } from "../fire";
import { useState } from "react";
import firebase from "firebase";

type Props = {
  name: String;
  id: String;
  // key: String;
};

const SidebarChat: React.FC<Props> = ({ name, id }) => {
  const [messages, setMessages] = useState<firebase.firestore.DocumentData[]>();
//   console.log(id);
//   console.log(id.toString());

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        //@ts-ignore
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
        setMessages(snapshot.docs.map((doc) => doc.data()))
        );
        console.log(messages);
    }
  }, []);

  return (
    <Link to={`/chats/${id}`} style={{textDecoration:'none', color: 'rgb(26,35,59)'}}>
      <div className="sidebarchat">
        <Avatar
          style={{ width: "50px", height: "50px" }}
          src="https://avatars.dicebear.com/api/human/:seed.svg"
        />
        <div className="sidebarchat__right">
          <StyledTypography style={{ margin: "0", padding: "0" }} variant="h5">
            {name}
          </StyledTypography>
          <StyledTypography style={{ margin: "0", padding: "0", height: '1.5em', lineHeight: '1.5em', overflow: 'hidden' }}>
            {messages && messages[0]?.message}
          </StyledTypography>
        </div>
      </div>
    </Link>
  );
};

export default SidebarChat;

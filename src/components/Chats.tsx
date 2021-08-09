import { Avatar, Button, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import { StyledTypography } from "./Sidebar";
import AttachmentIcon from "@material-ui/icons/Attachment";
import SendIcon from "@material-ui/icons/Send";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { db } from "../fire";
import { useSelector } from "react-redux";
import { StateType } from "../redux/store";
import firebase from "firebase";

const StyledP = styled.p`
  font-family: "NTR", sans-serif !important;
  width: fit-content;
  padding: 10px;
  font-size: larger;
  line-height: 1;
  max-width: 60%;
  position: relative;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const Chats = () => {
  const [roomName, setRoomName] = useState<string>("");
  const [messages, setMessages] = useState<
    firebase.firestore.DocumentData[] | []
  >();
  const [inputValue, setInputValue] = useState<string>("");
  const { user } = useSelector((state: StateType) => state.user);

  const { roomId } = useParams<{ roomId: string | undefined }>();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot(
          (snapshot) =>
            snapshot.data()!.name && setRoomName(snapshot.data()!.name)
        );

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  const handleSendMessage = () => {
    if (inputValue) {
      db.collection("rooms").doc(roomId).collection("messages").add({
        message: inputValue,
        name: user?.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        userId: user?.uid,
      });
      setInputValue("");
    }
  };

  return (
    <div className="chats">
      <div className="chats__container">
        {roomId ? (
          <>
            <div className="chats__chatHeader">
              <Avatar
                src="https://avatars.dicebear.com/api/human/:seed.svg"
                style={{ width: "70px", height: "70px", marginRight: "10px" }}
              />
              <div>
                <StyledTypography variant="h5">{roomName}</StyledTypography>
                <StyledTypography>
                  Last seen at{" "}
                  {messages &&
                    new Date(
                      messages[messages.length - 1]?.timestamp?.toDate()
                    ).toUTCString()}
                </StyledTypography>
              </div>
            </div>
            <div className="chats__chatsArea">
              {messages &&
                messages.map((message) => (
                  <>
                    <div
                      className="chats__messangerName"
                      style={{
                        textAlign:
                          message.userId === user!.uid ? "right" : "left",
                      }}
                    >
                      {message.name}
                    </div>
                    <StyledP
                      style={{
                        background:
                          message.userId === user!.uid
                            ? "rgb(26,35,59)"
                            : "white",
                        color:
                          message.userId === user!.uid
                            ? "whitesmoke"
                            : "rgb(26,35,59)",
                        borderRadius:
                          message.userId === user!.uid
                            ? "20px 0px 20px 20px"
                            : "0px 20px 20px 20px",
                        marginLeft: message.userId === user!.uid ? "auto" : "",
                        marginRight: message.userId === user!.uid ? "" : "auto",
                        textAlign:
                          message.userId === user!.uid ? "right" : "left",
                      }}
                    >
                      <div>{message.message}</div>
                      <div className="chats__messageDate">
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                      </div>
                    </StyledP>
                  </>
                ))}
            </div>
            <div className="chats__chatInput">
              <IconButton
                style={{ color: "white", background: "rgb(26,35,59)" }}
              >
                <AttachmentIcon />
              </IconButton>
              <input
                type="text"
                name="message"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type Your Message Here..."
              />
              <Button
                style={{ color: "white", background: "rgb(26,35,59)" }}
                onClick={handleSendMessage}
              >
                Send
                <SendIcon />
              </Button>
            </div>
          </>
        ) : (
          <h1> Please Select a Chat </h1>
        )}
      </div>
    </div>
  );
};

export default Chats;

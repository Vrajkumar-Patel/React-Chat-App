import { Avatar, Button, IconButton, Typography } from "@material-ui/core";
import logo from "../assets/iconLogo.png";
import styled from "styled-components";
import SidebarChat from "./SidebarChat";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import { auth, db } from "../fire";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/UserReducer";
import { useEffect, useState } from "react";
import { StateType } from "../redux/store";
import toast from "react-hot-toast";
import { RoomType } from "../types";

export const StyledTypography = styled(Typography)`
  font-family: "NTR", sans-serif !important;
  line-height: 1;
  margin-top: 8px;
  font-weight: ${(props) => (props.variant === "h5" ? "bold" : "")};
`;

export const StyledButton = styled(Button)`
  font-family: "NTR", sans-serif !important;
`;

const Sidebar = () => {
  const { user } = useSelector((state: StateType) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const [rooms, setRooms] = useState<[] | RoomType[]>();

  useEffect(() => {
    if (!user) {
      toast.error("You need to Login First");
      return history.push("/");
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  const handleSignOut = () => {
    auth.signOut();
    dispatch(setUser(null));
    localStorage.setItem("user", "null");
    return history.push("/");
  };

  const handleAddRoom = () => {
    const roomName = prompt("Please Enter the name of Chat Room");

    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <img src={logo} width="auto" height="auto" />
        <StyledTypography variant="h4" style={{ fontWeight: "bold" }}>
          Quick Chat
        </StyledTypography>
      </div>
      <div className="sidebar__profile">
        <IconButton
          style={{ position: "absolute", right: "0", top: "0" }}
          onClick={handleSignOut}
        >
          <ExitToAppOutlinedIcon />
        </IconButton>
        <Avatar
          style={{ width: "80px", height: "80px" }}
          src={user?.photoURL!}
        />
        <StyledTypography variant="h5">{user?.displayName}</StyledTypography>
        {/* <StyledTypography>User Subtitle</StyledTypography> */}
      </div>
      <div className="sidebar__chats">
        <StyledButton
          style={{ background: "rgb(26,35,59)", color: 'whitesmoke' }}
          onClick={handleAddRoom}
        >
          Add New Chat
        </StyledButton>
        <div className="sidebar__chatsLists">
          {rooms?.map((room) => (
            <SidebarChat id={room.id} name={room.data.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

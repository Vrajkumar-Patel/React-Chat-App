import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType  } from "../types";

const initialState: UserType = {
    user: JSON.parse(localStorage.getItem('user')!)
}

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
      setUser: (state, action: PayloadAction<firebase.default.User | null> ) => {
          return state = {...state, user: action.payload}
    }
  },
});

export const {
    setUser
} = UserSlice.actions;
export default UserSlice.reducer;

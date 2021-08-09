import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserReducer";

const store = configureStore({
  reducer: {
    user: UserReducer,
  },
});

export default store;

export type StateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

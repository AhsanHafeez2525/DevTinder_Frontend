import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./ConnectionSlice";
import requestReducer from "./RequestSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connection: connectionReducer,
    request: requestReducer,
  },
});

export default store;

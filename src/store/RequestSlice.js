import { createSlice } from "@reduxjs/toolkit";
const requestSlice = createSlice({
  name: "request",
  initialState: {
    requests: null,
  },
  reducers: {
    setRequests: (state, action) => {
      state.requests = action.payload;
    },
    removeRequests: (state, action) => {
      state.requests = null;
    },
  },
});
export const { setRequests, removeRequests } = requestSlice.actions;
export default requestSlice.reducer;

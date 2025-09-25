import { createSlice } from "@reduxjs/toolkit";
const connectionSlice = createSlice({
  name: "connection",
  initialState: {
    connections: null,
  },
  reducers: {
    setConnections: (state, action) => {
      state.connections = action.payload;
    },
    removeConnections: (state, action) => {
      state.connections = null;
    },
  },
});
export const { setConnections, removeConnections } = connectionSlice.actions;
export default connectionSlice.reducer;

const connectionSlice = createSlice({
  name: "connection",
  initialState: null,
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

import { createSlice } from '@reduxjs/toolkit';

export const feedSlice = createSlice({
  name: 'feed',
  initialState: null,
  reducers: {
    setFeed: (state, action) => {
      return action.payload;
    },
    removeFeed: (state, action) => {
      const newFeed = state.filter((user) => user._id !== action.payload);
      return null;
    },
  },
});

export const { setFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
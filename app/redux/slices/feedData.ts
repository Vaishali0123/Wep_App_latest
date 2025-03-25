import { createSlice } from "@reduxjs/toolkit";

export const feedData = createSlice({
  name: "feedData",
  initialState: {
    feed: [],
    isjoined: false, //User hasn't joined community so popup will show
    comjoined: [],
  },
  reducers: {
    setFeed: (state, action) => {
      state.feed = action.payload;
    },
    setIsJoined: (state, action) => {
      state.isjoined = action.payload;
    },
    setComjoined: (state, action) => {
      state.comjoined = action.payload;
    },
  },
});

export const { setFeed, setIsJoined, setComjoined } = feedData.actions;
export default feedData.reducer;

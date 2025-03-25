import { createSlice } from "@reduxjs/toolkit";

export const comFeed = createSlice({
  name: "comFeed",
  initialState: {
    chatheader: false,
    feed: [],
  },

  reducers: {
    setFeed: (state, action) => {
      state.feed = action.payload;
    },
    setChatHeader: (state, action) => {
      state.chatheader = action.payload;
    },
  },
});

export const { setFeed, setChatHeader } = comFeed.actions;
export default comFeed.reducer;

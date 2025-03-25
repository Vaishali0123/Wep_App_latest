import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    recentSearchPro: [],
    recentSearchCom: [],
  },
  reducers: {
    setRecentSearchPro: (state, action) => {
      state.recentSearchPro = action.payload;
    },
    setRecentSearchCom: (state, action) => {
      state.recentSearchCom = action.payload;
    },
  },
});

export const { setRecentSearchPro, setRecentSearchCom } = searchSlice.actions;
export default searchSlice.reducer;

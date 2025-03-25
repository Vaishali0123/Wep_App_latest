import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userCreationSlice";
import searchSlice from "./slices/searchSlice";
import comFeed from "./slices/comFeed";
import feedData from "./slices/feedData";
import { settingsApi } from "./slices/settingApi";

// Set up the Redux store
const store = configureStore({
  reducer: {
    user: userSlice,
    search: searchSlice,
    comFeed: comFeed,
    feedData: feedData,
    [settingsApi.reducerPath]: settingsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(settingsApi.middleware),
});

export default store;

// Define RootState type from store
export type RootState = ReturnType<typeof store.getState>;
// Define AppDispatch type from store
export type AppDispatch = typeof store.dispatch;

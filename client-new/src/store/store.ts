import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = AppStore["dispatch"];

export default store;

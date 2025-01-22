import { configureStore } from "@reduxjs/toolkit";
import demoSlice from "./slices/demoSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    application: demoSlice,
  },
});

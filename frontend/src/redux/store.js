import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./apiFetch/LoginSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

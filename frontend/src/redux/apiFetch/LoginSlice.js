import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";

const cookies = new Cookies();

const initialState = {
  token: "",
  loading: false,
  error: false,
  errorMsg: undefined,
  user: undefined,
};

export const getLogin = createAsyncThunk(
  //action type string
  "login/getLogin",
  // callback function
  async (data) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    }).then((data) => data.json());
    return res;
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    parseToken: (state) => {
      console.log(cookies.get("token"));
      if (cookies.get("token")) {
        state.token = cookies.get("token");
        state.user = jwt(cookies.get("token"));
      }
    },
  },
  extraReducers: {
    [getLogin.pending]: (state) => {
      state.loading = true;
    },
    [getLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.token = payload.data;
      state.errorMsg = undefined;
      state.user = jwt(payload.data);
    },
    [getLogin.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorMsg = action.payload.errorMsg;
    },
  },
});

export const loginReducer = loginSlice.reducer;
export const { parseToken } = loginSlice.actions;

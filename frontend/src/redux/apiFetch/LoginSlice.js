import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";

const cookies = new Cookies();

const initialState = {
  token: "",
  loading: false,
  error: false,
  errorMsg: undefined,
  user: null,
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

export const getLogout = createAsyncThunk("login/getLogout", async (data) => {
  const res = fetch("/api/auth/logout").then((data) => data.json());
  return res;
});

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    parseToken: (state) => {
      if (cookies.get("token")) {
        state.token = cookies.get("token");
        state.user = jwt(cookies.get("token"));
      } else {
        state.user = undefined;
      }
    },
  },
  extraReducers: {
    [getLogin.pending]: (state) => {
      state.loading = true;
    },
    [getLogin.fulfilled]: (state, { payload }) => {
      if (payload.data) {
        state.loading = false;
        state.token = payload.data;
        state.errorMsg = undefined;
        state.user = jwt(payload.data);
      } else {
        state.loading = false;
        state.error = true;
        state.errorMsg = payload.errorMsg;
      }
    },
    [getLogin.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorMsg = action.payload.errorMsg;
    },
    [getLogout.pending]: (state) => {
      state.loading = true;
    },
    [getLogout.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [getLogout.fulfilled]: (state) => {
      state.token = "";
      state.user = undefined;
    },
  },
});

export const loginReducer = loginSlice.reducer;
export const { parseToken } = loginSlice.actions;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  loading: false,
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
  reducers: {},
  extraReducers: {
    [getLogin.pending]: (state) => {
      state.loading = true;
    },
    [getLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.token = payload.data;
    },
    [getLogin.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const loginReducer = loginSlice.reducer;

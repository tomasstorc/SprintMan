import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  users: {},
  loading: false,
};

export const getUsers = createAsyncThunk(
  //action type string
  "users/getUsers",
  // callback function
  async () => {
    const res = await fetch(`/api/user`).then((data) => data.json());
    console.log(res);
    return res;
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.loading = true;
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.users = payload.data;
    },
    [getUsers.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const usersReducer = usersSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loading: false,
};

export const getUsers = createAsyncThunk(
  //action type string
  "users/getUsers",
  // callback function
  async (token) => {
    const res = await fetch(`/api/user`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((data) => data.json());
    console.log(res);
    return res;
  }
);

export const postUser = createAsyncThunk("user/postUser", async (data) => {
  const res = await fetch("/api/user/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${data.token}`,
    },

    body: JSON.stringify(data.body),
  })
    .then((data) => data.json())
    .catch((err) => err);
  return res;
});

export const editUser = createAsyncThunk(
  "user/edittUser",
  async (data, thunkAPI) => {
    const res = await fetch("/api/user/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${data.token}`,
      },

      body: JSON.stringify(data.body),
    })
      .then((data) => {
        thunkAPI.dispatch(getUsers(data.token));
        return data.json();
      })
      .catch((err) => err);
    return res;
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [postUser.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [postUser.pending]: (state) => {
      state.loading = true;
    },
    [postUser.fulfilled]: (state, action) => {
      console.log(action.payload.data);
      if (action.payload.data) {
        state.loading = false;
      } else {
        state.error = true;
        state.errorMsg = action.payload.errorMsg;
      }
    },
    [editUser.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [editUser.pending]: (state) => {
      state.loading = true;
    },
    [editUser.fulfilled]: (state, action) => {
      console.log(action.payload.data);
      if (action.payload.data) {
        state.loading = false;
      } else {
        state.error = true;
        state.errorMsg = action.payload.errorMsg;
      }
    },
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

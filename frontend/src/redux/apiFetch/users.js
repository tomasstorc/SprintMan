import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  editUser: {},
  editId: null,
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

export const getUser = createAsyncThunk(
  //action type string
  "users/getUsers",
  // callback function
  async (data) => {
    const res = await fetch(`/api/user/${data.id}`, {
      headers: {
        authorization: `Bearer ${data.token}`,
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

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setEditId: (state, action) => {
      state.editId = action.payload;
    },
  },
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
    [getUser.pending]: (state) => {
      state.loading = true;
    },
    [getUser.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },
    [getUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.editUser = action.payload.data;
    },
  },
});

export const usersReducer = usersSlice.reducer;
export const { setEditId } = usersSlice.actions;

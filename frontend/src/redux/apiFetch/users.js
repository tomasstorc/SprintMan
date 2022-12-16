import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  userToEdit: {},
  editId: null,
  loading: false,
  passwordUpdated: false,
  errorMsg: "",
  pwUpdatedMsg: "",
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

    return res;
  }
);

export const getUserById = createAsyncThunk(
  //action type string
  "users/getUserById",
  // callback function
  async (data) => {
    const res = await fetch(`/api/user/${data.id}`, {
      headers: {
        authorization: `Bearer ${data.token}`,
      },
    }).then((data) => data.json());

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
  "user/editUser",
  async (data, thunkAPI) => {
    const res = await fetch(`/api/user/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${data.token}`,
      },

      body: JSON.stringify(data.body),
    })
      .then((data) => {
        return data.json();
      })
      .catch((err) => err);
    return res;
  }
);

export const setNewPasswordApi = createAsyncThunk(
  "user/setNewPasswordApi",
  async (data) => {
    const res = await fetch(`/api/user/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data.body),
    })
      .then((data) => {
        return data.json();
      })
      .catch((err) => err);
    return res;
  }
);

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
      console.log(action.payload);
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
      console.log(action.payload);
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
    [getUserById.pending]: (state) => {
      state.loading = true;
    },
    [getUserById.rejected]: (state, action) => {
      state.error = true;
      state.loading = false;
    },
    [getUserById.fulfilled]: (state, action) => {
      state.loading = false;
      state.userToEdit = action.payload.data;
    },
    [setNewPasswordApi.pending]: (state) => {
      state.loading = true;
    },
    [setNewPasswordApi.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [setNewPasswordApi.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.status === "error") {
        state.error = true;
        state.errorMsg = "Error: You are not authorized for this operation";
      } else {
        state.passwordUpdated = true;
        state.error = false;
        state.errorMsg = "";
        state.pwUpdatedMsg = "Passowrd updated you may login now.";
      }
    },
  },
});

export const usersReducer = usersSlice.reducer;
export const { setEditId } = usersSlice.actions;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const postSubject = createAsyncThunk(
  "subject/postSubject",
  async (data) => {
    const res = await fetch("/api/subject/", {
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
  }
);

export const getSubjectsNames = createAsyncThunk(
  "subject/getSubjectsNames",
  async (token, thunkAPI) => {
    const res = await fetch("/api/subject/name", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((data) => data.json());
    return res;
  }
);

export const subject = createSlice({
  name: "subject",
  initialState: {
    loading: false,
    error: false,
    errorMsg: undefined,
    subjectNames: [],
  },
  reducers: {},
  extraReducers: {
    [postSubject.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [postSubject.pending]: (state) => {
      state.loading = true;
    },
    [postSubject.fulfilled]: (state, action) => {
      console.log(action.payload);
      if (action.payload.dsts) {
        state.loading = false;
      } else {
        state.error = true;
        state.errorMsg = action.payload.errorMsg;
      }
    },
    [getSubjectsNames.rejected]: (state, action) => {
      state.error = true;
      state.errorMsg = "something went wrong";
    },
    [getSubjectsNames.pending]: (state) => {
      state.loading = true;
    },
    [getSubjectsNames.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.subjectNames = action.payload.data;
      state.loading = false;
    },
  },
});

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const postSubject = createAsyncThunk(
  "subject/postSubject",
  async (data) => {
    console.log(data);
    const res = await fetch("/api/subject/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${data.token}`,
      },

      body: JSON.stringify(data.body),
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
  },
});

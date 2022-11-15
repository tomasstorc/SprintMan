import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  subjectDetail: {},
  loading: false,
};

export const getSubjectDetail = createAsyncThunk(
  //action type string
  "subjectDetail/getSubjectDetail",
  // callback function
  async (id) => {
    const res = await fetch(`/api/subject/${id}`).then((data) => data.json());
    console.log(res);
    return res;
  }
);

export const subjectDetailSlice = createSlice({
  name: "subjectDetail",
  initialState,
  reducers: {},
  extraReducers: {
    [getSubjectDetail.pending]: (state) => {
      state.loading = true;
    },
    [getSubjectDetail.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.subjectDetail = payload.data;
    },
    [getSubjectDetail.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const subjectDetailReducer = subjectDetailSlice.reducer;

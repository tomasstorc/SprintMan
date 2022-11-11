import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  programDetail: {},
  loading: false,
};

export const getStudyProgramDetail = createAsyncThunk(
  //action type string
  "studyProgramDetail/getStudyProgramDetail",
  // callback function
  async (id) => {
    const res = await fetch(`/api/programme/${id}`).then((data) => data.json());
    console.log(res);
    return res;
  }
);

export const studyProgramDetailSlice = createSlice({
  name: "studyProgramDetail",
  initialState,
  reducers: {},
  extraReducers: {
    [getStudyProgramDetail.pending]: (state) => {
      state.loading = true;
    },
    [getStudyProgramDetail.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.programDetail = payload.data;
    },
    [getStudyProgramDetail.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const studyProgramDetailReducer = studyProgramDetailSlice.reducer;

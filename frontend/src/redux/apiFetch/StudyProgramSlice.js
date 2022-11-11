import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  programList: [],
  loading: false,
};

export const getStudyProgram = createAsyncThunk(
  //action type string
  "studyProgram/getStudyProgram",
  // callback function
  async (data) => {
    const res = await fetch("/api/programme").then((data) => data.json());
    return res;
  }
);

export const studyProgramSlice = createSlice({
  name: "studyProgram",
  initialState,
  reducers: {},
  extraReducers: {
    [getStudyProgram.pending]: (state) => {
      state.loading = true;
    },
    [getStudyProgram.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.programList = payload.data;
      console.log(payload.data);
    },
    [getStudyProgram.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const studyProgramReducer = studyProgramSlice.reducer;

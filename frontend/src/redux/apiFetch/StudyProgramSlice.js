import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  programList: [],
  loading: false,
  error: false,
  status: "",
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

export const postProgram = createAsyncThunk(
  "studyProgram/postProgram",
  async (data, thunkAPI) => {
    const res = await fetch("/api/programme/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${data.token}`,
      },

      body: JSON.stringify(data.body),
    }).then((data) => {
      thunkAPI.dispatch(getStudyProgram());
      return data.json();
    });
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
      state.status = payload.status;
    },
    [getStudyProgram.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [postProgram.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [postProgram.pending]: (state) => {
      state.loading = true;
    },
    [postProgram.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.error = false;
      state.status = action.payload.status;
    },
  },
});

export const studyProgramReducer = studyProgramSlice.reducer;

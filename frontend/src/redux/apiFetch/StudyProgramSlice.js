import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  programList: [],
  editId: null,
  editProgram: {},
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

export const programDetail = createAsyncThunk(
  //action type string
  "studyProgram/programDetail",
  // callback function
  async (id) => {
    const res = await fetch(`/api/programme/${id}`).then((data) => data.json());
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

export const putProgram = createAsyncThunk(
  "studyProgram/putProgram",
  async (data, thunkAPI) => {
    const res = await fetch(`/api/programme/${data.body._id}`, {
      method: "PUT",
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
  reducers: {
    setEditId: (state, action) => {
      state.editId = action.payload;
    },
  },
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
    [programDetail.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.editProgram = action.payload.data;
    },
    [programDetail.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [programDetail.pending]: (state) => {
      state.loading = true;
    },
    [putProgram.fulfilled]: (state, action) => {
      console.log(action);
      state.loading = false;
    },
  },
});

export const { setEditId } = studyProgramSlice.actions;
export const studyProgramReducer = studyProgramSlice.reducer;

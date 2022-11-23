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

export const putSubject = createAsyncThunk(
  "subject/putSubject",
  async (data) => {
    const res = await fetch(`/api/subject/${data.id}`, {
      method: "PUT",
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
export const getSubjects = createAsyncThunk(
  "subject/getSubjects",
  async (token, thunkAPI) => {
    const res = await fetch("/api/subject", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((data) => data.json());
    return res;
  }
);

export const getSubjectById = createAsyncThunk(
  //action type string
  "subjectDetail/getSubjectById",
  // callback function
  async (id) => {
    const res = await fetch(`/api/subject/${id}`).then((data) => data.json());
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
    subjects: [],
    subjectToEdit: {},
    editId: null,
  },
  reducers: {
    setEditId: (state, action) => {
      state.editId = action.payload;
    },
  },
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
      if (action.payload.data) {
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
    [getSubjects.rejected]: (state, action) => {
      state.error = true;
      state.errorMsg = "something went wrong";
    },
    [getSubjects.pending]: (state) => {
      state.loading = true;
    },
    [getSubjects.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.subjects = action.payload.data;
      state.loading = false;
    },
    [putSubject.pending]: (state, action) => {
      state.loading = true;
    },
    [putSubject.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [putSubject.fulfilled]: (state) => {
      state.loading = false;
    },
    [getSubjectById.pending]: (state) => {
      state.loading = true;
    },
    [getSubjectById.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [getSubjectById.fulfilled]: (state, action) => {
      state.loading = false;
      state.subjectToEdit = action.payload.data;
    },
  },
});

export const { setEditId } = subject.actions;

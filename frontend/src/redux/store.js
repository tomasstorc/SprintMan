import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./apiFetch/LoginSlice";
import { studyProgramReducer } from "./apiFetch/StudyProgramSlice";
import { studyProgramDetailReducer } from "./apiFetch/StudyProgramDetail";
import { subject } from "./apiFetch/subject";
import { subjectDetailReducer } from "./apiFetch/SubjectDetail";
export const store = configureStore({
  reducer: {
    login: loginReducer,
    subject: subject.reducer,
    studyProgram: studyProgramReducer,
    studyProgramDetail: studyProgramDetailReducer,
    subjectDetail: subjectDetailReducer,
  },
});

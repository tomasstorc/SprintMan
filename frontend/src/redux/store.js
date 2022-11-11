import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./apiFetch/LoginSlice";
import { studyProgramReducer } from "./apiFetch/StudyProgramSlice";
import { studyProgramDetailReducer } from "./apiFetch/StudyProgramDetail";
export const store = configureStore({
  reducer: {
    login: loginReducer,
    studyProgram: studyProgramReducer,
    studyProgramDetail: studyProgramDetailReducer,
  },
});

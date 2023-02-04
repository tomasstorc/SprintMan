import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import App from "./App";
import LoginPage from "./pages/LoginPage";
import StudyProgrammePage from "./pages/StudyProgrammePage";
import SubjectPage from "./pages/SubjectPage";
import StudyPage from "./pages/StudyPage";
import AdministrationPage from "./pages/AdministrationPage";

import ChangePasswordPage from "./pages/ChangePasswordPage";
import disableLog from "./utils/disable-log";

disableLog();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<App />}>
            <Route path="/" element={<StudyPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/administration" element={<AdministrationPage />} />
            <Route path="/program/:id" element={<StudyProgrammePage />} />
            <Route path="/subject/:id" element={<SubjectPage />} />
            <Route
              path="/changepassword/:id"
              element={<ChangePasswordPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/LoginPage";
import StudyProgrammePage from "./pages/StudyProgrammePage";
import SubjectPage from "./pages/SubjectPage";
import StudyPage from "./pages/StudyPage";
import AdministrationPage from "./pages/AdministrationPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<StudyPage />} />
        <Route path="/" element={<StudyPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/administration" element={<AdministrationPage />} />
        <Route path="/study-programme" element={<StudyProgrammePage />} />
        <Route path="/subject" element={<SubjectPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

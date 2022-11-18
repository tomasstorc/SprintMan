import { useState } from "react";
import { Button } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { parseToken } from "../redux/apiFetch/LoginSlice";

import SubjectForm from "../components/subjectForm/SubjectForm";
import StudyProgramForm from "../components/studyProgramForm/StudyProgramForm";
import { useEffect } from "react";
const AdministrationPage = () => {
  let dispatch = useDispatch();
  const [showSubject, setShowSubject] = useState(false);
  const [showProgram, setShowProgram] = useState(false);

  useEffect(() => {
    parseToken();
  }, [dispatch]);
  return (
    <div>
      <Button
        onClick={() => {
          setShowSubject(!showSubject);
        }}
      >
        Create Subject
      </Button>
      <Button
        onClick={() => {
          setShowProgram(!showProgram);
        }}
      >
        Create study program
      </Button>
      {showSubject && (
        <SubjectForm show={showSubject} setShow={setShowSubject} />
      )}
      {showProgram && (
        <StudyProgramForm show={showProgram} setShow={setShowProgram} />
      )}
    </div>
  );
};

export default AdministrationPage;

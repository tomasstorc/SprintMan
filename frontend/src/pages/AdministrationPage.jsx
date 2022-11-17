import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { getSubjectsNames } from "../redux/apiFetch/subject";

import SubjectForm from "../components/subjectForm/SubjectForm";
import StudyProgramForm from "../components/studyProgramForm/StudyProgramForm";
const AdministrationPage = () => {
  const { token } = useSelector((state) => state.login);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubjectsNames(token));
  });
  const [showSubject, setShowSubject] = useState(false);
  const [showProgram, setShowProgram] = useState(false);

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

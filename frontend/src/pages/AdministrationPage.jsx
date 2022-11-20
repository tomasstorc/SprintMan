import { useState } from "react";
import { Button } from "react-bootstrap";

import { useSelector } from "react-redux";

import SubjectForm from "../components/subjectForm/SubjectForm";
import StudyProgramForm from "../components/studyProgramForm/StudyProgramForm";

import StudyProgramTable from "../components/administrationTables/StudyProgramTable";
import SubjetsTable from "../components/administrationTables/SubjetsTable";
const AdministrationPage = () => {
  const { token } = useSelector((state) => state.login);
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
      <StudyProgramTable />
      <SubjetsTable token={token} />
    </div>
  );
};

export default AdministrationPage;

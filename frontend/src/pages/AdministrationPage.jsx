import { useState } from "react";
import { Button, Dropdown, Row, Col, Container } from "react-bootstrap";

import { useSelector } from "react-redux";

import SubjectForm from "../components/subjectForm/SubjectForm";
import StudyProgramForm from "../components/studyProgramForm/StudyProgramForm";

import StudyProgramTable from "../components/administrationTables/StudyProgramTable";
import SubjetsTable from "../components/administrationTables/SubjetsTable";
import UserTable from "../components/administrationTables/UserTable";
import UserForm from "../components/userForm/UserForm";

const AdministrationPage = () => {
  const type = {
    programs: "Study programs",
    subjects: "Subjects",
    users: "Users",
  };
  const [table, setTable] = useState(type.users);
  const { token } = useSelector((state) => state.login);
  const [showSubject, setShowSubject] = useState(false);
  const [showProgram, setShowProgram] = useState(false);
  const [showUser, setShowUser] = useState(false);

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Dropdown>
            <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
              {table}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  setTable(type.users);
                }}
              >
                {type.users}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setTable(type.subjects);
                }}
              >
                {type.subjects}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setTable(type.programs);
                }}
              >
                {type.programs}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        {table === type.users && (
          <>
            <Col md={"auto"}>
              <Button
                variant="dark"
                onClick={() => {
                  setShowUser(!showUser);
                }}
              >
                Create User
              </Button>
            </Col>
            {showUser && <UserForm show={showUser} setShow={setShowUser} />}
            <UserTable title={type.users} token={token} />
          </>
        )}
        {table === type.subjects && (
          <>
            <Col md={"auto"}>
              <Button
                variant="dark"
                onClick={() => {
                  setShowSubject(!showSubject);
                }}
              >
                Create Subject
              </Button>
            </Col>
            {showSubject && (
              <SubjectForm show={showSubject} setShow={setShowSubject} />
            )}
            <SubjetsTable title={type.subjects} token={token} />
          </>
        )}
        {table === type.programs && (
          <>
            <Col md={"auto"}>
              <Button
                variant="dark"
                onClick={() => {
                  setShowProgram(!showProgram);
                }}
              >
                Create study program
              </Button>
            </Col>
            {showProgram && (
              <StudyProgramForm
                title={type.programs}
                show={showProgram}
                setShow={setShowProgram}
              />
            )}
            <StudyProgramTable title={type.programs} />{" "}
          </>
        )}
      </Row>
    </Container>
  );
};

export default AdministrationPage;

import { useState } from "react";
import { Button } from "react-bootstrap";
import SubjectForm from "../components/SubjectForm";

const AdministrationPage = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <Button
        onClick={() => {
          setShow(!show);
        }}
      >
        Create Subject
      </Button>
      {show && <SubjectForm show={show} setShow={setShow} />}
    </div>
  );
};

export default AdministrationPage;

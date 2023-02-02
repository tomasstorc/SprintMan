import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addSubjects } from "../../redux/apiFetch/StudyProgramSlice";
import { getSubjectsNames } from "../../redux/apiFetch/subject";

const AddSubjectForm = ({ pid, type, show, setShow }) => {
  let dispatch = useDispatch();
  const { subjectNames } = useSelector((state) => state.subject);
  const { token } = useSelector((state) => state.login);
  const [subjects, setSubjects] = useState([]);
  const [values, setValues] = useState([]);
  useEffect(() => {
    dispatch(getSubjectsNames(token));
  }, [dispatch, token]);
  const handleChange = (e) => {
    const { value } = e.target;
    setSubjects([...subjects, value]);
    console.log(subjects);
    setValues([...values, e.target.selectedOptions[0].label]);
  };
  const handleSubmit = () => {
    const payload = {
      token: token,
      pid: pid,
      stype: type,
      body: {
        ids: subjects,
      },
    };
    dispatch(addSubjects(payload))
      .unwrap()
      .then(() => {
        setShow(false);
      });
  };
  return (
    <Modal
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.500)",
      }}
      show={show}
    >
      <Modal.Header>
        <Modal.Title>Add subjects</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Subject
        <Form.Select onChange={handleChange}>
          {subjectNames?.map((subject) => {
            return <option value={subject._id}>{subject.name}</option>;
          })}
        </Form.Select>
        Selected subjects: {values.join(", ")}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleSubmit}>
          Submit
        </Button>
        <Button
          variant="outline-dark"
          onClick={() => {
            setShow(!show);
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddSubjectForm;

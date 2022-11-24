import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteById } from "../redux/apiFetch/deleteSlice";
import { getStudyProgram } from "../redux/apiFetch/StudyProgramSlice";
import { getSubjects } from "../redux/apiFetch/subject";
import { getUsers } from "../redux/apiFetch/users";

const DeleteModal = ({ type, showDelete, setShowDelete }) => {
  const { deleteId } = useSelector((state) => state.delete);
  const { token } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const handleClick = () => {
    let payload = {
      id: deleteId,
      token: token,
      type: type,
    };
    dispatch(deleteById(payload))
      .unwrap()
      .then(() => {
        switch (type) {
          case "programme":
            dispatch(getStudyProgram());
            break;
          case "user":
            dispatch(getUsers(token));
            break;
          case "subject":
            dispatch(getSubjects(token));
            break;
          default:
            console.log("unknown type");
        }
        setShowDelete(false);
      })
      .catch(() => {
        switch (type) {
          case "programme":
            dispatch(getStudyProgram());
            break;
          case "user":
            dispatch(getUsers(token));
            break;
          case "subject":
            dispatch(getSubjects(token));
            break;
          default:
            console.log("unknown type");
        }
        setShowDelete(false);
      });
  };
  return (
    <Modal show={showDelete}>
      <Modal.Header>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Are you really want to delete? This process cannot be undone
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            setShowDelete(false);
          }}
        >
          Close
        </Button>
        <Button variant="danger" onClick={handleClick}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;

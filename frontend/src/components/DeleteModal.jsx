import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteModal = ({ item }) => {
  return (
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Are you really want to delete this {item}? This process cannot be undone
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary">Close</Button>
        <Button variant="danger">Delete</Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
};

export default DeleteModal;

import { useForm } from "react-hook-form";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import { useCallback } from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getSubjects } from "../../redux/apiFetch/subject";
import { getSubjectById, putSubject } from "../../redux/apiFetch/subject";
import { useEffect } from "react";

const SubjectFormEdit = ({ show, setShow }) => {
  let { token } = useSelector((state) => state.login);
  let { editId, subjectToEdit } = useSelector((state) => state.subject);
  const MYdefaultValues = {
    name: subjectToEdit?.name,
    credits: subjectToEdit?.credits,
    language: subjectToEdit?.language,
    degree: subjectToEdit?.degree,
    goal: subjectToEdit?.goal,
    teacher: subjectToEdit?.teacher,
    supervisor: subjectToEdit?.supervisor,
  };
  const { register, handleSubmit, reset } = useForm({
    defaultValues: MYdefaultValues,
  });
  let dispatch = useDispatch();

  const resetAsyncForm = useCallback(async () => {
    let res = await dispatch(getSubjectById(editId));
    reset(res.payload.data);
  }, [dispatch, editId, reset]);
  useEffect(() => {
    resetAsyncForm();
  }, [resetAsyncForm]);

  const onSubmit = (data) => {
    let subjectPost = {
      token: token,
      body: data,
      id: editId,
    };
    dispatch(putSubject(subjectPost))
      .unwrap()
      .then(() => {
        dispatch(getSubjects(token));
      });
  };

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Create subject</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>Subject name</Form.Label>
          <Form.Control {...register("name", { required: true })} />
          <Row>
            <Col md={3}>
              <Form.Label>Credits</Form.Label>
              <Form.Control
                {...register("credits", { required: true })}
                type="number"
              />
            </Col>
            <Col md={4}>
              <Form.Label>Language</Form.Label>
              <Form.Select {...register("language", { required: true })}>
                <option value="czech">Czech</option>
                <option value="english">English</option>
              </Form.Select>
            </Col>
            <Col md={5}>
              <Form.Label>Degree of study</Form.Label>
              <Form.Select {...register("degree", { required: true })}>
                <option value="Bc.">Bc.</option>
                <option value="Ing.">Ing.</option>
              </Form.Select>
            </Col>
          </Row>
          <Form.Label>Goal and description</Form.Label>
          <Form.Control
            as="textarea"
            {...register("goal", { required: true })}
          />

          <Form.Label>Teacher</Form.Label>
          <Form.Control {...register("teacher", { required: true })} />
          <Form.Label>Supervisor</Form.Label>

          <Form.Control {...register("supervisor", { required: true })} />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" type="submit" onClick={handleSubmit(onSubmit)}>
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

export default SubjectFormEdit;

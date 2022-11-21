import { useForm } from "react-hook-form";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import { getSubjectsNames } from "../../redux/apiFetch/subject";

import {
  putProgram,
  programDetail,
} from "../../redux/apiFetch/StudyProgramSlice";
import { useEffect } from "react";
import { useCallback } from "react";

const StudyProgramFormEdit = ({ show, setShow }) => {
  let { token } = useSelector((state) => state.login);
  let { editProgram, editId } = useSelector((state) => state.studyProgram);
  let MYdefaultValues = {
    name: editProgram?.name,
    length: editProgram?.length,
    language: editProgram?.language,
    degree: editProgram?.degree,
    description: editProgram?.description,
    imageUrl: editProgram?.imageUrl,
    field: editProgram?.field,
    osubjects: editProgram?.osubjects,
    ssubjects: editProgram?.ssubjects,
    ossubjects: editProgram?.ossubjects,
  };
  let dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: MYdefaultValues,
  });
  const resetAsyncForm = useCallback(async () => {
    let res = await dispatch(programDetail(editId));
    reset(res.payload.data);
  }, [dispatch, editId, reset]);
  useEffect(() => {
    dispatch(getSubjectsNames(token));
    resetAsyncForm();
  }, [resetAsyncForm, token, dispatch]);

  const onSubmit = (data) => {
    const programPost = {
      token: token,
      body: data,
    };
    dispatch(putProgram(programPost));
  };

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Create subject</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>Study program name</Form.Label>
          <Form.Control {...register("name", { required: true })} />
          <Row>
            <Col md={3}>
              <Form.Label>Length</Form.Label>
              <Form.Control
                {...register("length", { required: true })}
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
                {" "}
                <option value="Bc.">Bc.</option>
                <option value="Ing.">Ing.</option>
              </Form.Select>
            </Col>
          </Row>
          <Form.Label>Field</Form.Label>
          <Form.Select {...register("field", { required: true })}>
            {" "}
            <option value="it">Information technologies</option>
            <option value="business">Business and economics</option>
          </Form.Select>
          <Form.Label>Image URL</Form.Label>
          <Form.Control {...register("imageUrl", { required: true })} />
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            {...register("description", { required: true })}
          />
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

export default StudyProgramFormEdit;

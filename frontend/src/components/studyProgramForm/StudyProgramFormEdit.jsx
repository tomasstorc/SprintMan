import { useForm } from "react-hook-form";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import {
  putProgram,
  programDetail,
  getStudyProgram,
} from "../../redux/apiFetch/StudyProgramSlice";
import { useEffect } from "react";
import { useCallback } from "react";
import AddSubjectForm from "./AddSubjectForm";
import { useState } from "react";

const StudyProgramFormEdit = ({ show, setShow }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [subjectType, setSubjectType] = useState("");
  let { token } = useSelector((state) => state.login);
  let { editProgram, editId, subject } = useSelector(
    (state) => state.studyProgram
  );
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: MYdefaultValues,
  });
  const resetAsyncForm = useCallback(async () => {
    let res = await dispatch(programDetail(editId));
    reset(res.payload.data);
  }, [dispatch, editId, reset]);
  useEffect(() => {
    resetAsyncForm();
  }, [resetAsyncForm, token, dispatch]);

  const onSubmit = (data) => {
    const programPost = {
      token: token,
      body: data,
    };
    dispatch(putProgram(programPost))
      .unwrap()
      .then(() => {
        dispatch(getStudyProgram());
      });
  };

  return (
    <Modal show={show}>
      {!subject ? (
        <div>
          <Modal.Header>
            <Modal.Title>Edit study program</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Label>Study program name</Form.Label>
              <Form.Control {...register("name", { required: true })} />
              {errors?.name?.type === "required" && (
                <p className="error">This field is required</p>
              )}

              <Row>
                <Col md={3}>
                  <Form.Label>Length</Form.Label>
                  <Form.Control
                    {...register("length", { required: true })}
                    type="number"
                  />
                  {errors?.lenght?.type === "required" && (
                    <p className="error">This field is required</p>
                  )}
                </Col>
                <Col md={4}>
                  <Form.Label>Language</Form.Label>
                  <Form.Select {...register("language", { required: true })}>
                    <option value="czech">Czech</option>
                    <option value="english">English</option>
                  </Form.Select>
                  {errors?.language?.type === "required" && (
                    <p className="error">This field is required</p>
                  )}
                </Col>
                <Col md={5}>
                  <Form.Label>Degree of study</Form.Label>
                  <Form.Select {...register("degree", { required: true })}>
                    {" "}
                    <option value="Bc.">Bc.</option>
                    <option value="Ing.">Ing.</option>
                  </Form.Select>
                  {errors?.degree?.type === "required" && (
                    <p className="error">This field is required</p>
                  )}
                </Col>
              </Row>
              <Form.Label>Field</Form.Label>
              <Form.Select {...register("field", { required: true })}>
                {" "}
                <option value="it">Information technologies</option>
                <option value="business">Business and economics</option>
              </Form.Select>
              {errors?.field?.type === "required" && (
                <p className="error">This field is required</p>
              )}

              <Form.Label>Image URL</Form.Label>
              <Form.Control {...register("imageUrl", { required: false })} />
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                {...register("description", { required: true })}
              />
              {errors?.description?.type === "required" && (
                <p className="error">This field is required</p>
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="dark"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
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
        </div>
      ) : (
        <div>
          <Modal.Header>
            {" "}
            <Modal.Title>Add subjects to study program form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="py-3">
              <Button
                className="mb-2"
                variant="dark"
                onClick={() => {
                  setShowAdd(true);
                  setSubjectType("osubject");
                }}
              >
                Obligatory subjects
              </Button>
              <Button
                className="mb-2"
                variant="dark"
                onClick={() => {
                  setShowAdd(true);
                  setSubjectType("ssubject");
                }}
              >
                Selective subjects
              </Button>
              <Button
                variant="dark"
                onClick={() => {
                  setShowAdd(true);
                  setSubjectType("ossubject");
                }}
              >
                Obligatory-selective subjects
              </Button>
              {showAdd && (
                <AddSubjectForm
                  pid={editId}
                  type={subjectType}
                  show={showAdd}
                  setShow={setShowAdd}
                />
              )}
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-dark"
              onClick={() => {
                setShow(!show);
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </div>
      )}
    </Modal>
  );
};

export default StudyProgramFormEdit;

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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
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
        setShow(!show);
      });
  };

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Edit subject</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>Subject name</Form.Label>
          <Form.Control {...register("name", { required: true })} />
          {errors?.name?.type === "required" && (
            <p className="error">This field is required</p>
          )}

          <Row>
            <Col md={3}>
              <Form.Label>Credits</Form.Label>
              <Form.Control
                {...register("credits", { required: true })}
                type="number"
              />
              {errors?.credits?.type === "required" && (
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
                <option value="Bc.">Bc.</option>
                <option value="Ing.">Ing.</option>
              </Form.Select>
              {errors?.degree?.type === "required" && (
                <p className="error">This field is required</p>
              )}
            </Col>
          </Row>
          <Form.Label>Goal and description</Form.Label>
          <Form.Control
            as="textarea"
            {...register("goal", { required: true })}
          />
          {errors?.goal?.type === "required" && (
            <p className="error">This field is required</p>
          )}

          <Form.Label>Teacher</Form.Label>
          <Form.Control {...register("teacher", { required: true })} />
          {errors?.teacher?.type === "required" && (
            <p className="error">This field is required</p>
          )}

          <Form.Label>Supervisor</Form.Label>

          <Form.Control {...register("supervisor", { required: true })} />
          {errors?.name?.type === "supervisor" && (
            <p className="error">This field is required</p>
          )}
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

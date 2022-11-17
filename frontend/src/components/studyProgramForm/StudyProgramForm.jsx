import { useForm } from "react-hook-form";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { postProgram } from "../../redux/apiFetch/StudyProgramSlice";
import { useDispatch } from "react-redux";
import ListInputSubject from "./ListInputSubject";

const StudyProgramForm = ({ show, setShow }) => {
  let dispatch = useDispatch();
  let { token } = useSelector((state) => state.login);
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      name: "",
      length: null,
      language: "",
      degree: "",
      description: "",
      imageUrl: "",
      field: "",
      osubjects: [],
      ssubjects: [],
      ossubjects: [],
    },
  });
  const onSubmit = (data) => {
    const programPost = {
      token: token,
      body: data,
    };
    dispatch(postProgram(programPost));
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

          <ListInputSubject
            subjectType="osubjects"
            register={register}
            name="Obligatory subjects"
            control={control}
          />

          <ListInputSubject
            subjectType="ossubjects"
            register={register}
            name="Obligatory-Selective subjects"
            control={control}
          />
          <ListInputSubject
            subjectType="ssubjects"
            register={register}
            name="Selective subjects"
            control={control}
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

export default StudyProgramForm;

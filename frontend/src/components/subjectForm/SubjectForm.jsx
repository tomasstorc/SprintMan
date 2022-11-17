import { useForm } from "react-hook-form";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import ListInputMaterial from "./ListInputMaterial";
import ListInputTopic from "./ListInputTopics";
import { useSelector } from "react-redux";
import { postSubject } from "../../redux/apiFetch/subject";
import { useDispatch } from "react-redux";

const SubjectForm = ({ show, setShow }) => {
  let dispatch = useDispatch();
  let { token } = useSelector((state) => state.login);
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: "",
      credits: null,
      language: "",
      degree: "",
      goal: "",
      materials: [{ title: "", link: "" }],
      topics: [{ name: "", materials: [{ title: "", link: "" }] }],
      teacher: "",
      supervisor: "",
    },
  });
  const onSubmit = (data) => {
    let subjectPost = {
      token: token,
      body: data,
    };
    dispatch(postSubject(subjectPost));
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
          <ListInputMaterial
            register={register}
            name="materials"
            control={control}
          />

          {/* <Form.Control
            {...register("materials", { required: true })}
            placeholder="Materials"
          /> */}
          <ListInputTopic register={register} control={control} reset={reset} />

          {/* <Form.Control
            {...register("topics", { required: true })}
            placeholder="Topics"
          /> */}
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

export default SubjectForm;

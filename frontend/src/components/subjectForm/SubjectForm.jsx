import { useForm } from "react-hook-form";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import ListInputMaterial from "./ListInputMaterial";
import ListInputTopic from "./ListInputTopics";
import { useSelector } from "react-redux";
import { postSubject } from "../../redux/apiFetch/subject";
import { useDispatch } from "react-redux";
import { getSubjects } from "../../redux/apiFetch/subject";

const SubjectForm = ({ show, setShow }) => {
  let dispatch = useDispatch();
  let { token } = useSelector((state) => state.login);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
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
    console.log(data);
    let subjectPost = {
      token: token,
      body: data,
    };
    dispatch(postSubject(subjectPost))
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
              {errors?.credits?.type === "number" && (
                <p className="error">This field must be number</p>
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
          <ListInputMaterial
            register={register}
            name="materials"
            control={control}
          />
          {errors?.materials?.type === "required" && (
            <p className="error">This field is required</p>
          )}

          <ListInputTopic register={register} control={control} reset={reset} />

          <Form.Label>Teacher</Form.Label>
          <Form.Control {...register("teacher", { required: true })} />
          {errors?.teacher?.type === "required" && (
            <p className="error">This field is required</p>
          )}
          <Form.Label>Supervisor</Form.Label>

          <Form.Control {...register("supervisor", { required: true })} />
          {errors?.supervisor?.type === "required" && (
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

export default SubjectForm;

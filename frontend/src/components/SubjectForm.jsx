import { useForm } from "react-hook-form";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import ListInputMaterial from "./ListInputMaterial";
import ListInputTopic from "./ListInputTopics";

const SubjectForm = ({ show, setShow }) => {
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
  const onSubmit = (data) => console.log(data);

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Create subject</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            {...register("name", { required: true })}
            placeholder="Subject name"
          />
          <Row>
            <Col md={3}>
              <Form.Control
                {...register("credits", { required: true })}
                placeholder="Credits"
                type="number"
              />
            </Col>
            <Col md={4}>
              {" "}
              <Form.Control
                {...register("language", { required: true })}
                placeholder="Language"
              />
            </Col>
            <Col md={5}>
              <Form.Control
                {...register("degree", { required: true })}
                placeholder="Degree of study"
              />
            </Col>
          </Row>
          <Form.Control
            as="textarea"
            {...register("goal", { required: true })}
            placeholder="Goal"
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
          <Form.Control
            {...register("teacher", { required: true })}
            placeholder="Teacher"
          />
          <Form.Control
            {...register("supervisor", { required: true })}
            placeholder="Supervisor"
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

export default SubjectForm;

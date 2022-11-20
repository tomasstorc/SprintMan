import { useFieldArray } from "react-hook-form";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin2Line } from "react-icons/ri";

const ListInputTopicMaterial = ({ register, nestIndex, control }) => {
  // const { register, control } = useForm({
  //   defaultValues: {
  //     materials: [{ title: "", link: "" }],
  //     topics: [{: "", title: "", link: "" }],
  //   },
  // });

  const { fields, append, remove } = useFieldArray({
    control,
    name: `topics.${nestIndex}.materials`,
  });

  return (
    <div>
      {" "}
      <ListGroup>
        <Form.Label>Materials</Form.Label>
        {fields.map((item, index) => {
          return (
            <ListGroup.Item key={item.id}>
              <Row>
                <Col md={5}>
                  <Form.Control
                    // placeholder="Title"
                    // name={`topics[${nestIndex}].materials[${index}].title`}
                    // ref={register()}
                    {...register(
                      `topics.${nestIndex}.materials.${index}.title`
                    )}
                  />
                </Col>

                <Col md={5}>
                  <Form.Control
                    // placeholder="Link"
                    // name={`topics[${nestIndex}].materials[${index}].link`}
                    // ref={register()}
                    {...register(`topics.${nestIndex}.materials.${index}.link`)}
                  />
                </Col>
                <Col md={1}>
                  <Button
                    variant="outline-danger"
                    onClick={() => remove(index)}
                  >
                    <RiDeleteBin2Line size={20} />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
      <Container className="text-center">
        <Button
          variant="outline-dark"
          onClick={() => {
            append({ title: "", link: "" });
          }}
        >
          <AiOutlinePlus size={20} /> Add material
        </Button>
      </Container>
    </div>
  );
};

export default ListInputTopicMaterial;

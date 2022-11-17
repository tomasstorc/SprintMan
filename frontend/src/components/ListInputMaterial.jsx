import React from "react";
import { useFieldArray, Controller } from "react-hook-form";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin2Line } from "react-icons/ri";
const ListInputMaterial = ({ register, control, name }) => {
  // const { register, control } = useForm({
  //   defaultValues: {
  //     materials: [{ title: "", link: "" }],
  //     topics: [{: "", title: "", link: "" }],
  //   },
  // });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "materials",
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
                  {" "}
                  <Form.Control
                    placeholder="Title"
                    {...register(`materials.${index}.title`, {
                      required: true,
                    })}
                  />
                </Col>

                <Col md={5}>
                  <Controller
                    render={({ field }) => (
                      <Form.Control placeholder="Link" {...field} />
                    )}
                    name={`materials.${index}.link`}
                    control={control}
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
          variant="dark"
          onClick={() => {
            append({ title: "", link: "" });
          }}
        >
          <AiOutlinePlus size={20} />
        </Button>
      </Container>
    </div>
  );
};

export default ListInputMaterial;

import React from "react";
import { useFieldArray } from "react-hook-form";
import { Form, Button, Row, Col, Container, ListGroup } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin2Line } from "react-icons/ri";

const ListInputSubject = ({ register, control, subjectType, name }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: subjectType,
  });

  return (
    <div>
      <ListGroup>
        <Form.Label>{name}</Form.Label>
        {fields.map((item, index) => {
          return (
            <ListGroup.Item key={item.id}>
              <Row>
                <Col md={9}>
                  <Form.Select
                    {...register(`${subjectType}.${index}`, {
                      required: false,
                    })}
                  >
                    <option value="test">Information </option>
                    <option value="tst">Business and economics</option>
                  </Form.Select>
                </Col>
                <Col md={2}>
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
            append({ subjectType: "" });
          }}
        >
          <AiOutlinePlus size={20} />
        </Button>
      </Container>
    </div>
  );
};

export default ListInputSubject;

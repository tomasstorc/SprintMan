import React from "react";
import { useFieldArray } from "react-hook-form";
import { Form, Button, Row, Col, Container, ListGroup } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useSelector } from "react-redux";

const ListInputSubject = ({ register, control, subjectType, name, data }) => {
  const { subjectNames } = useSelector((state) => state.subject);
  const { fields, append, remove } = useFieldArray({
    control,
    name,
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
                    {subjectNames?.map((subject) => {
                      return (
                        <option value={subject._id}>{subject.name}</option>
                      );
                    })}
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

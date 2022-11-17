import React from "react";
import { useFieldArray } from "react-hook-form";
import { Form, Button, Container } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { AiOutlinePlus } from "react-icons/ai";
import { HiXMark } from "react-icons/hi2";
import ListInputTopicMaterial from "./ListInputTopicMaterial";
const ListInputTopic = ({ register, control, reset }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "topics",
  });

  return (
    <div>
      {" "}
      <ListGroup>
        <Form.Label>Topics</Form.Label>
        {fields.map((item, index) => {
          return (
            <ListGroup.Item key={item.id}>
              <HiXMark onClick={() => remove(index)} size={20} />
              <Form.Control
                className="mt-2"
                placeholder="Topic"
                {...register(`topics.${index}.name`, {
                  required: true,
                })}
              />
              <ListInputTopicMaterial
                register={register}
                name="topics"
                control={control}
                reset={reset}
              />
            </ListGroup.Item>
          );
        })}
      </ListGroup>
      <Container className="text-center">
        <Button
          variant="dark"
          onClick={() => {
            append({ name: "" });
          }}
        >
          <AiOutlinePlus size={20} />
        </Button>
      </Container>
    </div>
  );
};

export default ListInputTopic;

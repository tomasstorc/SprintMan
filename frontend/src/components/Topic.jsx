import React from "react";
// import DataTable from "react-data-table-component";
import Material from "./Material";
import Accordion from "react-bootstrap/Accordion";
import { Row, Col } from "react-bootstrap";

const Topic = ({ name, topic }) => {
  return (
    <Accordion className="mt-1">
      <Accordion.Item eventKey="0">
        <Accordion.Header>{name}</Accordion.Header>
        <Accordion.Body>
          <Row>
            {topic?.materials?.map((material) => {
              return (
                <Col md={"auto"} key={material?.id}>
                  <Material name={material.title} />
                </Col>
              );
            })}
          </Row>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default Topic;

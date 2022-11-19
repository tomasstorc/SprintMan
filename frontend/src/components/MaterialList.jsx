import React from "react";
import { Row, Col } from "react-bootstrap";
import Material from "./Material";

const MaterialList = ({ materials }) => {
  console.log(materials);
  return (
    <Row>
      {materials?.map((material) => {
        console.log("haf");
        console.log(material.title);
        return (
          <Col md={"auto"}>
            <Material name={material?.title} link={material?.link} />
          </Col>
        );
      })}
    </Row>
  );
};

export default MaterialList;

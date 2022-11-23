import React from "react";
import { Row, Col } from "react-bootstrap";
import { GiBookCover } from "react-icons/gi";

const Material = ({ name, link }) => {
  console.log(name);
  return (
    <a href={link}>
      <div className="p-2 border border-dark my-1 text-dark">
        <Row>
          <Col md={"auto"}>
            <GiBookCover size={70} />
          </Col>
          <Col md={6}>
            <h5>{name}</h5>
          </Col>
        </Row>
      </div>
    </a>
  );
};

export default Material;

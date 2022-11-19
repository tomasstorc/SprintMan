import React from "react";
import { Row, Col } from "react-bootstrap";

const Material = ({ name, link }) => {
  console.log(name);
  return (
    <a href={link}>
      <div className="p-2 border border-dark my-1">
        <Row>
          <Col md={"auto"}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3771/3771417.png"
              alt="book"
              style={{ width: "5rem" }}
            />
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

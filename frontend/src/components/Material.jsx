import React from "react";
import { Row, Col } from "react-bootstrap";

const Material = ({ name, variant }) => {
  return (
    <div className={`${variant} p-3`} style={{ width: "25rem" }}>
      <Row>
        <Col md={3}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3771/3771417.png"
            alt="book"
            style={{ width: "5rem" }}
          />
        </Col>
        <Col md={2}>
          <h3>{name}</h3>
        </Col>
      </Row>
    </div>
  );
};

export default Material;

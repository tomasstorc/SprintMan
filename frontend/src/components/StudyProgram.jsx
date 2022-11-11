import React from "react";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const StudyProgram = ({ imgUrl, name, icon, id }) => {
  return (
    <Col>
      <Link to={`/program/${id}`}>
        <div
          style={{
            backgroundImage: `url(${imgUrl})`,
            backgroundPosition: "right center",
            backgroundSize: "cover",
          }}
          className="p-3 subject-container"
        >
          <h3 className="subject-text">{name}</h3>
          <img className="icon" src={icon} alt="" />
        </div>
      </Link>
    </Col>
  );
};

export default StudyProgram;

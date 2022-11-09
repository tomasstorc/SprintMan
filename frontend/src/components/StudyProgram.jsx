import React from "react";

const StudyProgram = ({ imgUrl, name, icon }) => {
  return (
    <div
      style={{
        height: "45vh",
        width: "40vw",
        backgroundImage: `url(${imgUrl})`,
        backgroundPosition: "right center",
        backgroundSize: "cover",
      }}
      className="p-3 subject-container"
    >
      <h3 className="subject-text">{name}</h3>
      <img className="icon" src={icon} alt="" />
    </div>
  );
};

export default StudyProgram;

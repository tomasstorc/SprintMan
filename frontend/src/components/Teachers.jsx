import React from "react";

const Teachers = ({ title, name }) => {
  return (
    <div>
      <h3>{title}</h3>
      <div className="bg-dark text-white p-4 mb-4">
        <h5>{name}</h5>
      </div>
    </div>
  );
};

export default Teachers;

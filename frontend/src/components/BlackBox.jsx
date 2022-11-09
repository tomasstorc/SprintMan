import React from "react";

const BlackBox = ({ title, info }) => {
  return (
    <div className="bg-dark text-white p-5">
      <h3>{title}</h3> <p>{info}</p>
    </div>
  );
};

export default BlackBox;

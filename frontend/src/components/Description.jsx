import React from "react";

const Description = ({ info }) => {
  return (
    <div className="bg-dark text-white p-5">
      <h4>Description</h4> <p>{info}</p>
    </div>
  );
};

export default Description;

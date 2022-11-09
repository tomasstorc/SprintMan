import React from "react";

const InfoBox = ({ name, iconName }) => {
  return (
    <div>
      {iconName} <strong className="align-text-bottom">{name}</strong>
    </div>
  );
};

export default InfoBox;

import React from "react";

const InfoBox = ({ name, iconName }) => {
  return (
    <div className="p-3 text-center text-XL">
      {iconName} <strong className="align-text-bottom">{name}</strong>
    </div>
  );
};

export default InfoBox;

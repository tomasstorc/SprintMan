import React from "react";

const Header = ({ name, imgUrl }) => {
  return (
    <div
      style={{
        height: "45vh",
        backgroundImage: `url(${imgUrl})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="p-5 d-flex align-items-end"
    >
      <h1 className="text-white">{name}</h1>
    </div>
  );
};

export default Header;

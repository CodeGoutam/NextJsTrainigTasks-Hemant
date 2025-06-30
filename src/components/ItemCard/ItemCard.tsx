import React from "react";

const ItemCard = ({ name }: { name: String }) => {
  return (
    <div
      style={{
        height: "100px",
        backgroundColor: "grey",
        width: "100%",
        padding: "10px",
        borderRadius: "20px",
      }}
    >
      <div
        style={{
          height: "100%",
          backgroundColor: "white",
          width: "100%",
          padding: "10px",
          borderRadius: "20px",
        }}
      >
        <p>name:{name}</p>
      </div>
    </div>
  );
};

export default ItemCard;

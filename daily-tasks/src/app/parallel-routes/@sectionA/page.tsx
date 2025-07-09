import React from "react";

const page = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "1px 2px 20px gray",
        borderRadius: "10px",
      }}
    >
      section A
    </div>
  );
};

export default page;

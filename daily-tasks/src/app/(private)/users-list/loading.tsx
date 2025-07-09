import React from "react";

const loading = () => {
  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        width: "100%",
        flexWrap: "wrap",
        gap: "10px",
        justifyContent: "center",
      }}
    >
      {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((data: any) => {
        return (
          <div
            style={{
              backgroundColor: "#D3D3D3",
              padding: "10px",
              borderRadius: "10px",
              width: "250px",
              cursor: "pointer",
              height: "200px",
            }}
          >
            <p></p>
          </div>
        );
      })}
    </div>
  );
};

export default loading;

import React from "react";

const layout = ({
  children,
  sectionA,
  sectionB,
  sectionC,
  login,
}: {
  children: React.ReactNode;
  sectionA: React.ReactNode;
  sectionB: React.ReactNode;
  sectionC: React.ReactNode;
  login: React.ReactNode;
}) => {
  const isLogin = Math.floor(Math.random() * 10);
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div>{children}</div>
        <div
          style={{
            height: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "1px 2px 20px gray",
            borderRadius: "10px",
            width: "50%",
            padding: "10px",
            gap: "10px",
          }}
        >
          <div style={{ height: "100%", width: "100%" }}>{sectionA}</div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              width: "100%",
              gap: "10px",
            }}
          >
            <div style={{ height: "100%", width: "100%" }}>{sectionB}</div>
            <div style={{ height: "100%", width: "100%" }}>{sectionC}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default layout;

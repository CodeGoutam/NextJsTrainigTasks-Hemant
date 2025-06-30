import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "1px 2px 20px gray",
        borderRadius: "10px",
        height: "100%",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <p>section B</p>

      <Link
        href={"/parallel-routes/section-b"}
        style={{
          backgroundColor: "gray",
          padding: "4px",
          color: "white",
          borderRadius: "4px",
        }}
      >
        Go to sub section
      </Link>
    </div>
  );
};

export default page;

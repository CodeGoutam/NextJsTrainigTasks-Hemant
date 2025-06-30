import Link from "next/link";
import React from "react";

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
      <p>section b page route</p>
      <Link
        href={"/parallel-routes"}
        style={{
          backgroundColor: "gray",
          padding: "4px",
          color: "white",
          borderRadius: "4px",
        }}
      >
        Go to Default.
      </Link>
    </div>
  );
};

export default page;

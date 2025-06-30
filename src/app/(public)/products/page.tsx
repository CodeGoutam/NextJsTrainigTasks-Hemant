import Link from "next/link";
import React from "react";

const page = async () => {
  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        width: "100%",
        flexWrap: "wrap",
        gap: "10px",
        // justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Link href={"/products/1"}>Product 1</Link>
      <br />
      <Link href={"/products/2"}>Product 2</Link>
      <br />
      <Link href={"/products/3"}>Product 3</Link>
      <br />
    </div>
  );
};

export default page;

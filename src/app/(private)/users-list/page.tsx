// import Error from "next/error";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "List of Users",
};

const page = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const res = await response.json();

  // throw new Error("Custom Error on user");
  setTimeout(() => {}, 3000);
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
      {res.map((data: any) => {
        return (
          <Link
            href={`users-list/${data?.id}`}
            style={{
              backgroundColor: "#D3D3D3",
              padding: "10px",
              borderRadius: "10px",
              width: "250px",
              cursor: "pointer",
            }}
          >
            <p>UserName : {data?.username}</p>
            <p> Name: {data?.name}</p>
            <p> Email: {data?.email}</p>
            <p> Website: {data?.website}</p>
            <p>Phone: {data?.phone}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default page;

import React from "react";

const page = async () => {
  const response = await fetch("http://localhost:3000/api/hello");

  const res = await response.text();
  console.log(res);

  return <div>page</div>;
};

export default page;

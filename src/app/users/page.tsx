import UsersPage from "@/ui/Users/UsersPage";
import React from "react";

const page = async () => {
  const usersResponse = await fetch("http://localhost:3001/api/users", {
    method: "GET",
  });
  const res = await usersResponse.json();

  return <UsersPage usersList={res} />;
};

export default page;

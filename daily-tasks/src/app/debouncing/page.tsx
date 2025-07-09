"use client";
import React from "react";

const page = () => {
  const debounce = (func: Function, delay: number) => {
    let timer;
    return (...args: string[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const getQuery = (searchInput: string) => {
    console.log("query=", searchInput);
  };

  const searchDebounce = debounce(getQuery, 300);
  return (
    <div style={{ padding: "100px" }}>
      <input
        style={{ border: "1px solid black" }}
        type="text"
        onChange={(e) => searchDebounce(e.target.value)}
      />
    </div>
  );
};

export default page;

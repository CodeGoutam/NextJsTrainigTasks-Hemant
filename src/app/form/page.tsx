"use client";

import { submitForm } from "@/action/formServerAction";
import React from "react";

const form = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // ✅ Prevent page refresh

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      location: formData.get("location"),
    };

    console.log("Submitting:", data);
    await submitForm({ formData: JSON.stringify(data) });
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "gray",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "4px",
          }}
        >
          <label>Name:</label>
          <input
            type="text"
            name="name"
            style={{ border: "1px solid gray", borderRadius: "4px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "4px",
          }}
        >
          <label>Email:</label>
          <input
            type="text"
            name="email"
            style={{ border: "1px solid gray", borderRadius: "4px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "4px",
          }}
        >
          <label>Location:</label>
          <input
            type="text"
            name="location"
            style={{ border: "1px solid gray", borderRadius: "4px" }}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default form;

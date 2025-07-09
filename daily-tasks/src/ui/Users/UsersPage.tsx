"use client";

import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";

interface User {
  _id: string;
  name: string;
  email: string;
  phone_no: number;
  address: string;

  __v: number;
}

const UsersPage = ({ usersList }: { usersList: User[] }) => {
  const [form, setform] = useState({ state: false, data: [...usersList] });

  return (
    <div
      style={{
        padding: "24px",
        fontFamily: "Inter, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <h2 style={{ fontWeight: "bold", fontSize: "24px" }}>Users List</h2>

        <button
          onClick={() => setform((prev) => ({ ...prev, state: true }))}
          style={{
            padding: "10px",
            background: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add new{" "}
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          // alignItems: "center",
          justifyContent: "start",
          width: "100%",
        }}
      >
        {form.data.map((data, index) => (
          <div
            key={data._id}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
              maxWidth: "400px",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", gap: "8px" }}>
              <strong>Name:</strong>
              <span>{data?.name}</span>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <strong>Email:</strong>
              <span>{data?.email}</span>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <strong>Phone no.:</strong>
              <span>{data?.phone_no}</span>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <strong>Address:</strong>
              <span>{data?.address}</span>
            </div>
          </div>
        ))}
      </div>
      <UserForm state={form.state} setState={setform} />
    </div>
  );
};

export default UsersPage;

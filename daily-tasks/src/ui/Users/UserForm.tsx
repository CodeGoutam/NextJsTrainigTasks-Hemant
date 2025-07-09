import { userFormServerAction } from "@/action/userFormServerAction";
import React, { useState } from "react";

const UserForm = ({ state, setState }) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const formData = {
      name: data.get("name"),
      email: data.get("email"),
      address: data.get("address"),
      phone_no: data.get("phone"),
    };
    const res = await userFormServerAction({
      formData: JSON.stringify(formData),
    });

    if (res) {
      setState((prev: any) => ({
        ...prev,
        state: false,
        data: [...prev.data, res],
      }));
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === "modal-backdrop") {
      setState(false);
    }
  };

  return state ? (
    <div
      id="modal-backdrop"
      onClick={handleBackdropClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          width: "300px",
          position: "relative",
        }}
      >
        <button
          type="button"
          onClick={() => setState(false)}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            border: "none",
            background: "transparent",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        <h2>User Form</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          //   value={formData.name}
          //   onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          //   value={formData.email}
          //   onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          //   value={formData.phone}
          //   onChange={handleChange}
          required
        />

        <textarea
          name="address"
          placeholder="Address"
          //   value={formData.address}
          //   onChange={handleChange}
          rows={3}
          required
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            background: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  ) : null;
};

export default UserForm;

"use client";
import Image from "next/image";
import React from "react";

const ImageModal = ({
  modalState,
  setModalState,
  link,
}: {
  modalState: boolean;
  setModalState: React.Dispatch<
    React.SetStateAction<{ open: boolean; link: string }>
  >;
}) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.6)", // optional overlay
        display: modalState ? "flex" : "none",
        position: "fixed",
        zIndex: 1000,
        top: "50%",
        left: "50%",
        transform: `translate(-50%,-50%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        style={{
          color: "black",
          position: "absolute",
          top: 50,
          right: 50,
          padding: "10px",
          background: "white",
          borderRadius: "50px",
          height: "24px",
          width: "24px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={() => setModalState((prev) => ({ ...prev, open: false }))}
      >
        x
      </button>
      <div
        style={{
          width: "80%",
          height: "80%",
          position: "relative",
          zIndex: 100,
        }}
      >
        <Image src={link} alt="" fill />
      </div>
    </div>
  );
};

export default ImageModal;

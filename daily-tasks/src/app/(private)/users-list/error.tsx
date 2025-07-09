"use client";
export default function error() {
  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        width: "100%",
        flexWrap: "wrap",
        gap: "10px",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <p>Could not load users.</p>
    </div>
  );
}

import Link from "next/link";
import React from "react";

const Header = ({ isDefault }: { isDefault: boolean }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "64px",
        backgroundColor: isDefault ? "#6495ED" : "#dadada",
        padding: "10px 20px 10px 20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontSize: "20px",
            fontWeight: 700,
            color: isDefault ? "white" : "black",
          }}
        >
          Logo
        </p>
        <ul style={{ display: "flex", gap: "20px" }}>
          {[
            { label: "Home", url: "/" },
            { label: "Users", url: "/users-list" },
            { label: "Products", url: "/products" },
          ].map((data) => {
            return (
              <Link
                href={data?.url}
                style={{
                  cursor: "pointer",
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "8px",
                  color: isDefault ? "#6495ED" : "black",
                }}
              >
                {data?.label}
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Header;

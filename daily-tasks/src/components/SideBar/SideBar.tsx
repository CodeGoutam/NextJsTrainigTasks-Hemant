import Link from "next/link";
import React from "react";

const SideBar = ({ isDefault }: { isDefault: boolean }) => {
  return (
    <div
      style={{
        width: "200px",
        backgroundColor: isDefault ? "#6495ED" : "#dadada",
        height: "100vh",
        padding: "20px",
      }}
    >
      <div style={{ display: "flex", gap: "12px", flexDirection: "column" }}>
        {[
          { label: "Home", url: "/" },
          { label: "Users", url: "/users-list" },
          { label: "Products", url: "/products" },
        ].map((data, index) => {
          return (
            <Link
              key={data + "" + index}
              href={data?.url}
              style={{
                cursor: "pointer",
                borderBottom: "2px solid white",
                textAlign: "center",
                color: !isDefault ? "black" : "white",
              }}
            >
              {data?.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;

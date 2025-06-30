// src/app/(grouping)/product/layout.tsx

import Header from "@/components/Header/Header";
import SideBar from "@/components/SideBar/SideBar";
import React from "react";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header isDefault={false} />
        <div style={{ display: "flex", marginTop: "60px" }}>
          <SideBar isDefault={false} />
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}

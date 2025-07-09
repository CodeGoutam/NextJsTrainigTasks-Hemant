import Header from "@/components/Header/Header";
import SideBar from "@/components/SideBar/SideBar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header isDefault={true} />

      <div style={{ display: "flex", marginTop: "60px" }}>
        <SideBar isDefault={true} />
        {children}
      </div>
    </div>
  );
};

export default layout;

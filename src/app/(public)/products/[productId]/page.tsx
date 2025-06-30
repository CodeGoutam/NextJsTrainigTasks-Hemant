import React from "react";

const page = async ({ params }: { params: Promise<{ productId: string }> }) => {
  const productId = (await params).productId;
  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        width: "100%",
        flexWrap: "wrap",
        gap: "10px",
        justifyContent: "center",
      }}
    >
      Product {productId}
    </div>
  );
};

export default page;

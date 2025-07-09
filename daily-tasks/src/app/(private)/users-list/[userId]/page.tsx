const functionCalling = async ({ id }: { id: string }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await response.json();
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const id = (await params).userId;

  const res = await functionCalling({ id });

  return {
    title: res.name,
  };
}

const page = async ({ params }: { params: Promise<{ userId: string }> }) => {
  const id = (await params).userId;

  const userDetails = await functionCalling({ id });

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
      <div
        style={{
          backgroundColor: "#D3D3D3",
          padding: "10px",
          borderRadius: "10px",
          width: "300px",
          cursor: "pointer",
        }}
      >
        <p>UserName : {userDetails?.username}</p>
        <p> Name: {userDetails?.name}</p>
        <p> Email: {userDetails?.email}</p>
        <p> Website: {userDetails?.website}</p>
        <p>Phone: {userDetails?.phone}</p>
      </div>
    </div>
  );
};

export default page;

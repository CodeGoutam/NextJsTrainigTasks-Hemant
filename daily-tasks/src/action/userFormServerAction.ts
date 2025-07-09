"use server";

export const userFormServerAction = async ({ formData }: { formData: any }) => {
  const formResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formData,
    }
  );

  const res = await formResponse.json();
  console.log("reso", res);

  return res;
};

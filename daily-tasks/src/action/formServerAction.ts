"use server";

export const submitForm = async ({ formData }: { formData: any }) => {
  console.log("server action called ");

  const response = await fetch("/user-data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: formData,
  });
  const res = response.json();
  console.log("form data:-", res);

  return response;
};

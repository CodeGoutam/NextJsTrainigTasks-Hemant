"use client";

import { signupAction } from "@/action/signUpServerAction";
import React, { useState, useTransition } from "react";
import { styles } from "./Signup.style";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAction = async (formData: FormData) => {
    startTransition(async () => {
      try {
        const result = await signupAction(formData);
        setMessage("Signup successful!");
        console.log("result", result);

        if (result?.status === 200) {
          router.push("/");
        }
      } catch (err: any) {
        setMessage(err.message || "Signup failed");
      }
    });
  };

  return (
    <div style={styles.container}>
      <form action={handleAction} style={styles.form}>
        <h2 style={styles.title}>Signup</h2>

        <input
          name="name"
          placeholder="Full Name"
          required
          style={styles.input}
        />
        <input
          name="username"
          placeholder="Username"
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          style={styles.input}
        />
        <input
          name="mobileNumber"
          placeholder="Mobile (+91...)"
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          style={styles.input}
        />

        <button type="submit" disabled={isPending} style={styles.button}>
          {isPending ? "Signing up..." : "Sign Up"}
        </button>

        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

export default SignupPage;

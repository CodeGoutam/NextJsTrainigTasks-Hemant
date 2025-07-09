"use client";

import { loginAction } from "@/action/loginServerAction";
import React, { useState, useTransition } from "react";
import { styles } from "./LoginPage.styles";
import { useRouter } from "next/navigation";
import Link from "next/link"; // ✅ Import Link

const LoginPage = () => {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAction = async (formData: FormData) => {
    startTransition(async () => {
      try {
        const result = await loginAction(formData);
        setMessage("Login successful!");
        if (result?.status == 200) {
          router.push("/");
        }
      } catch (err: any) {
        setMessage(err.message || "Login failed");
      }
    });
  };

  return (
    <div style={styles.container}>
      <form action={handleAction} style={styles.form}>
        <h2 style={styles.title}>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
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
          {isPending ? "Logging in..." : "Login"}
        </button>

        {message && <p style={styles.message}>{message}</p>}

        <p style={{ marginTop: "16px", textAlign: "center" }}>
          Don't have an account?{" "}
          <Link
            href="/signup"
            style={{ color: "#0070f3", textDecoration: "underline" }}
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

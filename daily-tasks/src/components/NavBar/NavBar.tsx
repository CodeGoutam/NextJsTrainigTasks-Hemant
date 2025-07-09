"use client";

import Link from "next/link";
import { useTransition, useState, useEffect } from "react";

export default function NavBar() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logoutAction = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`, {
      method: "POST",
      credentials: "include",
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/session`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      setIsLoggedIn(!!data.user);
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    console.log("handleLogout");

    setMessage("");
    startTransition(async () => {
      await logoutAction();

      setMessage("Logged out successfully");
      setIsLoggedIn(false);
      window.location.reload();
    });
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.left}>
        <Link href="/" style={styles.logo}>
          🏠 Home
        </Link>
      </div>

      <div style={styles.right}>
        <Link href="/image-gallery" style={styles.link}>
          Image Gallery
        </Link>

        <Link href="/users" style={styles.link}>
          Users
        </Link>
        <Link href="/parallel-routes" style={styles.link}>
          Parallel routes
        </Link>
        <Link href="/form" style={styles.link}>
          Form Task
        </Link>

        <Link href="/diary" style={styles.link}>
          Diary
        </Link>

        {!isLoggedIn ? (
          <>
            <Link href="/login" style={styles.link}>
              Login
            </Link>
            <Link href="/signup" style={styles.link}>
              Signup
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            disabled={isPending}
            style={styles.logoutBtn}
          >
            {isPending ? "Logging out..." : "Logout"}
          </button>
        )}
      </div>

      {message && <p style={styles.message}>{message}</p>}
    </nav>
  );
}

const styles: Record<string, React.CSSProperties> = {
  navbar: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: "12px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  left: {
    fontSize: "20px",
    fontWeight: 600,
  },
  logo: {
    textDecoration: "none",
    color: "#1a1a1a",
  },
  right: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },
  link: {
    fontSize: "16px",
    color: "#0070f3",
    textDecoration: "none",
    fontWeight: 500,
    border: "1px solid #0070f3",
    padding: "8px 12px",
    borderRadius: "6px",
    transition: "all 0.2s",
  },
  logoutBtn: {
    fontSize: "16px",
    backgroundColor: "#e00",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  message: {
    position: "absolute",
    top: "60px",
    right: "24px",
    color: "#0070f3",
    fontSize: "14px",
  },
};

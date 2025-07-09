import { getCurrentUser } from "@/lib/getCurrentUser";

export default async function HomePage() {
  const user = await getCurrentUser();
  console.log("user", user);

  return (
    <main style={styles.container}>
      <section style={styles.hero}>
        {!user ? (
          <>
            <div>Unauthorized. Please login.</div>
          </>
        ) : (
          <>
            <h1 style={styles.heading}>
              Welcome{" "}
              <span style={{ fontSize: "36px", color: "blue" }}>
                {user?.name}{" "}
              </span>{" "}
              to Our App 🚀
            </h1>
            <p style={styles.subheading}>
              Explore our features like image gallery , form , users list ,
              parallel routes , debouncing.
            </p>
          </>
        )}
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: "40px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(100vh - 80px)", // leaves space for navbar
    backgroundColor: "#f9fafb",
  },
  hero: {
    textAlign: "center",
    maxWidth: "700px",
    padding: "24px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
  },
  heading: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "16px",
    color: "#1a1a1a",
  },
  subheading: {
    fontSize: "18px",
    color: "#555",
    lineHeight: 1.6,
  },
};

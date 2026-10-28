import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Events from "./pages/Events";
import MyRegistrations from "./pages/MyRegistrations";

function App() {
  const [currentPage, setCurrentPage] = useState("login");

  const isLoggedIn = !!localStorage.getItem("token");

  const logout = () => {
    localStorage.clear();
    setCurrentPage("login");
  };

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <h3 style={styles.brandTitle}>TechFest Portal 2026</h3>
        <div style={styles.navGroup}>
          {isLoggedIn ? (
            <>
              <button
                onClick={() => setCurrentPage("events")}
                style={
                  currentPage === "events"
                    ? styles.activeNavBtn
                    : styles.navBtn
                }
              >
                Events
              </button>
              <button
                onClick={() => setCurrentPage("registrations")}
                style={
                  currentPage === "registrations"
                    ? styles.activeNavBtn
                    : styles.navBtn
                }
              >
                My Registrations
              </button>
              <button onClick={logout} style={styles.logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setCurrentPage("login")}
                style={
                  currentPage === "login"
                    ? styles.activeNavBtn
                    : styles.navBtn
                }
              >
                Login
              </button>
              <button
                onClick={() => setCurrentPage("signup")}
                style={
                  currentPage === "signup"
                    ? styles.activeNavBtn
                    : styles.primaryNavBtn
                }
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>

      {currentPage === "login" && (
        <Login
          onSwitchToSignup={() => setCurrentPage("signup")}
          onLoginSuccess={() => setCurrentPage("events")}
        />
      )}
      {currentPage === "signup" && (
        <Signup onSwitchToLogin={() => setCurrentPage("login")} />
      )}
      {currentPage === "events" && (
        <Events
          onGoToRegistrations={() => setCurrentPage("registrations")}
        />
      )}
      {currentPage === "registrations" && (
        <MyRegistrations onBackToEvents={() => setCurrentPage("events")} />
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #311042 100%)",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 32px",
    backgroundColor: "rgba(15, 23, 42, 0.8)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  brandTitle: {
    margin: 0,
    color: "#ffffff",
    fontSize: "20px",
    fontWeight: "700",
    letterSpacing: "-0.3px",
  },
  navGroup: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  navBtn: {
    padding: "8px 16px",
    backgroundColor: "transparent",
    color: "#cbd5e1",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
  },
  activeNavBtn: {
    padding: "8px 16px",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    color: "#ffffff",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
  primaryNavBtn: {
    padding: "8px 16px",
    backgroundColor: "#4f46e5",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
  logoutBtn: {
    padding: "8px 16px",
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    color: "#fca5a5",
    border: "1px solid rgba(239, 68, 68, 0.3)",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default App;
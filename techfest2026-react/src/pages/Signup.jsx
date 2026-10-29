import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function Signup({ onSwitchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(API + "/auth/register", {
        name,
        email,
        password,
      });

      setIsError(false);
      setMessage(res.data.message + "! Redirecting to login...");

      setTimeout(() => {
        onSwitchToLogin();
      }, 1200);
    } catch (err) {
      setIsError(true);
      if (err.response) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Server unreachable. Please check backend connection.");
      }
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>Join TechFest 2026 to register for events</p>
        </div>

        {message && (
          <div style={isError ? styles.alertError : styles.alertSuccess}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              placeholder="e.g. Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="e.g. jane@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Choose a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.buttonSuccess}>
            Register Account
          </button>
        </form>

        <div style={styles.footer}>
          <span>Already have an account? </span>
          <button onClick={onSwitchToLogin} style={styles.linkButton}>
            Log in here
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #311042 100%)",
    padding: "24px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    boxSizing: "border-box",
  },
  card: {
    width: "100%",
    maxWidth: "440px",
    backgroundColor: "rgba(255, 255, 255, 0.96)",
    backdropFilter: "blur(16px)",
    borderRadius: "20px",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.2) inset",
    padding: "44px 36px",
    boxSizing: "border-box",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  header: {
    textAlign: "center",
    marginBottom: "32px",
  },
  title: {
    margin: "0 0 8px 0",
    color: "#0f172a",
    fontSize: "28px",
    fontWeight: "800",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    margin: 0,
    color: "#64748b",
    fontSize: "14px",
    fontWeight: "500",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#334155",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
  },
  input: {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    backgroundColor: "#f8fafc",
    fontSize: "15px",
    color: "#0f172a",
    outline: "none",
    transition: "all 0.2s ease-in-out",
    boxSizing: "border-box",
    width: "100%",
  },
  buttonPrimary: {
    marginTop: "10px",
    padding: "14px",
    background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "700",
    letterSpacing: "0.3px",
    cursor: "pointer",
    boxShadow: "0 10px 20px -5px rgba(79, 70, 229, 0.4)",
    transition: "all 0.2s ease-in-out",
  },
  buttonSuccess: {
    marginTop: "10px",
    padding: "14px",
    background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "700",
    letterSpacing: "0.3px",
    cursor: "pointer",
    boxShadow: "0 10px 20px -5px rgba(16, 185, 129, 0.4)",
    transition: "all 0.2s ease-in-out",
  },
  footer: {
    marginTop: "28px",
    textAlign: "center",
    fontSize: "14px",
    color: "#64748b",
    fontWeight: "500",
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "#6366f1",
    fontWeight: "700",
    cursor: "pointer",
    textDecoration: "none",
    padding: 0,
    fontSize: "14px",
    marginLeft: "4px",
  },
  alertError: {
    backgroundColor: "#fef2f2",
    color: "#991b1b",
    border: "1px solid #fecaca",
    borderRadius: "12px",
    padding: "12px 16px",
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "20px",
    textAlign: "center",
  },
  alertSuccess: {
    backgroundColor: "#ecfdf5",
    color: "#065f46",
    border: "1px solid #a7f3d0",
    borderRadius: "12px",
    padding: "12px 16px",
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "20px",
    textAlign: "center",
  },
};
export default Signup;
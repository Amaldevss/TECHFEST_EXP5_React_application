import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function MyRegistrations({ onBackToEvents }) {
  const [list, setList] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login first to view your registrations.");
      return;
    }

    const config = {
      headers: { Authorization: "Bearer " + token },
    };

    axios
      .get(API + "/registrations/my", config)
      .then((res) => setList(res.data))
      .catch(() =>
        setMessage("Failed to fetch registrations. Please check your login status.")
      );
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.topRow}>
          <button onClick={onBackToEvents} style={styles.backBtn}>
            &larr; Back to Events
          </button>
        </div>

        <div style={styles.header}>
          <h2 style={styles.title}>My Registrations</h2>
          <p style={styles.subtitle}>Events you have registered for</p>
        </div>

        {message && <div style={styles.alertError}>{message}</div>}

        {list.length === 0 && !message ? (
          <div style={styles.emptyBox}>
            <p style={{ margin: 0 }}>No event registrations yet.</p>
          </div>
        ) : (
          <div style={styles.list}>
            {list.map((r) => (
              <div key={r._id} style={styles.listItem}>
                <div style={styles.itemContent}>
                  <div style={styles.badgeRow}>
                    <span style={styles.categoryTag}>
                      {r.event ? r.event.category : "Event"}
                    </span>
                  </div>
                  <h3 style={styles.eventName}>
                    {r.event ? r.event.name : "Event Details Unavailable"}
                  </h3>
                  <p style={styles.dateText}>
                    Registered on:{" "}
                    {new Date(r.registeredAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div style={styles.priceBadge}>
                  {r.event && r.event.fee === 0 ? "Free" : `₹${r.event?.fee}`}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #311042 100%)",
    padding: "32px 16px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    boxSizing: "border-box",
  },
  card: {
    width: "100%",
    maxWidth: "540px",
    backgroundColor: "rgba(255, 255, 255, 0.96)",
    borderRadius: "16px",
    boxShadow: "0 12px 32px rgba(0, 0, 0, 0.25)",
    padding: "32px 28px",
    boxSizing: "border-box",
  },
  topRow: {
    marginBottom: "20px",
  },
  backBtn: {
    padding: "8px 14px",
    backgroundColor: "#ffffff",
    color: "#334155",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
  },
  header: {
    marginBottom: "24px",
  },
  title: {
    margin: "0 0 4px 0",
    fontSize: "24px",
    fontWeight: "700",
    color: "#0f172a",
  },
  subtitle: {
    margin: 0,
    fontSize: "14px",
    color: "#64748b",
  },
  alertError: {
    backgroundColor: "#fef2f2",
    color: "#991b1b",
    border: "1px solid #fecaca",
    borderRadius: "8px",
    padding: "12px 16px",
    fontSize: "14px",
    marginBottom: "20px",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    padding: "16px 18px",
  },
  itemContent: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  badgeRow: {
    display: "flex",
  },
  categoryTag: {
    fontSize: "11px",
    fontWeight: "600",
    color: "#4338ca",
    backgroundColor: "#e0e7ff",
    padding: "2px 8px",
    borderRadius: "4px",
    textTransform: "uppercase",
  },
  eventName: {
    margin: "2px 0 0 0",
    fontSize: "16px",
    fontWeight: "600",
    color: "#0f172a",
  },
  dateText: {
    margin: 0,
    fontSize: "13px",
    color: "#64748b",
  },
  priceBadge: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#4f46e5",
    backgroundColor: "#e0e7ff",
    padding: "6px 12px",
    borderRadius: "6px",
  },
  emptyBox: {
    padding: "28px",
    textAlign: "center",
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    color: "#64748b",
    fontSize: "14px",
  },
};

export default MyRegistrations;
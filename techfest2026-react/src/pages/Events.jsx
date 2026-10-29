import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function Events({ onGoToRegistrations }) {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");

  function loadEvents() {
    axios
      .get(API + "/events")
      .then((res) => setEvents(res.data))
      .catch(() => setMessage("Could not load events from server"));
  }

  useEffect(() => {
    loadEvents();
  }, []);

  async function registerForEvent(eventId) {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login first to register for an event.");
      return;
    }

    const config = {
      headers: { Authorization: "Bearer " + token },
    };

    try {
      const res = await axios.post(
        API + "/registrations",
        { eventId: eventId },
        config
      );
      setMessage(res.data.message);
      loadEvents();
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Server not reachable");
      }
    }
  }

  return (
    <div style={styles.page}>
      <header style={styles.headerBar}>
        <div>
          <h1 style={styles.title}>TechFest 2026</h1>
          <p style={styles.subtitle}>Explore available events and reserve your spot</p>
        </div>
        <button onClick={onGoToRegistrations} style={styles.secondaryBtn}>
          My Registrations &rarr;
        </button>
      </header>

      {message && <div style={styles.alertBanner}>{message}</div>}

      <main style={styles.grid}>
        {events.map((ev) => (
          <div key={ev._id} style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.categoryTag}>{ev.category}</span>
              <span style={styles.priceTag}>
                {ev.fee === 0 ? "Free" : `₹${ev.fee}`}
              </span>
            </div>

            <h3 style={styles.eventTitle}>{ev.name}</h3>

            <div style={styles.detailsList}>
              <p style={styles.detailItem}>
                <span style={styles.detailLabel}>Date:</span>{" "}
                {new Date(ev.date).toLocaleDateString()}
              </p>
              <p style={styles.detailItem}>
                <span style={styles.detailLabel}>Seats:</span>{" "}
                {ev.seats > 0 ? `${ev.seats} remaining` : "Filled"}
              </p>
            </div>

            <button
              onClick={() => registerForEvent(ev._id)}
              disabled={ev.seats < 1}
              style={ev.seats < 1 ? styles.disabledBtn : styles.primaryBtn}
            >
              {ev.seats < 1 ? "Sold Out" : "Register"}
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #311042 100%)",
    padding: "40px 24px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    boxSizing: "border-box",
  },
  headerBar: {
    maxWidth: "1000px",
    margin: "0 auto 32px auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "16px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
  },
  title: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    margin: "4px 0 0 0",
    fontSize: "14px",
    color: "#94a3b8",
    fontWeight: "500",
  },
  secondaryBtn: {
    padding: "10px 18px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "#ffffff",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    backdropFilter: "blur(12px)",
  },
  alertBanner: {
    maxWidth: "1000px",
    margin: "0 auto 24px auto",
    padding: "12px 16px",
    backgroundColor: "#ecfdf5",
    color: "#065f46",
    border: "1px solid #a7f3d0",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "500",
    textAlign: "center",
  },
  grid: {
    maxWidth: "1000px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
    gap: "24px",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.96)",
    backdropFilter: "blur(16px)",
    borderRadius: "20px",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.2) inset",
    padding: "28px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "14px",
  },
  categoryTag: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#4338ca",
    backgroundColor: "#e0e7ff",
    padding: "4px 10px",
    borderRadius: "20px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  priceTag: {
    fontSize: "16px",
    fontWeight: "800",
    color: "#4f46e5",
  },
  eventTitle: {
    margin: "0 0 16px 0",
    fontSize: "20px",
    fontWeight: "700",
    color: "#0f172a",
    lineHeight: "1.3",
  },
  detailsList: {
    marginBottom: "20px",
  },
  detailItem: {
    margin: "6px 0",
    fontSize: "14px",
    color: "#334155",
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #f1f5f9",
    paddingBottom: "6px",
  },
  detailLabel: {
    color: "#64748b",
    fontWeight: "500",
  },
  primaryBtn: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 10px 20px -5px rgba(79, 70, 229, 0.4)",
    letterSpacing: "0.3px",
  },
  disabledBtn: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#cbd5e1",
    color: "#64748b",
    border: "none",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "not-allowed",
  },
};

export default Events;
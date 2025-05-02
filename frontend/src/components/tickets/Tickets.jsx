import React, { useEffect, useState } from "react";
import styles from "./Tickets.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import avatar from "../../assets/icons/avatar.png";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [, setTick] = useState(0);
  const [ticketMessages, setTicketMessages] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = `${
          import.meta.env.VITE_API_URL
        }api/tickets/assignedTickets`;
        const response = await axios.get(url, {
          headers: {
            Authorization: token,
          },
        });
        const data = response.data;
        console.log(data);
        setTickets(data);
        setFilteredTickets(data);
        setLoading(false);

        // Fetch conversations for each ticket
        const messages = {};
        for (const ticket of data) {
          try {
            const convResponse = await axios.get(
              `${import.meta.env.VITE_API_URL}api/conversations/${ticket._id}`,
              {
                headers: {
                  Authorization: token,
                },
              }
            );
            const conversation = convResponse.data;
            if (conversation.messages && conversation.messages.length > 0) {
              messages[ticket._id] = conversation.messages[0].content;
            }
          } catch (error) {
            console.error(
              `Error fetching conversation for ticket ${ticket._id}:`,
              error
            );
          }
        }
        setTicketMessages(messages);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };
    fetchTickets();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Search functionality
  useEffect(() => {
    setFilteredTickets(
      tickets.filter(
        (ticket) =>
          ticket.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.phone?.includes(searchTerm)
      )
    );
  }, [searchTerm, tickets]);

  // Tab functionality
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "all") {
      setFilteredTickets(tickets);
    } else if (tab === "resolved") {
      setFilteredTickets(
        tickets.filter((ticket) => ticket.status === "resolved")
      );
    } else if (tab === "unresolved") {
      setFilteredTickets(
        tickets.filter((ticket) => ticket.status !== "resolved")
      );
    }
  };

  const formatElapsedTime = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now - created;

    const diffMinutes = Math.floor(diffMs / 1000 / 60);
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className={styles.ticketsContainer}>
      <div className={styles.mainContent}>
        <div className={styles.searchBar}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.50442 15.75C12.424 15.75 15.6014 12.56 15.6014 8.625C15.6014 4.68997 12.424 1.5 8.50442 1.5C4.58488 1.5 1.40747 4.68997 1.40747 8.625C1.40747 12.56 4.58488 15.75 8.50442 15.75Z"
              stroke="#B6B6B6"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.3483 16.5L14.8542 15"
              stroke="#B6B6B6"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <input
            type="text"
            placeholder="Search for ticket"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.tabs}>
          <span
            className={`${styles.tab} ${
              activeTab === "all" ? styles.active : ""
            }`}
            onClick={() => handleTabChange("all")}
          >
            <svg
              width="20"
              height="16"
              viewBox="0 0 20 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.1947 15.0833H5.84713C3.34286 15.0833 1.67334 13.8333 1.67334 10.9167V5.08334C1.67334 2.16667 3.34286 0.916672 5.84713 0.916672H14.1947C16.699 0.916672 18.3685 2.16667 18.3685 5.08334V10.9167C18.3685 13.8333 16.699 15.0833 14.1947 15.0833Z"
                stroke="#184E7F"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.1947 5.5L11.582 7.58333C10.7222 8.26667 9.31141 8.26667 8.45161 7.58333L5.84717 5.5"
                stroke="#184E7F"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            All Tickets
          </span>
          <span
            className={`${styles.tab} ${
              activeTab === "resolved" ? styles.active : ""
            }`}
            onClick={() => handleTabChange("resolved")}
          >
            Resolved
          </span>
          <span
            className={`${styles.tab} ${
              activeTab === "unresolved" ? styles.active : ""
            }`}
            onClick={() => handleTabChange("unresolved")}
          >
            Unresolved
          </span>
        </div>
        {filteredTickets.length === 0 ? (
          <p>No tickets found.</p>
        ) : (
          filteredTickets.map((ticket) => (
            <div key={ticket._id} className={styles.ticketItem}>
              <div className={styles.ticketHeader}>
                <span className={styles.ticketNumber}>
                  Ticket# {ticket._id}
                </span>
                <span className={styles.ticketTime}>
                  Posted at{" "}
                  {ticket.createdAt
                    ? new Date(ticket.createdAt).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })
                    : "Unknown"}
                </span>
              </div>
              <div className={styles.ticketBody}>
                <p>{ticketMessages[ticket._id] || "No messages yet"}</p>
                <span className={styles.ticketDuration}>
                  {ticket.createdAt
                    ? formatElapsedTime(ticket.createdAt)
                    : "Unknown"}
                </span>
              </div>
              <hr
                style={{
                  border: "none",
                  backgroundColor: "#E7E7E7",
                  height: "1px",
                }}
              />
              <div className={styles.ticketFooter}>
                <div className={styles.ticketInfo}>
                  <img src={avatar} alt="User" className={styles.userImg} />
                  <div>
                    <div className={styles.userDetails}>
                      <div>{ticket.name || "Unknown"}</div>
                      <div>{ticket.phone || "N/A"}</div>
                      <div>{ticket.email || "N/A"}</div>
                    </div>
                  </div>
                </div>
                <button
                  className={styles.openButton}
                  onClick={() =>
                    navigate(`/dashboard/contact-center?ticketId=${ticket._id}`)
                  }
                >
                  Open Ticket
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Tickets;

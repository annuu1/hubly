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

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = `${import.meta.env.VITE_API_URL}api/tickets/assignedTickets`;
        const response = await axios.get(url, {
          headers:{
            Authorization:token
          }
        });
        const data = response.data; 
        console.log(data);
        setTickets(data);
        setFilteredTickets(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        if(error.response && error.response.status === 401) {
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
      setFilteredTickets(tickets.filter((ticket) => ticket.status === "resolved"));
    } else if (tab === "unresolved") {
      setFilteredTickets(tickets.filter((ticket) => ticket.status !== "resolved"));
    }
  };

  const formatElapsedTime = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now - created;

    const diffMinutes = Math.floor(diffMs / 1000 / 60);
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
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
          <input
            type="text"
            placeholder="Search for ticket"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.tabs}>
          <span
            className={`${styles.tab} ${activeTab === "all" ? styles.active : ""}`}
            onClick={() => handleTabChange("all")}
          >
            All Tickets
          </span>
          <span
            className={`${styles.tab} ${activeTab === "resolved" ? styles.active : ""}`}
            onClick={() => handleTabChange("resolved")}
          >
            Resolved
          </span>
          <span
            className={`${styles.tab} ${activeTab === "unresolved" ? styles.active : ""}`}
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
                <span className={styles.ticketNumber}>Ticket# {ticket._id}</span>
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
                <p>Hey!</p>
                <span className={styles.ticketDuration}>
                  {ticket.createdAt
                    ? formatElapsedTime(ticket.createdAt)
                    : "Unknown"}
                </span>
              </div>
              <hr style={{border: "none", backgroundColor: '#E7E7E7', height: '1px'}} />
              <div className={styles.ticketFooter}>
                <div className={styles.ticketInfo}>
                  <img src={avatar} alt="User" className={styles.userImg} />
                  <div>
                    <span className={styles.userDetails}>{ticket.name || "Unknown"}
                      <br/>
                      {ticket.phone || "N/A"}
                      <br />
                      {ticket.email || "N/A"}
                      </span>
                  </div>
                </div>
                <button 
                  className={styles.openButton}
                  onClick={() => navigate(`/dashboard/contact-center?ticketId=${ticket._id}`)}
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
import React, { useEffect, useState } from "react";
import styles from "./TicketList.module.css";
import avatar from "../../assets/icons/avatar.png";
import axios from "axios";

const TicketList = ({ tickets, onSelect, selectedTicket }) => {
  const [ticketMessages, setTicketMessages] = useState({});

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = {};
      const token = localStorage.getItem("token");

      for (const ticket of tickets) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}api/conversations/${ticket._id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          const conversation = response.data;
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
    };

    fetchMessages();
  }, [tickets]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>Contact Center</span>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.tabList}>
            <button className={styles.active}>Chats</button>
        </div>
        <ul className={styles.ticketList}>
          {tickets.length === 0 && <li>No tickets available</li>}
          {tickets.map((ticket, index) => (
            <div className={`${styles.listItem} ${
                selectedTicket && selectedTicket._id === ticket._id
                  ? styles.selected
                  : ""
              }`}>
            <li
              key={index}
              onClick={() => onSelect(ticket)}
              className={`${styles.ticketItem} ${
                selectedTicket && selectedTicket._id === ticket._id
                  ? styles.selected
                  : ""
              }`}
            >
              <img src={avatar} alt="Avatar" className={styles.avatar} />
              <div className={styles.ticketDetails}>
                <span className={styles.name}>{ticket.name}</span>
                <span className={styles.message}>
                  {ticketMessages[ticket._id] || "No messages yet"}
                </span>
              </div>
            </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TicketList;

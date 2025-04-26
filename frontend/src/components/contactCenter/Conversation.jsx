import React, { useEffect, useState } from "react";
import styles from "./Conversation.module.css";
import avatar from "../../assets/icons/avatar.png";
import axios from 'axios';

const Conversation = ({ ticketId, userName }) => {
  const [messages, setMessages] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const sender = user.id;

  useEffect(() => {
    const token = localStorage.getItem("token");
      const fetchMessages = async () => {
          const response = await axios.get(import.meta.env.VITE_API_URL + `api/conversations/${ticketId}`);
          const data = await response.data;
          setMessages(data.messages);
      };
      fetchMessages();
  }, [ticketId]);

  const handleSendMessage = async (message) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(import.meta.env.VITE_API_URL + `api/conversations/${ticketId}/messages`, {
      type: "text",
      content: message,
      sender,
    }, {
      headers: {
        Authorization: `${token}`,
      },
    });
    setMessages((prevMessages) => [...prevMessages, response.data]);
  }

  return (
    <div className={styles.ticketsContainer}>
      <div className={styles.ticketHeader}>Ticket# {ticketId}</div>
      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.chatWindow}>
          <div className={styles.dateDivider}>
            <span>March 7, 2025</span>
          </div>
          <div className={styles.chatMessage}>
            <img src={avatar} alt="Avatar" className={styles.avatar} />
            <div>
              {
                messages.map((message) => (
                  <div key={message._id} className={`${styles.message} ${message.sender? styles['sent'] : styles['received']}`}>
                    <span className={`${styles.messageText}`}>{userName}</span>
                    <p>{message?.content}</p>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <div className={styles["inputArea"]}>
        <input
          type="text"
          placeholder="Type here"
          className={styles.chatInput}
        />
        <button className={styles.sendButton} onClick={() => handleSendMessage(document.querySelector(`.${styles.chatInput}`).value)}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="10" cy="10" r="9.5" stroke="#D1D6DA" />
            <path d="M7 14V11L11 10L7 9V6L16.5 10L7 14Z" fill="#D1D6DA" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Conversation;

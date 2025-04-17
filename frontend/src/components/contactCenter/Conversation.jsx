import React, { useEffect, useState } from 'react';
import styles from './Conversation.module.css';
import avatar from '../../assets/icons/avatar.png';

const Conversation = ({ ticketId }) => {
    const [messages, setMessages] = useState([]);

    // useEffect(() => {
    //     const fetchMessages = async () => {
    //         const response = await fetch(`/api/tickets/${ticketId}/messages`); // Replace with your API endpoint
    //         const data = await response.json();
    //         setMessages(data);
    //     };
    //     fetchMessages();
    // }, [ticketId]);

    return (
        <div className={styles.ticketsContainer}>
      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.ticketHeader}>Ticket# {ticketId}</div>
        <div className={styles.chatWindow}>
          <div className={styles.chatMessage}>
            <img src={avatar} alt="Avatar" className={styles.avatar} />
            <div>
              <span className={styles.messageText}>Chat 1</span>
              <span className={styles.messageTime}>March 7, 2025</span>
              <p>I have a question</p>
            </div>
          </div>
          <div className={styles.chatInput}>
            <span className={styles.inputLabel}>type here</span>
          </div>
        </div>
      </div>
      </div>
    );
};

export default Conversation;
import React from "react";
import styles from "./TicketDetails.module.css";
import avatar from "../../assets/icons/avatar.png";

const TicketDetails = ({ ticket }) => {
  return (
    <div className={styles.detailsPanel}>
      <div className={styles.detailsHeader}>
        <img src={avatar} alt="" className={styles.chatAvatar} />
        <span>{ticket.name}</span>
      </div>
      <div className={styles.detailsTitle}>Details</div>
      <div className={styles.detailItem}>
        <span>📧</span>
        <span>{ticket.name}</span>
      </div>
      <div className={styles.detailItem}>
        <span>📞</span>
        <span>{ticket.phone}</span>
      </div>
      <div className={styles.detailItem}>
        <span>📧</span>
        <span>{ticket.email}</span>
      </div>
      <span  className={styles.detailsTitle}>Teammates</span>
      <div className={styles.detailItem}>
        <select className={styles.dropdown}>
          <option>Joe Doe</option>
        </select>
      </div>
      <div className={styles.detailItem}>
        <span>Ticket status</span>
        <select className={styles.dropdown}>
          <option>Resolved</option>
          <option>Unresolved</option>
        </select>
      </div>
      <div className={styles.confirmDialog}>
        <span>Chat would be assigned to Different team member</span>
        <div>
          <button className={styles.cancelButton}>Cancel</button>
          <button className={styles.confirmButton}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;

import React from "react";
import styles from "./TicketDetails.module.css";
import avatar from "../../assets/icons/avatar.png";

const TicketDetails = ({ ticket }) => {
  const [members, setMembers] = React.useState([
    {
      name: "Joe Doe",
    },
    {
      name: "Jane Doe",
    },
    {
      name: "John Doe",
    },
    {
      name: "Jill Doe",
    },
  ]);

  const [statuses, setStatuses] = React.useState([{
    status: "Resolved"
  },
  {
    status: "Unresolved"
  }
])

  const [showMembers, setShowMembers] = React.useState(false);
  const [showStatus, setShowStatus] = React.useState(false);


  let user = JSON.parse(localStorage.getItem("user"));

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
      <span className={styles.detailsTitle}>Teammates</span>
      <div>
        <div className={styles.dropdownHeader} onClick={() => setShowMembers(!showMembers)}>
          <div>
            <img src={avatar} alt="" className={styles.chatAvatar} />
            <span>{user.name}</span>
          </div>
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.28886 7.15694L0.631863 1.49994L2.04586 0.085937L6.99586 5.03594L11.9459 0.0859374L13.3599 1.49994L7.70286 7.15694C7.51534 7.34441 7.26103 7.44972 6.99586 7.44972C6.7307 7.44972 6.47639 7.34441 6.28886 7.15694Z"
              fill="#808080"
            />
          </svg>
        </div>
        
        {
         showMembers && (
          <div className={styles.dropdownContainer}>
            {members.map((member, index) => {
            return (
              <div key={index} className={styles.dropdown}>
                <img src={avatar} alt="" className={styles.chatAvatar} />
                <span>{member.name}</span>
              </div>
            );
          })}
            </div>
         )
        }
      </div>
      <div>
        <div className={styles.dropdownHeader} onClick={() => setShowStatus(!showStatus)}>
          <div>
            <img src={avatar} alt="" className={styles.chatAvatar} />
            <span>Ticket status</span>
          </div>
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.28886 7.15694L0.631863 1.49994L2.04586 0.085937L6.99586 5.03594L11.9459 0.0859374L13.3599 1.49994L7.70286 7.15694C7.51534 7.34441 7.26103 7.44972 6.99586 7.44972C6.7307 7.44972 6.47639 7.34441 6.28886 7.15694Z"
              fill="#808080"
            />
          </svg>
        </div>
        
        {
         showStatus && (
          <div className={styles.dropdownContainer}>
            {statuses.map((status, index) => {
            return (
              <div key={index} className={styles.dropdown}>
                <img src={avatar} alt="" className={styles.chatAvatar} />
                <span>{status.status}</span>
              </div>
            );
          })}
            </div>
         )
        }
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

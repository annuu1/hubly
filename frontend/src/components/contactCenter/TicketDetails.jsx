import React, { useEffect, useState } from "react";
import styles from "./TicketDetails.module.css";
import avatar from "../../assets/icons/avatar.png";
import axios from "axios";

const TicketDetails = ({ ticket }) => {
  const [members, setMembers] = useState([]);
  const [statuses, setStatuses] = useState([
    { status: "Resolved" },
    { status: "Unresolved" },
  ]);
  const [showMembers, setShowMembers] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}api/users/members`,
          {
            headers: {
              Authorization: `${user.token}`,
            },
          }
        );
        setMembers(response.data.users || []);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };
    fetchMembers();
  }, [user.token]);

  const handleSelectMember = (memberId) => {
    setSelectedMemberId(memberId);
    setConfirmAction("assign");
    setShowConfirmDialog(true);
    setShowMembers(false);
  };

  const handleSelectStatus = (status) => {
    setSelectedStatus(status);
    setConfirmAction("status");
    setShowConfirmDialog(true);
    setShowStatus(false);
  };

  const handleAssign = async () => {
    if (!selectedMemberId) return;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}api/tickets/assign`,
        {
          ticketId: ticket._id,
          memberId: selectedMemberId,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("Assignment successful:", response.data);
      setShowConfirmDialog(false);
      setSelectedMemberId(null);
      setConfirmAction(null);
    } catch (error) {
      console.error("Error assigning ticket:", error);
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedStatus) return;
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}api/tickets/${ticket._id}/status`,
        {
          status: selectedStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("Status update successful:", response.data);
      setShowConfirmDialog(false);
      setSelectedStatus(null);
      setConfirmAction(null);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleConfirm = () => {
    if (confirmAction === "assign") {
      handleAssign();
    } else if (confirmAction === "status") {
      handleUpdateStatus();
    }
  };

  const handleCancelAssign = () => {
    setShowConfirmDialog(false);
    setSelectedMemberId(null);
    setSelectedStatus(null);
    setConfirmAction(null);
  };

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
        <div
          className={styles.dropdownHeader}
          onClick={() => setShowMembers(!showMembers)}
        >
          <div className={styles.dropdown}>
            <img src={avatar} alt="" className={styles.chatAvatar} />
            <span>{user.name}</span>
          </div>
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={showMembers ? styles.dropdownArrowOpen : ""}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.28886 7.15694L0.631863 1.49994L2.04586 0.085937L6.99586 5.03594L11.9459 0.0859374L13.3599 1.49994L7.70286 7.15694C7.51534 7.34441 7.26103 7.44972 6.99586 7.44972C6.7307 7.44972 6.47639 7.34441 6.28886 7.15694Z"
              fill="#808080"
            />
          </svg>
        </div>
        {showMembers && (
          <div className={styles.dropdownContainer}>
            {members.map((member) => (
              <div
                key={member._id}
                className={styles.dropdown}
                onClick={() => handleSelectMember(member._id)}
              >
                <img src={avatar} alt="" className={styles.chatAvatar} />
                <span>{member.fullName}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <div
          className={styles.dropdownHeader}
          onClick={() => setShowStatus(!showStatus)}
        >
          <div className={styles.dropdown}>
            <img src={avatar} alt="" className={styles.chatAvatar} />
            <span>Ticket status</span>
          </div>
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={showStatus ? styles.dropdownArrowOpen : ""}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.28886 7.15694L0.631863 1.49994L2.04586 0.085937L6.99586 5.03594L11.9459 0.0859374L13.3599 1.49994L7.70286 7.15694C7.51534 7.34441 7.26103 7.44972 6.99586 7.44972C6.7307 7.44972 6.47639 7.34441 6.28886 7.15694Z"
              fill="#808080"
            />
          </svg>
        </div>
        {showStatus && (
          <div className={styles.dropdownContainer}>
            {statuses.map((status, index) => (
              <div
                key={index}
                className={styles.dropdown}
                onClick={() => handleSelectStatus(status.status)}
              >
                <img src={avatar} alt="" className={styles.chatAvatar} />
                <span>{status.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {showConfirmDialog && (
        <div className={styles.confirmDialog}>
          <span>
            {confirmAction === "assign"
              ? "Chat would be assigned to a different team member"
              : `Ticket status will be updated to ${selectedStatus}`}
          </span>
          <div>
            <button
              className={styles.cancelButton}
              onClick={handleCancelAssign}
            >
              Cancel
            </button>
            <button className={styles.confirmButton} onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetails;
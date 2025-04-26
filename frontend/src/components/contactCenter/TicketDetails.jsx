import React, { useEffect, useState } from "react";
import styles from "./TicketDetails.module.css";
import avatar from "../../assets/icons/avatar.png";
import axios from "axios";

const TicketDetails = ({ ticket }) => {
  const [members, setMembers] = useState([]);
  const [statuses, setStatuses] = useState([
    { status: "resolved" },
    { status: "unresolved" },
  ]);
  const [showMembers, setShowMembers] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}api/users/members`,
          {
            headers: {
              Authorization: `${token}`,
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
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}api/tickets/${ticket._id}/assign`,
        {
          memberId: selectedMemberId,
        },
        {
          headers: {
            Authorization: `${token}`,
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
            Authorization: `${token}`,
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
            <svg
            className={styles.svgIcon}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 7.5V2.5C20 1.83696 19.7893 1.20107 19.4142 0.732233C19.0391 0.263392 18.5304 0 18 0H2C1.46957 0 0.960859 0.263392 0.585786 0.732233C0.210714 1.20107 0 1.83696 0 2.5V7.5C0.530433 7.5 1.03914 7.76339 1.41421 8.23223C1.78929 8.70107 2 9.33696 2 10C2 10.663 1.78929 11.2989 1.41421 11.7678C1.03914 12.2366 0.530433 12.5 0 12.5V17.5C0 18.875 0.9 20 2 20H18C19.1 20 20 18.875 20 17.5V12.5C18.9 12.5 18 11.375 18 10C18 8.625 18.9 7.5 20 7.5ZM18 5.675C16.81 6.5375 16 8.1625 16 10C16 11.8375 16.81 13.4625 18 14.325V17.5H2V14.325C3.19 13.4625 4 11.8375 4 10C4 8.125 3.2 6.5375 2 5.675V2.5H18V5.675ZM9 13.75H11V16.25H9M9 8.75H11V11.25H9M9 3.75H11V6.25H9V3.75Z"
                fill="#808080"
              />
            </svg>

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

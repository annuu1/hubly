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
        <span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.8333 13.8333H2.16667V2.16667H13.8333M13.8333 0.5H2.16667C1.72464 0.5 1.30072 0.675595 0.988155 0.988155C0.675595 1.30072 0.5 1.72464 0.5 2.16667V13.8333C0.5 14.2754 0.675595 14.6993 0.988155 15.0118C1.30072 15.3244 1.72464 15.5 2.16667 15.5H13.8333C14.2754 15.5 14.6993 15.3244 15.0118 15.0118C15.3244 14.6993 15.5 14.2754 15.5 13.8333V2.16667C15.5 1.72464 15.3244 1.30072 15.0118 0.988155C14.6993 0.675595 14.2754 0.5 13.8333 0.5ZM11.75 11.5417C11.75 10.2917 9.25 9.66667 8 9.66667C6.75 9.66667 4.25 10.2917 4.25 11.5417V12.1667H11.75M8 8.20833C8.49728 8.20833 8.97419 8.01079 9.32582 7.65916C9.67746 7.30753 9.875 6.83061 9.875 6.33333C9.875 5.83605 9.67746 5.35914 9.32582 5.00751C8.97419 4.65588 8.49728 4.45833 8 4.45833C7.50272 4.45833 7.02581 4.65588 6.67417 5.00751C6.32254 5.35914 6.125 5.83605 6.125 6.33333C6.125 6.83061 6.32254 7.30753 6.67417 7.65916C7.02581 8.01079 7.50272 8.20833 8 8.20833Z" fill="#808080"/>
</svg>

        </span>
        <span>{ticket.name}</span>
      </div>
      <div className={styles.detailItem}>
        <span>
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.2498 16.3333C15.5814 16.3333 15.8993 16.2016 16.1337 15.9672C16.3681 15.7328 16.4998 15.4149 16.4998 15.0833V12.1667C16.4998 11.8351 16.3681 11.5172 16.1337 11.2828C15.8993 11.0484 15.5814 10.9167 15.2498 10.9167C14.2748 10.9167 13.3165 10.7667 12.3998 10.4583C12.1807 10.3892 11.9468 10.3813 11.7235 10.4357C11.5002 10.49 11.296 10.6045 11.1332 10.7667L9.93317 11.9667C7.86004 10.8353 6.15616 9.13147 5.02484 7.05833L6.2165 5.86667C6.55817 5.54167 6.68317 5.05833 6.53317 4.59167C6.23317 3.68333 6.08317 2.725 6.08317 1.75C6.08317 1.41848 5.95148 1.10054 5.71705 0.866117C5.48263 0.631696 5.16469 0.5 4.83317 0.5H1.9165C1.58498 0.5 1.26704 0.631696 1.03262 0.866117C0.7982 1.10054 0.666504 1.41848 0.666504 1.75C0.666504 9.79167 7.20817 16.3333 15.2498 16.3333ZM1.9165 1.33333H4.83317C4.94368 1.33333 5.04966 1.37723 5.1278 1.45537C5.20594 1.53351 5.24984 1.63949 5.24984 1.75C5.24984 2.81667 5.4165 3.85833 5.7415 4.85C5.78317 4.96667 5.77484 5.13333 5.6415 5.26667L3.99984 6.9C5.37484 9.59167 7.3915 11.6083 10.0915 13L11.7165 11.3583C11.8332 11.2417 11.9915 11.2083 12.1415 11.25C13.1415 11.5833 14.1832 11.75 15.2498 11.75C15.3603 11.75 15.4663 11.7939 15.5445 11.872C15.6226 11.9502 15.6665 12.0562 15.6665 12.1667V15.0833C15.6665 15.1938 15.6226 15.2998 15.5445 15.378C15.4663 15.4561 15.3603 15.5 15.2498 15.5C7.6665 15.5 1.49984 9.33333 1.49984 1.75C1.49984 1.63949 1.54374 1.53351 1.62188 1.45537C1.70002 1.37723 1.806 1.33333 1.9165 1.33333Z" fill="#808080"/>
</svg>

        </span>
        <span>{ticket.phone}</span>
      </div>
      <div className={styles.detailItem}>
        <span>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.0002 1H3.00016C2.07969 1 1.3335 1.74619 1.3335 2.66667V9.33333C1.3335 10.2538 2.07969 11 3.00016 11H13.0002C13.9206 11 14.6668 10.2538 14.6668 9.33333V2.66667C14.6668 1.74619 13.9206 1 13.0002 1Z" stroke="#808080"/>
<path d="M1.3335 3.5L7.25516 6.46083C7.4865 6.57643 7.74156 6.63661 8.00016 6.63661C8.25877 6.63661 8.51383 6.57643 8.74516 6.46083L14.6668 3.5" stroke="#808080"/>
</svg>

        </span>
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

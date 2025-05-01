import React from "react";
import styles from "./WelcomeMessage.module.css";
import ChatIcon from "../../assets/ChatIcon.svg";

function WelcomeMessage({ message, onClose, isAbsolute='true'}) {
  return (
    <div className={styles.welcomeMessageContainer} style={{ position: isAbsolute ? 'absolute' : 'relative' }}>
      <button
        className={styles.closeButton}
        onClick={() => onClose(false)}
        aria-label="Close"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 0.707L11.293 0L6 5.293L0.707 0L0 0.707L5.293 6L0 11.293L0.707 12L6 6.707L11.293 12L12 11.293L6.707 6L12 0.707Z"
            fill="#8498B6"
          />
        </svg>
      </button>

      <img src={ChatIcon} alt="chat icon" className={styles.chatIcon} />
      <div className={styles.welcomeMessage}>{message}</div>
    </div>
  );
}

export default WelcomeMessage;

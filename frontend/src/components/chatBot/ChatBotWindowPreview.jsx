import React, { useState, useEffect } from "react";
import styles from "./ChatBotWindow.module.css";
import ChatIcon from "../../assets/ChatIcon.svg";
import IntroSettingsCard from "../ui/IntroSettingsCard";

const ChatBotWindowPreview = ({ botSettings, setBotSettings }) => {
  const [messages, setMessages] = useState([
    "How can I help you?",
    "Ask me anything!",
  ]);
  useEffect(() => {
    setMessages(botSettings.customizedMessages);
  }, [botSettings]);

  return (
    <section
      className={styles.chatbotWindow}
      style={{ backgroundColor: botSettings.backgroundColor }}
    >
      <header
        className={styles.chatHeader}
        style={{ backgroundColor: botSettings.headerColor }}
      >
        <div className={styles.chatLogo}>
          <div className={styles.avatar}>
            <img src={ChatIcon} alt="Chat Icon" />
          </div>
          <div className={styles.statusIndicator}></div>
        </div>
        <h1>Hubly</h1>
      </header>
      <div className={styles.chatBody}>
        {messages.map((message, index) => {
          return (
            <div className={styles.messageContainer}>
              <div className={styles.messageAvatar}>
                <img src={ChatIcon} alt="Chat Icon" />
              </div>

              <div className={`${styles.message} ${styles["incoming"]}`}>
                <p>{message}</p>
              </div>
            </div>
          );
        })}
        <div className={styles.introFormContainer}>
          <IntroSettingsCard />
        </div>
      </div>
      <footer className={styles.chatFooter}>
        <input
          type="text"
          placeholder="Write a message"
          className={styles.messageInput}
        />
        <button className={styles.sendButton}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5117 0.196887C17.8668 0.442981 18.0531 0.868372 17.9863 1.29376L15.7363 15.9188C15.6836 16.2598 15.4761 16.5586 15.1738 16.7274C14.8715 16.8961 14.5094 16.9172 14.1894 16.7836L9.98474 15.0363L7.57654 17.6414C7.26365 17.9824 6.77146 18.0949 6.33904 17.9262C5.90662 17.7574 5.62537 17.3391 5.62537 16.875V13.9359C5.62537 13.7953 5.6781 13.6617 5.77302 13.5598L11.6652 7.1297C11.8691 6.90822 11.8621 6.5672 11.6511 6.35626C11.4402 6.14533 11.0992 6.13126 10.8777 6.33165L3.72693 12.6844L0.622632 11.1305C0.249976 10.9442 0.010913 10.5715 0.000366172 10.1567C-0.0101807 9.74181 0.207788 9.35509 0.566382 9.14767L16.3164 0.147669C16.6926 -0.0667845 17.1566 -0.0456908 17.5117 0.196887Z"
              fill="#B0C1D4"
            />
          </svg>
        </button>
      </footer>
    </section>
  );
};

export default ChatBotWindowPreview;

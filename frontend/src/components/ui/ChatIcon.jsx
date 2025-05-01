import React, {useState, useEffect} from "react";
import styles from "./ChatIcon.module.css";
import ChatBotWindow from "../chatBot/ChatBotWindow";
import axios from "axios";
import WelcomeMessage from "./WelcomeMessage";

function ChatIcon() {
  const [showChat, setShowChat] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);

  const [botSettings, setBotSettings] = useState({
      headerColor: "",
      backgroundColor: "",
      customizedMessages: [],
      welcomeMessage: "",
      missedChatTimer: "",
    });

  const handleChatIconClick = () => {
    setShowWelcomeMessage(false);
    setShowChat(!showChat);
  };
  const handleCloseChat = () => {
    setShowChat(false);
  };
  useEffect(() => {
    const fetchBotSettings = async () => {
      const url = `${import.meta.env.VITE_API_URL}api/botSettings`;
      try {
        const response = await axios.get(url);
        const {
          headerColor,
          backgroundColor,
          customizedMessages,
          welcomeMessage,
          missedChatTimer,
        } = response.data.botSettings;
        setBotSettings({
          headerColor,
          backgroundColor,
          customizedMessages,
          welcomeMessage,
          missedChatTimer,
        });
      } catch (error) {
        console.error("Error fetching bot settings:", error);
        alert("Error fetching bot settings");
      }
    };
    fetchBotSettings();
  }, []);


  return (
    <div className={styles.chatContainer}>
      <button className={styles.chatIcon} onClick={handleChatIconClick}>
        {showChat ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 1.17833L18.8217 0L10 8.82167L1.17833 0L0 1.17833L8.82167 10L0 18.8217L1.17833 20L10 11.1783L18.8217 20L20 18.8217L11.1783 10L20 1.17833Z"
              fill="white"
            />
          </svg>
        ) : (
          <svg
            width="32"
            height="30"
            viewBox="0 0 32 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M30.7157 3.48895C30.4611 1.91354 29.5109 0.964894 27.9801 0.748407C27.9428 0.739488 24.2147 0.024353 18.3638 0.024353C12.5147 0.024353 8.78654 0.739488 8.76141 0.745164C7.56384 0.915434 6.72871 1.52922 6.29492 2.52246C8.80206 2.2453 11.3228 2.10914 13.8452 2.11462C19.516 2.11462 23.2887 2.76652 23.8425 2.86868C26.339 3.24327 28.0749 4.97516 28.4949 7.513C28.6765 8.34003 29.2506 11.2476 29.2506 14.7187C29.2506 16.5771 29.0836 18.2822 28.9036 19.5852C29.8928 19.1668 30.5155 18.3284 30.7117 17.1171C30.7182 17.0871 31.4357 14.0246 31.4357 10.2941C31.4357 6.56435 30.7182 3.50192 30.7141 3.48814"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M26.1976 7.91355C25.943 6.33734 24.9919 5.38869 23.4619 5.17139C23.4246 5.16328 19.6965 4.44977 13.8465 4.44977C7.99728 4.44977 4.26836 5.16328 4.24404 5.16977C2.70107 5.38869 1.7508 6.33734 1.50026 7.89652C1.49215 7.92652 0.775391 10.989 0.775391 14.7195C0.775391 18.4492 1.49215 21.5117 1.4962 21.5246C1.7508 23.1008 2.70107 24.0495 4.23188 24.2668C4.26188 24.2725 6.68053 24.7354 10.664 24.9163L13.0381 29.0287C13.12 29.1706 13.2378 29.2885 13.3797 29.3705C13.5216 29.4524 13.6826 29.4956 13.8465 29.4956C14.0103 29.4956 14.1713 29.4524 14.3132 29.3705C14.4551 29.2885 14.573 29.1706 14.6549 29.0287L17.0297 24.9171C21.0132 24.7354 23.4294 24.2733 23.4497 24.2684C24.9919 24.0495 25.943 23.1008 26.1935 21.5417C26.2016 21.5117 26.9176 18.4492 26.9176 14.7195C26.9176 10.989 26.2008 7.92652 26.1976 7.91355Z"
              fill="white"
            />
          </svg>
        )}
      </button>
      {
        showWelcomeMessage && (
          <div className={styles.chatWindow}>
            <WelcomeMessage message={botSettings.welcomeMessage} onClose={setShowWelcomeMessage} />
          </div>
        )
      }
      {showChat && (
        <div className={styles.chatWindow}>
          <ChatBotWindow onClose={handleCloseChat} botSettings={botSettings} setBotSettings={setBotSettings} />
        </div>
      )}
    </div>
  );
}

export default ChatIcon;

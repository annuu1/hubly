import React, { useEffect, useState } from "react";
import styles from "./Conversation.module.css";
import profile from "../../assets/icons/profile.png";
import memberProfile from "../../assets/icons/memberProfile.png";
import axios from "axios";

const Conversation = ({ ticketId, userName, status }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(""); 
  const [botSettings, setBotSettings] = useState(null);
  const [isMissedChat, setIsMissedChat] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const sender = user.id;

  useEffect(() => {
    const token = localStorage.getItem("token");
    //getiing the bot settings
    const fetchBotSettings = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}api/botSettings`
        );
        setBotSettings(response.data.botSettings ?? {missedChatTimer:'01:59:59'});
      } catch (error) {
        console.error("Error fetching bot settings:", error);
      }
    };

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}api/conversations/${ticketId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(response.data.messages || []);
        checkIfMissedChat(response.data.messages || [])
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchBotSettings();
    fetchMessages();
  }, [ticketId, status]);

    // check for missed chat
    const checkIfMissedChat = (messages) => {
      if (!botSettings || !messages.length) return;

      const customerMessages = messages.filter(msg => msg.sender !== sender);
      const agentMessages = messages.filter(msg => msg.sender === sender);
      
      if (customerMessages.length > 0) {
        const firstCustomerMsg = customerMessages[0];
        const firstAgentMsg = agentMessages[0];
        
        const [hours, minutes, seconds] = botSettings.missedChatTimer?.split(':').map(Number) || [0, 5, 0];
        const missedTimeLimit = hours * 3600000 + minutes * 60000 + seconds * 1000;
        
        const customerMsgTime = new Date(firstCustomerMsg.createdAt).getTime();
        const agentMsgTime = new Date(firstAgentMsg?.createdAt).getTime() || Date.now();
        const timeDifference = agentMsgTime - customerMsgTime;
        console.log(timeDifference > missedTimeLimit)
        
        setIsMissedChat(timeDifference > missedTimeLimit);
      }
    };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}api/conversations/${ticketId}/messages`,
        {
          type: "text",
          content: newMessage,
          sender,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      const newMessageObj = {
        _id: response.data._id,
        content: newMessage,
        sender: sender,
        type: "text",
        createdAt: new Date().toISOString(),
      };

      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, newMessageObj];
        // soring of the messages
        return updatedMessages.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      });

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDatePart = (dateString) => {
    return dateString.split("T")[0];
  };

  const renderMessages = () => {
    let lastDate = null;
    const elements = [];

    messages.forEach((message, index) => {
      const messageDate = getDatePart(message.createdAt);
      if (messageDate !== lastDate) {
        elements.push(
          <div key={`date-${messageDate}`} className={styles.dateDivider}>
            <span>{formatDate(message.createdAt)}</span>
          </div>
        );
        lastDate = messageDate;
      }

      elements.push(
        <div
          key={message._id}
          className={`${styles.chatMessage} ${
            message.sender === sender ? styles.sent : styles.received
          }`}
        >
          {message.sender !== sender ? (
            <img src={profile} alt="Profile" className={styles.profile} />
          ) : (
            <img src={memberProfile} alt="Profile" className={styles.profile} />
          )}
          <div className={styles.messageContent}>
            <span
              className={styles.messageText}
              style={message.sender === sender ? { textAlign: "right" } : {}}
            >
              {message.sender === sender ? user.name : userName}
            </span>
            <p>{message.content}</p>
          </div>
        </div>
      );
      if(isMissedChat && index === 0){
        elements.push(
          <div key="missed-chat-notice" className={styles.missedChatNotice}>
            <p>Replying to a missed chat</p>
          </div>
        )
      }
    });

    return elements;
  };

  return (
    <div className={styles.ticketsContainer}>
      <div className={styles.ticketHeader}>
        Ticket# {ticketId}
        <svg
          width="12"
          height="14"
          viewBox="0 0 12 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.999837 12.8333H4.0765V8.6025C4.0765 8.41194 4.14123 8.25222 4.27067 8.12333C4.39956 7.99389 4.55928 7.92917 4.74984 7.92917H7.24984C7.44039 7.92917 7.60039 7.99389 7.72984 8.12333C7.85873 8.25222 7.92317 8.41194 7.92317 8.6025V12.8333H10.9998V5.59C10.9998 5.50444 10.9812 5.42667 10.944 5.35667C10.9068 5.28667 10.8559 5.22555 10.7915 5.17333L6.30484 1.79167C6.21928 1.71722 6.11762 1.68 5.99984 1.68C5.88206 1.68 5.78067 1.71722 5.69567 1.79167L1.20817 5.17333C1.14428 5.22667 1.09345 5.28778 1.05567 5.35667C1.01789 5.42556 0.999282 5.50333 0.999837 5.59V12.8333ZM0.166504 12.8333V5.59C0.166504 5.37667 0.214282 5.17472 0.309837 4.98417C0.405393 4.79361 0.537059 4.63667 0.704837 4.51333L5.19234 1.115C5.42734 0.935555 5.69567 0.845833 5.99734 0.845833C6.299 0.845833 6.569 0.935555 6.80734 1.115L11.2948 4.5125C11.4632 4.63583 11.5948 4.79306 11.6898 4.98417C11.7854 5.17472 11.8332 5.37667 11.8332 5.59V12.8333C11.8332 13.0567 11.7501 13.2514 11.584 13.4175C11.4179 13.5836 11.2232 13.6667 10.9998 13.6667H7.76317C7.57206 13.6667 7.41206 13.6022 7.28317 13.4733C7.15428 13.3439 7.08984 13.1839 7.08984 12.9933V8.76333H4.90984V12.9933C4.90984 13.1844 4.84539 13.3444 4.7165 13.4733C4.58762 13.6022 4.42789 13.6667 4.23734 13.6667H0.999837C0.776504 13.6667 0.581782 13.5836 0.41567 13.4175C0.249559 13.2514 0.166504 13.0567 0.166504 12.8333Z"
            fill="#424242"
          />
        </svg>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.chatWindow}>{renderMessages()}</div>
      </div>
      <div className={styles.messageFooter}>
      {status === "unresolved" ? (
        <div className={styles.inputArea}>
        <textarea
          placeholder="Type here"
          className={styles.chatInput}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
          rows="3"
        />
        <button className={styles.sendButton} onClick={handleSendMessage}>
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
      ) : (
        <div className={styles.resolvedContainer}>
          <p className={styles.unresolved}>This chat has been resolved</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default Conversation;

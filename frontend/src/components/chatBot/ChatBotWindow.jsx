import React, { useState } from 'react';
import styles from './ChatBot.module.css';

const ChatBotWindow = ({ messages = [] }) => {
  const [showIntroForm, setShowIntroForm] = useState(true);

  const handleChatIconClick = () => {
    setShowIntroForm(!showIntroForm);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowIntroForm(false); // Switch to chat interface after form submission
  };

  return (
    <section className={styles.chatbotWindow}>
      <header className={styles.chatHeader}>
        <div className={styles.chatLogo}>
          <div className={styles.avatar}></div>
          <div className={styles.statusIndicator}></div>
        </div>
        <h1>Hubly</h1>
        <h2>Chat Bot</h2>
        <button
          className={styles.chatIcon}
          onClick={handleChatIconClick}
          title={showIntroForm ? 'Show Chat' : 'Show Form'}
        >
          <span className={styles.chatIconInner}></span>
        </button>
      </header>
      {showIntroForm ? (
        <div className={styles.introForm}>
          <h3>Introduce Yourself</h3>
          <form onSubmit={handleFormSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" placeholder="Your name" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Your Phone</label>
              <input
                type="tel"
                id="phone"
                placeholder="+1 (000) 000-0000"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                placeholder="example@gmail.com"
                required
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              Thank You!
            </button>
          </form>
        </div>
      ) : (
        <>
          <div className={styles.chatBody}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${styles.message} ${styles[message.type]}`}
              >
                {Array.isArray(message.content) ? (
                  message.content.map((text, i) => <p key={i}>{text}</p>)
                ) : (
                  <p>{message.content}</p>
                )}
              </div>
            ))}
          </div>
          <footer className={styles.chatFooter}>
            <input
              type="text"
              placeholder="Write a message"
              className={styles.messageInput}
            />
            <button className={styles.sendButton}>
              <span className={styles.sendIcon}></span>
            </button>
          </footer>
        </>
      )}
    </section>
  );
};

export default ChatBotWindow;
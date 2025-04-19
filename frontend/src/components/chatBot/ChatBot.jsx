import React from 'react';
import styles from './ChatBot.module.css';

const ChatBot = () => {
  return (
    <div className={styles.chatBotContainer}>
      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.chatHeader}>Chat Bot</div>
        <div className={styles.chatArea}>
          <div className={styles.chatMessage + ' ' + styles.bot}>
            <img src="https://via.placeholder.com/30" alt="Bot Avatar" className={styles.avatar} />
            <div className={styles.messageBubble}>
              <strong>Huby</strong>
              <p>How can I help you?</p>
            </div>
          </div>
          <div className={styles.chatMessage + ' ' + styles.user}>
            <div className={styles.messageBubble}>
              <p>Ask me anything!</p>
            </div>
          </div>
          <div className={styles.chatMessage + ' ' + styles.bot}>
            <img src="https://via.placeholder.com/30" alt="Bot Avatar" className={styles.avatar} />
            <div className={styles.messageBubble}>
              <strong>Introduction Form</strong>
              <form>
                <input type="text" placeholder="Your name" />
                <input type="text" placeholder="Your phone" />
                <input type="email" placeholder="Your email" />
                <button type="submit">Thank You!</button>
              </form>
            </div>
          </div>
          <div className={styles.chatMessage + ' ' + styles.bot}>
            <img src="https://via.placeholder.com/30" alt="Bot Avatar" className={styles.avatar} />
            <div className={styles.messageBubble + ' ' + styles.welcome}>
              <strong>Welcome Message</strong>
              <p>😊 Want to chat about Huby? I'm an chatbot here to help you find your way.</p>
            </div>
          </div>
          <div className={styles.chatMessage + ' ' + styles.bot}>
            <img src="https://via.placeholder.com/30" alt="Bot Avatar" className={styles.avatar} />
            <div className={styles.messageBubble}>
              <strong>Missed Chat Timer</strong>
              <div className={styles.timerGrid}>
                <div>
                  <input type="number" defaultValue="12" /> : <input type="number" defaultValue="09" /> : <input type="number" defaultValue="59" />
                </div>
                <div>
                  <input type="number" defaultValue="01" /> : <input type="number" defaultValue="11" /> : <input type="number" defaultValue="01" />
                </div>
                <button>Save</button>
              </div>
            </div>
          </div>
          <div className={styles.chatMessage + ' ' + styles.bot}>
            <img src="https://via.placeholder.com/30" alt="Bot Avatar" className={styles.avatar} />
            <div className={styles.messageBubble + ' ' + styles.info}>
              <p>😊 Want to chat about Huby? I'm an chatbot here to help you find your way.</p>
            </div>
          </div>
          <div className={styles.inputArea}>
            <span>Write a message</span>
            <span className={styles.attachIcon}>📎</span>
          </div>
        </div>
      </div>

      {/* Customization Panel */}
      <div className={styles.customizationPanel}>
        <div className={styles.customCard}>
          <h3>Header Color</h3>
          <div className={styles.colorOptions}>
            <span className={styles.colorBox + ' ' + styles.white}></span>
            <span className={styles.colorBox + ' ' + styles.black}></span>
            <span className={styles.colorBox + ' ' + styles.blue}></span>
          </div>
          <input type="text" value="#3475E8" readOnly />
        </div>
        <div className={styles.customCard}>
          <h3>Custom Background Color</h3>
          <div className={styles.colorOptions}>
            <span className={styles.colorBox + ' ' + styles.white}></span>
            <span className={styles.colorBox + ' ' + styles.black}></span>
            <span className={styles.colorBox + ' ' + styles.gray}></span>
          </div>
          <input type="text" value="#EEEEEE" readOnly />
        </div>
        <div className={styles.customCard}>
          <h3>Customize Message</h3>
          <div className={styles.messageOptions}>
            <input type="text" value="How can I help you?" readOnly />
            <span className={styles.editIcon}>✏️</span>
          </div>
          <div className={styles.messageOptions}>
            <input type="text" value="Ask me anything!" readOnly />
            <span className={styles.editIcon}>✏️</span>
          </div>
        </div>
        <div className={styles.customCard}>
          <h3>Introduction Form</h3>
          <form>
            <input type="text" placeholder="Your name" />
            <input type="text" placeholder="Your phone" />
            <input type="email" placeholder="Your email" />
            <button type="submit">Thank You!</button>
          </form>
        </div>
        <div className={styles.customCard}>
          <h3>Welcome Message</h3>
          <div className={styles.messageOptions}>
            <input type="text" value="😊 Want to chat about Huby? I'm an chatbot here to help you find your way." readOnly />
            <span className={styles.editIcon}>✏️</span>
          </div>
        </div>
        <div className={styles.customCard}>
          <h3>Missed Chat Timer</h3>
          <div className={styles.timerGrid}>
            <div>
              <input type="number" defaultValue="12" /> : <input type="number" defaultValue="09" /> : <input type="number" defaultValue="59" />
            </div>
            <div>
              <input type="number" defaultValue="01" /> : <input type="number" defaultValue="11" /> : <input type="number" defaultValue="01" />
            </div>
            <button>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
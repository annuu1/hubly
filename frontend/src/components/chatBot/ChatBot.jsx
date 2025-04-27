import React from 'react';
import ChatBotWindow from './ChatBotWindow';
import styles from './ChatBot.module.css';

const ChatBot = () => {
  const [botSettings, setBotSettings] = React.useState({
    headerColor: '#33475B',
    backgroundColor: '#EEEEEE',
    customizedMessages: ['How can I help you?', 'Ask me anything!'],
    welcomeMessage: '👋 Want to chat about Hubly? I\'m a chatbot here to help you find your way.',
    missedChatTimer: '09:00:00',
  });
  const messages = [
    // {
    //   type: 'incoming',
    //   content: '👋 Want to chat about Hubly? I\'m a chatbot here to help you find your way.',
    // },
    // {
    //   type: 'outgoing',
    //   content: ['How can I help you?', 'Ask me anything!'],
    // },
  ];

  return (
    <div className={styles.appContainer}>
      <main className={styles.mainContent}>
        {/* Chatbot Window */}
        <div className={styles.chatBotPreview}>
        <ChatBotWindow messages={messages} botSetting={botSettings} />
        </div>

        {/* Settings Panels */}
        <aside className={styles.settingsPanel}>
          <div className={styles.settingsCard}>
            <h3>Header Color</h3>
            <div className={styles.colorOptions}>
              <div
                className={styles.colorSwatch}
                style={{ background: '#fff', border: '1px solid #000' }}
              ></div>
              <div
                className={styles.colorSwatch}
                style={{ background: '#000' }}
              ></div>
              <div
                className={styles.colorSwatch}
                style={{ background: '#33475B' }}
              ></div>
            </div>
            <div className={styles.colorInput}>
              <div
                className={styles.colorPreview}
                style={{ background: '#33475B' }}
              ></div>
              <input type="text" value="#33475B" readOnly />
            </div>
          </div>
          <div className={styles.settingsCard}>
            <h3>Custom Background Color</h3>
            <div className={styles.colorOptions}>
              <div
                className={styles.colorSwatch}
                style={{ background: '#fff', border: '1px solid #000' }}
              ></div>
              <div
                className={styles.colorSwatch}
                style={{ background: '#000' }}
              ></div>
              <div
                className={styles.colorSwatch}
                style={{ background: '#EEEEEE' }}
              ></div>
            </div>
            <div className={styles.colorInput}>
              <div
                className={styles.colorPreview}
                style={{ background: '#EEEEEE' }}
              ></div>
              <input type="text" value="#EEEEEE" readOnly />
            </div>
          </div>
          <div className={styles.settingsCard}>
            <h3>Customize Message</h3>
            <div className={styles.messageInputs}>
              <input type="text" defaultValue="How can I help you?" />
              <input type="text" defaultValue="Ask me anything!" />
            </div>
          </div>
          <div className={styles.settingsCard}>
            <h3>Introduction Form</h3>
            <form>
              <div className={styles.formGroup}>
                <label htmlFor="form-name">Your Name</label>
                <input type="text" id="form-name" placeholder="Your name" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="form-phone">Your Phone</label>
                <input
                  type="tel"
                  id="form-phone"
                  placeholder="+1 (000) 000-0000"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="form-email">Your Email</label>
                <input
                  type="email"
                  id="form-email"
                  placeholder="example@gmail.com"
                />
              </div>
              <button type="submit" className={styles.submitButton}>
                Thank You!
              </button>
            </form>
          </div>
          <div className={styles.settingsCard}>
            <h3>Welcome Message</h3>
            <textarea
              defaultValue="👋 Want to chat about Hubly? I'm a chatbot here to help you find your way."
            ></textarea>
            <span className={styles.charCount}>15/50</span>
          </div>
          <div className={styles.settingsCard}>
            <h3>Missed Chat Timer</h3>
            <div className={styles.timerInputs}>
              <input type="text" defaultValue="09" size="2" />:
              <input type="text" defaultValue="00" size="2" />:
              <input type="text" defaultValue="00" size="2" />
            </div>
          </div>
          <button className={styles.saveButton}>Save</button>
        </aside>
      </main>
    </div>
  );
};

export default ChatBot;
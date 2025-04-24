import React from 'react';
import styles from './ChatBot.module.css';

const ChatBot = () => {
  return (
    <div className={styles.appContainer}>
      <main className={styles.mainContent}>
        {/* Chatbot Window */}
        <section className={styles.chatbotWindow}>
          <header className={styles.chatHeader}>
            <div className={styles.chatLogo}>
              <div className={styles.avatar}></div>
              <div className={styles.statusIndicator}></div>
            </div>
            <h1>Hubly</h1>
            <h2>Chat Bot</h2>
          </header>
          <div className={styles.chatBody}>
            <div className={`${styles.message} ${styles.incoming}`}>
              <p>👋 Want to chat about Hubly? I'm a chatbot here to help you find your way.</p>
            </div>
            <div className={`${styles.message} ${styles.outgoing}`}>
              <p>How can I help you?</p>
              <p>Ask me anything!</p>
            </div>
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
        </section>

        {/* Introduction Form (Popup) */}
        <div className={styles.introForm}>
          <h3>Introduce Yourself</h3>
          <form>
            <div className={styles.formGroup}>
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" placeholder="Your name" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Your Phone</label>
              <input type="tel" id="phone" placeholder="+1 (000) 000-0000" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Your Email</label>
              <input type="email" id="email" placeholder="example@gmail.com" />
            </div>
            <button type="submit" className={styles.submitButton}>
              Thank You!
            </button>
          </form>
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
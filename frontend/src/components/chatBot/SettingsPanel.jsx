import React from 'react'
import styles from './SettingsPanel.module.css';
import IntroForm from './IntroForm';

function SettingsPanel() {
  return (
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
    <IntroForm />
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
  )
}

export default SettingsPanel
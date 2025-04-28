import React, { useEffect, useState, useCallback } from 'react';
import styles from './SettingsPanel.module.css';
import IntroForm from './IntroForm';
import axios from 'axios';

function useDebounce(callback, delay) {
  const [timeoutId, setTimeoutId] = useState(null);

  const debouncedCallback = useCallback(
    (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      const id = setTimeout(() => {
        callback(...args);
      }, delay);
      setTimeoutId(id);
    },
    [callback, delay, timeoutId]
  );

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return debouncedCallback;
}

function SettingsPanel({ botSettings, setBotSettings }) {
  const debouncedSave = useDebounce(() => {
    const url = import.meta.env.VITE_API_URL + 'api/botSettings';
    axios
      .put(url, {
        headerColor: botSettings.headerColor,
        backgroundColor: botSettings.backgroundColor,
        customizedMessages: botSettings.customizedMessages,
        welcomeMessage: botSettings.welcomeMessage,
        missedChatTimer: botSettings.missedChatTimer,
      })
      .then((response) => {
        console.log('Settings saved successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error saving settings:', error);
      });
  }, 500); 

  const handleHeaderColorChange = (color) => {
    setBotSettings({
      ...botSettings,
      headerColor: color,
    });
  };

  const handleBackgroundColorChange = (color) => {
    setBotSettings({
      ...botSettings,
      backgroundColor: color,
    });
  };

  const handleMessageChange = (index, value) => {
    const updatedMessages = [...botSettings.customizedMessages];
    updatedMessages[index] = value;
    setBotSettings({
      ...botSettings,
      customizedMessages: updatedMessages,
    });
    debouncedSave();
  };

  const handleWelcomeMessageChange = (value) => {
    setBotSettings({
      ...botSettings,
      welcomeMessage: value,
    });
    debouncedSave();
  };

  const handleMissedChatTimerChange = (value) => {
    setBotSettings({
      ...botSettings,
      missedChatTimer: value,
    });
    debouncedSave(); 
  };

  const handleSave = () => {
    const url = import.meta.env.VITE_API_URL + 'api/botSettings';
    axios
      .put(url, {
        headerColor: botSettings.headerColor,
        backgroundColor: botSettings.backgroundColor,
        customizedMessages: botSettings.customizedMessages,
        welcomeMessage: botSettings.welcomeMessage,
        missedChatTimer: botSettings.missedChatTimer,
      })
      .then((response) => {
        console.log('Settings saved successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error saving settings:', error);
      });
  };

  useEffect(() =>{
    const url = import.meta.env.VITE_API_URL + 'api/botSettings';
    axios
      .put(url, {
        headerColor: botSettings.headerColor,
        backgroundColor: botSettings.backgroundColor,
        customizedMessages: botSettings.customizedMessages,
        welcomeMessage: botSettings.welcomeMessage,
        missedChatTimer: botSettings.missedChatTimer,
      })
  }, [botSettings.headerColor, botSettings.backgroundColor]);

  return (
    <aside className={styles.settingsPanel}>
      <div className={styles.settingsCard}>
        <h3>Header Color</h3>
        <div className={styles.colorOptions}>
          <div
            className={styles.colorSwatch}
            style={{ background: '#fff', border: '1px solid #000' }}
            onClick={() => {
              handleHeaderColorChange('#ffffff');
            }}
          ></div>
          <div
            className={styles.colorSwatch}
            style={{ background: '#000' }}
            onClick={() => {
              handleHeaderColorChange('#000000');
            }}
          ></div>
          <div
            className={styles.colorSwatch}
            style={{ background: '#33475B' }}
            onClick={() => {
              handleHeaderColorChange('#33475B');
            }}
          ></div>
        </div>
        <div className={styles.colorInput}>
          <div
            className={styles.colorPreview}
            style={{ background: botSettings.headerColor }}
          ></div>
          <input type="text" value={botSettings.headerColor} readOnly />
        </div>
      </div>
      <div className={styles.settingsCard}>
        <h3>Custom Background Color</h3>
        <div className={styles.colorOptions}>
          <div
            className={styles.colorSwatch}
            style={{ background: '#fff', border: '1px solid #000' }}
            onClick={() => {
              handleBackgroundColorChange('#ffffff');
              handleSave();
            }}
          ></div>
          <div
            className={styles.colorSwatch}
            style={{ background: '#000' }}
            onClick={() => {
              handleBackgroundColorChange('#000000');
              handleSave();
            }}
          ></div>
          <div
            className={styles.colorSwatch}
            style={{ background: '#EEEEEE' }}
            onClick={() => {
              handleBackgroundColorChange('#EEEEEE');
              handleSave();
            }}
          ></div>
        </div>
        <div className={styles.colorInput}>
          <div
            className={styles.colorPreview}
            style={{ background: botSettings.backgroundColor }}
          ></div>
          <input type="text" value={botSettings.backgroundColor} readOnly />
        </div>
      </div>
      <div className={styles.settingsCard}>
        <h3>Customize Message</h3>
        <div className={styles.messageInputs}>
          <input
            type="text"
            value={botSettings.customizedMessages[0] || 'How can I help you?'}
            onChange={(e) => handleMessageChange(0, e.target.value)}
          />
          <input
            type="text"
            value={botSettings.customizedMessages[1] || 'What can I do for you?'}
            onChange={(e) => handleMessageChange(1, e.target.value)}
          />
        </div>
      </div>
      <IntroForm />
      <div className={styles.settingsCard}>
        <h3>Welcome Message</h3>
        <textarea
          value={botSettings.welcomeMessage}
          onChange={(e) => handleWelcomeMessageChange(e.target.value)}
        ></textarea>
        <span className={styles.charCount}>
          {botSettings.welcomeMessage.length}/50
        </span>
      </div>
      <div className={styles.settingsCard}>
        <h3>Missed Chat Timer</h3>
        <div className={styles.timerInputs}>
          <input
            type="text"
            value={botSettings.missedChatTimer.split(':')[0] || '09'}
            size="2"
            onChange={(e) => {
              const [_, m, s] = botSettings.missedChatTimer.split(':');
              handleMissedChatTimerChange(`${e.target.value}:${m}:${s}`);
            }}
          />
          :
          <input
            type="text"
            value={botSettings.missedChatTimer.split(':')[1] || '00'}
            size="2"
            onChange={(e) => {
              const [h, _, s] = botSettings.missedChatTimer.split(':');
              handleMissedChatTimerChange(`${h}:${e.target.value}:${s}`);
            }}
          />
          :
          <input
            type="text"
            value={botSettings.missedChatTimer.split(':')[2] || '00'}
            size="2"
            onChange={(e) => {
              const [h, m] = botSettings.missedChatTimer.split(':');
              handleMissedChatTimerChange(`${h}:${m}:${e.target.value}`);
            }}
          />
        </div>
      </div>
      <button className={styles.saveButton} onClick={handleSave}>
        Save
      </button>
    </aside>
  );
}

export default SettingsPanel;
import React, { useEffect, useState, useCallback } from 'react';
import styles from './SettingsPanel.module.css';
import IntroForm from './IntroForm';
import axios from 'axios';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TimerSettingsCard from '../ui/TimerSettingsCard';
import IntroSettingsCard from '../ui/IntroSettingsCard';
const token = localStorage.getItem('token');

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
  const saveSettings = (settings) => {
    const url = import.meta.env.VITE_API_URL + 'api/botSettings';
    axios
      .put(url, settings, {headers : {Authorization: `${token}`}})
      .then((response) => {
        if(response.status){
          toast.success('Settings saved successfully')
        }
        // console.log('Settings saved successfully:', response.data);
      })
      .catch((error) => {
        toast.error('Error saving settings');
        console.error('Error saving settings:', error);
      });
  };

  const debouncedSave = useDebounce((settings) => {
    saveSettings(settings);
  }, 500);

  const handleHeaderColorChange = (color) => {
    const updatedSettings = { ...botSettings, headerColor: color };
    setBotSettings(updatedSettings);
    saveSettings(updatedSettings);
  };

  const handleBackgroundColorChange = (color) => {
    const updatedSettings = { ...botSettings, backgroundColor: color };
    setBotSettings(updatedSettings);
    saveSettings(updatedSettings);
  };

  const handleMessageChange = (index, value) => {
    const updatedMessages = [...botSettings.customizedMessages];
    updatedMessages[index] = value;
    const updatedSettings = {
      ...botSettings,
      customizedMessages: updatedMessages,
    };
    setBotSettings(updatedSettings);
    debouncedSave(updatedSettings);
  };

  const handleWelcomeMessageChange = (value) => {
    const updatedSettings = {
      ...botSettings,
      welcomeMessage: value,
    };
    setBotSettings(updatedSettings);
    debouncedSave(updatedSettings);
  };

  const handleMissedChatTimerChange = (value) => {
    const updatedSettings = {
      ...botSettings,
      missedChatTimer: value,
    };
    setBotSettings(updatedSettings);
    debouncedSave(updatedSettings);
  };

  const handleSave = () => {
    saveSettings(botSettings);
  };

  return (
    <aside className={styles.settingsPanel}>

      <div className={styles.settingsCard}>
        <h3>Header Color</h3>
        <div className={styles.colorOptions}>
          <div
            className={styles.colorSwatch}
            style={{ background: '#fff', border: '1px solid #000' }}
            onClick={() => handleHeaderColorChange('#ffffff')}
          ></div>
          <div
            className={styles.colorSwatch}
            style={{ background: '#000' }}
            onClick={() => handleHeaderColorChange('#000000')}
          ></div>
          <div
            className={styles.colorSwatch}
            style={{ background: '#33475B' }}
            onClick={() => handleHeaderColorChange('#33475B')}
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

      {/* Background Color */}
      <div className={styles.settingsCard}>
        <h3>Custom Background Color</h3>
        <div className={styles.colorOptions}>
          <div
            className={styles.colorSwatch}
            style={{ background: '#fff', border: '1px solid #000' }}
            onClick={() => handleBackgroundColorChange('#ffffff')}
          ></div>
          <div
            className={styles.colorSwatch}
            style={{ background: '#000' }}
            onClick={() => handleBackgroundColorChange('#000000')}
          ></div>
          <div
            className={styles.colorSwatch}
            style={{ background: '#EEEEEE' }}
            onClick={() => handleBackgroundColorChange('#EEEEEE')}
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

      {/* Customize Messages */}
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

      {/* Intro Form */}
      <div className={styles.introCard}>
      <IntroSettingsCard botSettings={botSettings} setBotSettings={setBotSettings} debouncedSave={debouncedSave} />
      </div>

      {/* Welcome Message */}
      <div className={styles.settingsCard}>
        <h3>Welcome Message</h3>
        <div className={styles.welcomeMessageInput}>
        <textarea
          value={botSettings.welcomeMessage}
          onChange={(e) => handleWelcomeMessageChange(e.target.value)}
        ></textarea>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 9.64004V11.6667C0 11.8534 0.146667 12 0.333333 12H2.36C2.44667 12 2.53333 11.9667 2.59333 11.9L9.87333 4.62671L7.37333 2.12671L0.1 9.40004C0.0333334 9.46671 0 9.54671 0 9.64004ZM11.8067 2.69338C11.8685 2.6317 11.9175 2.55844 11.951 2.47779C11.9844 2.39714 12.0016 2.31069 12.0016 2.22338C12.0016 2.13606 11.9844 2.04961 11.951 1.96896C11.9175 1.88831 11.8685 1.81505 11.8067 1.75338L10.2467 0.193376C10.185 0.131573 10.1117 0.0825417 10.0311 0.0490874C9.95043 0.0156331 9.86398 -0.00158691 9.77667 -0.00158691C9.68935 -0.00158691 9.6029 0.0156331 9.52225 0.0490874C9.4416 0.0825417 9.36834 0.131573 9.30667 0.193376L8.08667 1.41338L10.5867 3.91338L11.8067 2.69338Z" fill="#606060"/>
</svg>

        <span className={styles.charCount}>
          {botSettings.welcomeMessage.length}/50
        </span>
        </div>
      </div>

      <TimerSettingsCard botSettings={botSettings} setBotSettings={setBotSettings}/>
      {/* <button className={styles.saveButton} onClick={handleSave}>
        Save
      </button> */}
    </aside>
  );
}

export default SettingsPanel;

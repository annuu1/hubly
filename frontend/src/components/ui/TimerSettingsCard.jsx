import React, { useEffect, useState, useCallback, useRef } from 'react';
import styles from './TimerSettingsCard.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';

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

function TimerSettingsCard({ botSettings, setBotSettings }) {
  const cardRef = useRef(null);

  const parseTime = (time) => {
    const [h, m, s] = time.split(':').map(Number);
    return { hours: h || 0, minutes: m || 0, seconds: s || 0 };
  };

  const formatTime = ({ hours, minutes, seconds }) => {
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0'),
    ].join(':');
  };

  const [time, setTime] = useState(() => parseTime(botSettings.missedChatTimer || '09:00:00'));

  const saveSettings = () => {
    const timeString = formatTime(time);
    const updatedSettings = { ...botSettings, missedChatTimer: timeString };
    setBotSettings(updatedSettings);
    const token = localStorage.getItem('token');
    const url = import.meta.env.VITE_API_URL + 'api/botSettings';
    axios
      .put(url, updatedSettings, { headers: { Authorization: `${token}` } })
      .then((response) => {
        if (response.status) {
          toast.success('Timer settings saved successfully');
        }
      })
      .catch((error) => {
        toast.error('Failed to save timer settings');
        console.error('Error saving timer settings:', error);
      });
  };

  const debouncedSave = useDebounce(saveSettings, 10);

  useEffect(() => {
    setTime(parseTime(botSettings.missedChatTimer || '09:00:00'));
  }, [botSettings.missedChatTimer]);

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      const input = e.target.closest('input');
      if (input && input.classList.contains(styles.timerInputScrollable)) {
        const field = input.dataset.field;
        const delta = e.deltaY < 0 ? 1 : -1;
        setTime((prev) => {
          let newTime = { ...prev };
          if (field === 'hours') {
            newTime.hours = Math.max(0, Math.min(23, prev.hours + delta));
          } else if (field === 'minutes') {
            newTime.minutes = Math.max(0, Math.min(59, prev.minutes + delta));
          } else if (field === 'seconds') {
            newTime.seconds = Math.max(0, Math.min(59, prev.seconds + delta));
          }
          return newTime;
        });
      }
    };

    const cardElement = cardRef.current;
    if (cardElement) {
      cardElement.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (cardElement) {
        cardElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  const topTime = {
    hours: Math.max(0, time.hours - 1),
    minutes: Math.max(0, time.minutes - 1),
    seconds: Math.max(0, time.seconds - 1),
  };
  const bottomTime = {
    hours: Math.min(23, time.hours + 1),
    minutes: Math.min(59, time.minutes + 1),
    seconds: Math.min(59, time.seconds + 1),
  };

  return (
    <div className={styles.timerSettingsCard} ref={cardRef}>
      <h3>Missed Chat Timer</h3>
      <div className={styles.timerInputs}>
        <input
          type="text"
          value={topTime.hours.toString().padStart(2, '0')}
          readOnly
          className={styles.timerInput}
        />
        <span>:</span>
        <input
          type="text"
          value={topTime.minutes.toString().padStart(2, '0')}
          readOnly
          className={styles.timerInput}
        />
        <span>:</span>
        <input
          type="text"
          value={topTime.seconds.toString().padStart(2, '0')}
          readOnly
          className={styles.timerInput}
        />
      </div>
      <div className={`${styles.timerInputs} ${styles.active}`}>
        <input
          type="text"
          value={time.hours.toString().padStart(2, '0')}
          readOnly
          data-field="hours"
          className={styles.timerInputScrollable}
        />
        <span>:</span>
        <input
          type="text"
          value={time.minutes.toString().padStart(2, '0')}
          readOnly
          data-field="minutes"
          className={styles.timerInputScrollable}
        />
        <span>:</span>
        <input
          type="text"
          value={time.seconds.toString().padStart(2, '0')}
          readOnly
          data-field="seconds"
          className={styles.timerInputScrollable}
        />
      </div>
      <div className={styles.timerInputs}>
        <input
          type="text"
          value={bottomTime.hours.toString().padStart(2, '0')}
          readOnly
          className={styles.timerInput}
        />
        <span>:</span>
        <input
          type="text"
          value={bottomTime.minutes.toString().padStart(2, '0')}
          readOnly
          className={styles.timerInput}
        />
        <span>:</span>
        <input
          type="text"
          value={bottomTime.seconds.toString().padStart(2, '0')}
          readOnly
          className={styles.timerInput}
        />
      </div>
      <button className={styles.saveButton} onClick={debouncedSave}>
        Save
      </button>
    </div>
  );
}

export default TimerSettingsCard;
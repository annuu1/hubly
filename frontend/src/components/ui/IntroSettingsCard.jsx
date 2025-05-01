import React, { useState } from "react";
import styles from "./IntroSettingsCard.module.css";
import axios from "axios";

function IntroSettingsCard({ botSettings, setBotSettings, debouncedSave }) {
  // console.log(botSettings.formPlaceholders.email)

  const handleChange = (field, value) => {
    const updatedSettings = {
      ...botSettings,
      formPlaceholders: {
        ...botSettings.formPlaceholders,
        [field]: value,
      },
    };
    setBotSettings(updatedSettings);
    debouncedSave(updatedSettings);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!setTicketId) return;
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const email = formData.get("email");
    const url = import.meta.env.VITE_API_URL + "api/tickets";
    try {
      const response = await axios.post(url, { name, phone, email });
      if (response.status === 201) {
        setTicketId(response.data.ticket._id);
        setIsTicketCreated(true);
        e.target.reset();
      } else {
        alert("Error creating ticket");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className={styles.introForm}>
      <h3>Introduce Yourself</h3>
      <div className={styles.placeHolders}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
            value={botSettings?.formPlaceholders?.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone">Your Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={botSettings?.formPlaceholders?.phone}
            placeholder="+1 (000) 000-0000"
            onChange={(e) => handleChange("phone", e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={botSettings?.formPlaceholders?.email}
            placeholder="example@gmail.com"
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Thank You!
        </button>
      </div>
    </div>
  );
}

export default IntroSettingsCard;

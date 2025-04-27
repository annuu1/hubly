import React from 'react'
import styles from "./ChatBotWindow.module.css";

function IntroForm() {

      const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get("name");
        const phone = formData.get("phone");
        const email = formData.get("email");
        const url = import.meta.env.VITE_API_URL + "api/tickets";
        try {
          const response = await axios.post(url, { name, phone, email });
          setShowIntroForm(false);
        } catch (error) {
          console.error("Error submitting form:", error);
          alert(error.response.data.message);
        }
      };
    
      
  return (
     <div className={styles.introForm}>
                  <h3>Introduce Yourself</h3>
                  <form onSubmit={handleFormSubmit}>
                    <div className={styles.formGroup}>
                      <label htmlFor="name">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="phone">Your Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="+1 (000) 000-0000"
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="email">Your Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="example@gmail.com"
                        required
                      />
                    </div>
                    <button type="submit" className={styles.submitButton}>
                      Thank You!
                    </button>
                  </form>
                </div>
  )
}

export default IntroForm
import React, {useState} from 'react'
import styles from "./IntroForm.module.css";
import axios from "axios";

function IntroForm({ticketId=null, setTicketId, botSettings}) {
  const [isTicketCreated, setIsTicketCreated] = useState(false);

      const handleFormSubmit = async (e) => {
        e.preventDefault();
        if(!setTicketId) return;
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
                  <form onSubmit={handleFormSubmit}>
                    <div className={styles.formGroup}>
                      <label htmlFor="name">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder={botSettings?.formPlaceholders?.name}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="phone">Your Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder={botSettings?.formPlaceholders?.phone}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="email">Your Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder={botSettings?.formPlaceholders?.email}
                        required
                      />
                    </div>
                    <button type="submit" className={styles.submitButton} disabled={ticketId} style={ticketId ? {backgroundColor: "#ccc", cursor: "not-allowed"} : {}}> 
                      Thank You!
                    </button>
                  </form>
                </div>
  )
}

export default IntroForm
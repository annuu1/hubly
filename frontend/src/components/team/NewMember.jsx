import React, { useState } from "react";
import styles from "./NewMember.module.css";

const NewMember = ({ setShowModal, onMemberAdded }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState({
    fullName: "",
    phone: "",
    email: "",
    role: "member",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    return (
      formValues.fullName.trim() &&
      formValues.email.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email) &&
      formValues.phone.trim()
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsSubmitting(true);
    const member = { ...formValues };
    const url = import.meta.env.VITE_API_URL + "api/users/new";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(member),
      });
      if (response.ok) {
        setFormValues({ fullName: "", phone: "", email: "", role: "member" });
        setShowModal(false);
        onMemberAdded();
      } else {
        alert("Failed to add member.");
      }
    } catch (error) {
      alert("An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setFormValues({ fullName: "", phone: "", email: "", role: "member" });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h1>Add Team members</h1>
          <p>
            Talk with colleagues in a group chat. Messages in this group are
            only visible to it's participants. New teammates may only be invited
            by the administrators.
          </p>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            <span>Full Name:</span>
            <input
              type="text"
              name="fullName"
              value={formValues.fullName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={formValues.phone}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Designation:
            <select name="role" value={formValues.role} onChange={handleInputChange}>
              <option value="member">Member</option>
            </select>
          </label>
          <div className={styles.formFooter}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={handleCancel}
              aria-label="Cancel adding a new team member"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.saveBtn}
              disabled={!isFormValid() || isSubmitting}
              aria-label="Save new team member"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewMember;
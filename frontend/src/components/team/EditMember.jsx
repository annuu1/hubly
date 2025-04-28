import React, { useState } from "react";
import styles from "./NewMember.module.css";

const EditMember = ({ setShowModal, member, onUpdate }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState({
    fullName: member.fullName,
    phone: member.phone,
    email: member.email,
    role: member.role,
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
    try {
      await onUpdate(member._id, formValues);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating member:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h1>Edit Team Member</h1>
          <p>
            Update the details of the team member. All fields are required.
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
              aria-label="Cancel editing team member"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.saveBtn}
              disabled={!isFormValid() || isSubmitting}
              aria-label="Save team member changes"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMember; 
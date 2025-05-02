import axios from 'axios';
import React, { useState } from "react";
import styles from "./NewMember.module.css";
import { toast } from "react-toastify";

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
      const token = localStorage.getItem("token");
      const response = await axios.post(url, member, {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (response.ok) {
        setFormValues({ fullName: "", phone: "", email: "", role: "member" });
        setShowModal(false);
        onMemberAdded();
        toast.success(response.data.message);
      } else {
        toast(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
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
          <h1 className={styles.formHeading}>Add Team members</h1>
          <p>
            Talk with colleagues in a group chat. Messages in this group are
            only visible to it's participants. New teammates may only be invited
            by the administrators.
          </p>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            <span>User Name:</span>
            <input
              type="text"
              name="fullName"
              placeholder="User Name"
              value={formValues.fullName}
              onChange={handleInputChange}
            />
          </label>
          <label>
          <span>Phone:</span>
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formValues.phone}
              onChange={handleInputChange}
            />
          </label>
          <label>
             <span>Email:</span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleInputChange}
            />
          </label>
          <label>
             <span>Designation:</span>
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
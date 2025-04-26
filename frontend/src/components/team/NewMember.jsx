import react from "react";
import styles from "./NewMember.module.css";

const NewMember = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const fullName = form.fullName.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const role = form.role.value;
    const member = { fullName, phone, email, role };
    const url = import.meta.env.VITE_API_URL + "/api/team/members";
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
            <input type="text" name="fullName" />
          </label>
          <label>
            Phone:
            <input type="text" name="phone" />
          </label>
          <label>
            Email:
            <input type="email" name="email" />
          </label>
          <label>
            Designation:
            <select name="role">
              {/* <option value="admin">Admin</option> */}
              <option value="member">Member</option>
            </select>
          </label>
          <div className={styles["formFooter"]}>
            <button className={styles.cancelBtn}>Cancel</button>
            <button className={styles.saveBtn}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default NewMember;

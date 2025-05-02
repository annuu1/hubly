import React, { useState, useEffect } from "react";
import styles from "./Team.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NewMember from "./NewMember";
import EditMember from "./EditMember";
import memberProfile from "../../assets/icons/memberProfile.png";

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "api/users/members"
      );
      setTeamMembers(response.data.users);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  const handleEdit = (member) => {
    setSelectedMember(member);
    setShowEditModal(true);
  };

  const handleUpdate = async (memberId, updatedData) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}api/users/members/${memberId}`,
        updatedData
      );
      fetchTeamMembers();
    } catch (error) {
      console.error("Error updating member:", error);
      throw error;
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}api/users/members/${selectedMember._id}`
      );
      setShowDeleteModal(false);
      fetchTeamMembers();
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  return (
    <div className={styles.teamContainer}>
      {/* Main Content */}
      <div className={styles.mainContent}>
        <table className={styles.teamTable}>
          <thead>
            <tr>
              <th></th>
              <th>
                Full Name{" "}
                <span className={styles.sortIcon}>
                  <svg
                    width="6"
                    height="10"
                    viewBox="0 0 6 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.5 6.5L3 9L5.5 6.5"
                      stroke="#184E7F"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M0.5 3.5L3 1L5.5 3.5"
                      stroke="#184E7F"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </th>
              <th>Phone</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member) => (
              <tr key={member._id}>
                <td style={{ textAlign: "center" }}>
                  <img
                    src={memberProfile}
                    alt="Avatar"
                    className={styles.avatar}
                  />
                </td>
                <td>{member.fullName}</td>
                <td>{member.phone}</td>
                <td>{member.email}</td>
                <td>{member.role}</td>
                {member.role === 'member' && (<td className={styles.actionIcons}>
                  <span
                    className={styles.actionIcon}
                    onClick={() => handleEdit(member)}
                  >
                    <svg
                      width="16"
                      height="18"
                      viewBox="0 0 16 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.345 12.2417L11.7967 3.79002L10.6183 2.61169L2.16667 11.0634V12.2417H3.345ZM4.03583 13.9084H0.5V10.3725L10.0292 0.843354C10.1854 0.687128 10.3974 0.599365 10.6183 0.599365C10.8393 0.599365 11.0512 0.687128 11.2075 0.843354L13.565 3.20085C13.7212 3.35713 13.809 3.56905 13.809 3.79002C13.809 4.01099 13.7212 4.22291 13.565 4.37919L4.03583 13.9084ZM0.5 15.575H15.5V17.2417H0.5V15.575Z"
                        fill="#545454"
                      />
                    </svg>
                  </span>
                  <span
                    className={styles.actionIcon}
                    onClick={() => {
                      setSelectedMember(member);
                      setShowDeleteModal(true);
                    }}
                  >
                    <svg
                      width="12"
                      height="16"
                      viewBox="0 0 12 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.00033 13.8333C1.00033 14.2754 1.17592 14.6993 1.48848 15.0118C1.80104 15.3244 2.22496 15.5 2.66699 15.5H9.33366C9.77568 15.5 10.1996 15.3244 10.5122 15.0118C10.8247 14.6993 11.0003 14.2754 11.0003 13.8333V3.83333H1.00033V13.8333ZM2.66699 5.5H9.33366V13.8333H2.66699V5.5ZM8.91699 1.33333L8.08366 0.5H3.91699L3.08366 1.33333H0.166992V3H11.8337V1.33333H8.91699Z"
                        fill="#545454"
                      />
                    </svg>
                  </span>
                </td>)}
              </tr>
            ))}
          </tbody>
        </table>
        <button className={styles.addButton} onClick={() => setShowModal(true)}>
          <span className={styles.plus}>+</span> 
          Add Team members
        </button>
      </div>
      {showModal && (
        <NewMember
          setShowModal={setShowModal}
          onMemberAdded={fetchTeamMembers}
        />
      )}
      {showEditModal && (
        <EditMember
          setShowModal={setShowEditModal}
          member={selectedMember}
          onUpdate={handleUpdate}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Delete Team Member</h3>
            <p>
              Are you sure you want to delete {selectedMember?.fullName}? This
              action cannot be undone.
            </p>
            <div className={styles.modalButtons}>
              <button
                className={styles.cancelButton}
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button className={styles.deleteButton} onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;

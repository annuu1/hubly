import React, { useState, useEffect } from 'react';
import styles from './Team.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  const navigate = useNavigate();
  const handleAddMember = () => {
    navigate('/add-member');
  };

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + 'api/users/members');
        setTeamMembers(response.data.users);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };
  
    fetchTeamMembers();
  }, []);


  return (
    <div className={styles.teamContainer}>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <table className={styles.teamTable}>
          <thead>
            <tr>
              <th>Full Name <span className={styles.sortIcon}>⬇</span></th>
              <th>Phone</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member) => (
              <tr key={member.id}>
                <td>
                  <img src="https://via.placeholder.com/30" alt="Avatar" className={styles.avatar} />
                  {member.name}
                </td>
                <td>{member.phone}</td>
                <td>{member.email}</td>
                <td>{member.role}</td>
                <td>
                  <span className={styles.actionIcon}>✂️</span>
                  <span className={styles.actionIcon}>🗑️</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className={styles.addButton} onClick={handleAddMember} >+ Add Team members</button>
      </div>
    </div>
  );
};

export default Team;
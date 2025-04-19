import React from 'react';
import styles from './Team.module.css';

const Team = () => {
  const teamMembers = [
    { id: 1, name: 'Joe Doe', phone: '+1 (000) 000-0000', email: 'example@gmail.com', role: 'Admin' },
    { id: 2, name: 'Joe Doe', phone: '+1 (000) 000-0000', email: 'example@gmail.com', role: 'Member' },
    { id: 3, name: 'Joe Doe', phone: '+1 (000) 000-0000', email: 'example@gmail.com', role: 'Member' },
    { id: 4, name: 'Joe Doe', phone: '+1 (000) 000-0000', email: 'example@gmail.com', role: 'Member' },
  ];

  return (
    <div className={styles.teamContainer}>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.teamHeader}>Team</div>
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
        <button className={styles.addButton}>+ Add Team members</button>
      </div>
    </div>
  );
};

export default Team;
import React from 'react';
import styles from './TicketList.module.css';
import avatar from '../../assets/icons/avatar.png';

const TicketList = ({ tickets, onSelect }) => {
    console.log(tickets[0])
    return (
        <ul className={styles.ticketList}>
            {tickets.length === 0 && <li>No tickets available</li>}
            {tickets.map((ticket, index) => (
                <li key={ticket.ticketId} onClick={() => onSelect(ticket)} className={styles.ticketItem}>
                    <img src={avatar} alt="Avatar" className={styles.avatar} />
                    Chat {index+1}
                </li>
            ))}
        </ul>
    );
};

export default TicketList;
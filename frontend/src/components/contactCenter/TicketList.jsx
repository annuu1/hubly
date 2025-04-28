import React, { useEffect } from 'react';
import styles from './TicketList.module.css';
import avatar from '../../assets/icons/avatar.png';

const TicketList = ({ tickets, onSelect, selectedTicket}) => {

return (
        <ul className={styles.ticketList}>
            {tickets.length === 0 && <li>No tickets available</li>}
            {tickets.map((ticket, index) => (
                <li
                key={index}
                onClick={() => onSelect(ticket)}
                className={`${styles.ticketItem} ${
                    selectedTicket && selectedTicket._id === ticket._id
                        ? styles.selected
                        : ''
                }`}
            >
                    <img src={avatar} alt="Avatar" className={styles.avatar} />
                    {ticket.name}
                </li>
            ))}
        </ul>
    );
};

export default TicketList;
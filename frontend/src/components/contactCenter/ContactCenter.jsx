import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ContactCenter.module.css';
import TicketList from './TicketList';
import Conversation from './Conversation';
import TicketDetails from './TicketDetails';

const ContactCenter = () => {
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);

    useEffect(() => {
        // Fetch tickets from the API
        const fetchTickets = async () => {
            const response = await axios.get(import.meta.env.VITE_API_URL+'api/tickets');
            const data = await response.data;
            setTickets(data);
        };
        fetchTickets();
    }, []);

    const handleTicketSelect = (ticket) => {
        setSelectedTicket(ticket);
    };

    return (
        <div className={styles["contact-center"]}>
            <div className={styles["ticket-list"]}>
                <TicketList tickets={tickets} onSelect={handleTicketSelect} />
            </div>
            <div className={styles["conversation"]}>
                {selectedTicket && <Conversation ticketId={selectedTicket._id} />}
            </div>
            <div className={styles["ticket-details"]}>
                {selectedTicket && <TicketDetails ticket={selectedTicket} />}
            </div>
        </div>
    );
};

export default ContactCenter;
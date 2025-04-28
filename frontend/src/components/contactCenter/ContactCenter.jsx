import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ContactCenter.module.css';
import TicketList from './TicketList';
import Conversation from './Conversation';
import TicketDetails from './TicketDetails';

const ContactCenter = () => {
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTickets = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No authentication token found');
                }

                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}api/tickets/assignedTickets`,
                    {
                        headers: {
                            Authorization: `${token}`,
                        },
                    }
                );

                setTickets(response.data);
                if (response.data.length > 0) {
                    setSelectedTicket(response.data[0]);
                }
            } catch (error) {
                console.error('Error fetching tickets:', error);
                setError('Failed to fetch tickets. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    const handleTicketSelect = (ticket) => {
        setSelectedTicket(ticket);
    };

    return (
        <div className={styles["contact-center"]}>
            {loading && <div>Loading tickets...</div>}
            {error && <div className={styles.error}>{error}</div>}
            {!loading && !error && (
                <>
                    <div className={styles["ticket-list"]}>
                        <TicketList tickets={tickets} onSelect={handleTicketSelect} 
                        selectedTicket={selectedTicket}
                        />
                    </div>
                    <div className={styles["conversation"]}>
                        {selectedTicket && <Conversation ticketId={selectedTicket._id} 
                        userName={selectedTicket.name} status={selectedTicket.status} />}
                    </div>
                    <div className={styles["ticket-details"]}>
                        {selectedTicket && <TicketDetails ticket={selectedTicket} />}
                    </div>
                </>
            )}
        </div>
    );
};

export default ContactCenter;
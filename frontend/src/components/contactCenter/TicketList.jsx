import React from 'react';

const TicketList = ({ tickets, onSelect }) => {
    console.log(tickets[0])
    return (
        <ul>
            {tickets.map((ticket, index) => (
                <li key={ticket.ticketId} onClick={() => onSelect(ticket)}>
                    Chat {index+1}
                </li>
            ))}
        </ul>
    );
};

export default TicketList;
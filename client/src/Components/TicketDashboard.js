import React, { useState, useEffect } from 'react';
import style from '../StyleSheets/TicketDashboard.module.css';

export default function TicketDashboard() {
  // Define state variables to store ticket data, selected ticket, search/filter values, and the "Open" filter state.
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [showOpenTickets, setShowOpenTickets] = useState(false);

  // Function to fetch tickets when the component mounts.
  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await fetch('/tickets');
      if (response.ok) {
        const data = await response.json();
        setTickets(data);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  // make sure that the selected ticket is cleared if it is filtered out
  useEffect(() => {
    if (selectedTicket) {
      const shouldClearSelectedTicket =
        (filterTag && selectedTicket.tag.name !== filterTag) ||
        (showOpenTickets && selectedTicket.is_resolved) ||
        (!selectedTicket.body.toLowerCase().includes(searchText.toLowerCase()) 
        && !selectedTicket.subject.toLowerCase().includes(searchText.toLowerCase())
        && !selectedTicket.version?.release.toLowerCase().includes(searchText.toLowerCase()));
  
      if (shouldClearSelectedTicket) {
        setSelectedTicket(null);
      }
    }
  }, [searchText, selectedTicket, filterTag, showOpenTickets]);
  

  // Function to handle selecting a ticket.
  const handleTicketSelect = (ticket) => {
    setSelectedTicket(ticket);
  };

  // Function to handle filtering by tag.
  const handleFilterByTag = (tag) => {
    if (tag !== filterTag) {
      setFilterTag(tag);
    } else {
      setFilterTag(null);
    }
  };

  // Function to toggle the "Open" filter.
  const handleFilterOpenTickets = () => {
    setShowOpenTickets(!showOpenTickets);
  };

  const handleToggleResolved = async (ticketId) => {
    const isResolved = !selectedTicket.is_resolved;
  
    try {
      const response = await fetch(`/tickets/${ticketId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_resolved: isResolved }),
      });
  
      if (response.ok) {
        setTickets((prevTickets) => {
          return prevTickets.map((ticket) =>
            ticket.id === ticketId ? { ...ticket, is_resolved: isResolved } : ticket
          );
        });
        setSelectedTicket({
            ...selectedTicket,
            is_resolved: isResolved,
          });
      } else {
        console.error('Error updating ticket');
      }
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };
  
  const filteredTickets = tickets.filter((ticket) => {
    return (
      (ticket.body.toLowerCase().includes(searchText.toLowerCase()) || ticket.subject.toLowerCase().includes(searchText.toLowerCase()) || ticket.version?.release.toLowerCase().includes(searchText.toLowerCase())) &&
      (!filterTag || ticket.tag.name === filterTag) &&
      (!showOpenTickets || !ticket.is_resolved)
    );
  });

  const filterOptions = ['Support', 'Feedback', 'Bug Report', 'Feature Request', 'Other']; // Add more options as needed


  return (
    <div className={style.ticket_dashboard}>
      <div className={style.top_panel}>
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          className={style.search_field}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className={style.filter_buttons}>
          {filterOptions.map((option) => (
            <button
              key={option}
              className={filterTag === option ? style.selected_tag : null}
              onClick={() => handleFilterByTag(option)}
            >
              {option}
            </button>
          ))}
          <button className={showOpenTickets ? style.selected_tag : style.show_open_button} onClick={handleFilterOpenTickets}>Unresolved</button>
        </div>
      </div>
    <div className={style.tickets_container}>
      <div className={style.sidebar}>
      <h2>Tickets</h2>
        <ul>
          {filteredTickets.map((ticket) => (
            <li
              key={ticket.id}
              onClick={() => handleTicketSelect(ticket)}
              className={`${style.tab_formatting} ${!ticket?.is_resolved ? style.indicate_open : style.indicate_closed} ${(selectedTicket?.id === ticket?.id) && ticket.is_resolved ? style.selected_ticket_resolved : ''} ${(selectedTicket?.id === ticket?.id) && !ticket?.is_resolved ? style.selected_ticket_unresolved : ''}`}
            >
              <h4 className={style.tab_subject_line}>{ticket.subject}</h4>
              <p className={style.tab_body_line}>{ticket.body}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className={style.ticket_details}>
        {selectedTicket ? (
          <>
            <div className={style.details_header}>
                <div className={style.header_top}>
                    <h3>{selectedTicket.subject}</h3>
                        <div className={style.resolved_button_container}>
                            Resolved:
                            <input
                                type="checkbox"
                                checked={selectedTicket.is_resolved}
                                onChange={() => handleToggleResolved(selectedTicket.id)}
                                className={style.is_resolved_button}
                            />
                        </div>
                </div>
                <p><span>{selectedTicket.tag.name}</span> from <span>{selectedTicket.user.username}</span> on v <span onClick={() => alert(selectedTicket.version?.notes)}>{selectedTicket?.version?.release ? selectedTicket?.version?.release : 'release unspecified' }</span>, contact: <span>{selectedTicket.user.email}</span></p>
            </div>
            <p className={style.ticket_body}>{selectedTicket.body}</p>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
    </div>
  );
}

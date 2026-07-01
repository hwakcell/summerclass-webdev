import { createContext, useEffect, useState } from 'react';

export const TicketContext = createContext();

const defaultTickets = [
  {
    id: 1,
    name: 'Aisha Khan',
    email: 'aisha@example.com',
    subject: 'Unable to login',
    description: 'I get an error when I try to sign in with my email.',
    priority: 'High',
    status: 'Open',
    createdAt: '2026-07-01',
  },
  {
    id: 2,
    name: 'Luis Carter',
    email: 'luis@example.com',
    subject: 'Billing question',
    description: 'I need help with my latest invoice and charge.',
    priority: 'Medium',
    status: 'Open',
    createdAt: '2026-06-30',
  },
];

export function TicketProvider({ children }) {
  const [tickets, setTickets] = useState(() => {
    const saved = window.localStorage.getItem('customer-tickets');
    return saved ? JSON.parse(saved) : defaultTickets;
  });

  const [activeView, setActiveView] = useState('list');
  const [query, setQuery] = useState('');
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    description: '',
    priority: 'Low',
  });

  useEffect(() => {
    window.localStorage.setItem('customer-tickets', JSON.stringify(tickets));
  }, [tickets]);

  const filteredTickets = tickets.filter((ticket) => {
    const text = `${ticket.name} ${ticket.email} ${ticket.subject} ${ticket.description} ${ticket.status} ${ticket.priority}`.toLowerCase();
    return text.includes(query.toLowerCase());
  });

  const handleFormChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmitTicket = (event) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.description) {
      return;
    }

    const nextId = tickets.length > 0 ? Math.max(...tickets.map((ticket) => ticket.id)) + 1 : 1;
    const newTicket = {
      id: nextId,
      name: form.name,
      email: form.email,
      subject: form.subject,
      description: form.description,
      priority: form.priority,
      status: 'Open',
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setTickets([newTicket, ...tickets]);
    setForm({ name: '', email: '', subject: '', description: '', priority: 'Low' });
    setActiveView('list');
    setSelectedTicketId(newTicket.id);
  };

  const handleCloseTicket = (ticketId) => {
    setTickets(
      tickets.map((ticket) => {
        if (ticket.id === ticketId) {
          return { ...ticket, status: 'Closed' };
        }
        return ticket;
      })
    );
  };

  const selectedTicket = tickets.find((ticket) => ticket.id === selectedTicketId);

  return (
    <TicketContext.Provider
      value={{
        tickets,
        activeView,
        setActiveView,
        query,
        setQuery,
        filteredTickets,
        selectedTicket,
        selectedTicketId,
        setSelectedTicketId,
        form,
        handleFormChange,
        handleSubmitTicket,
        handleCloseTicket,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}

import { useEffect, useState } from 'react';
import TicketList from './components/TicketList';
import TicketForm from './components/TicketForm';
import TicketDetails from './components/TicketDetails';
import TicketSummary from './components/TicketSummary';

const defaultTickets = [
  {
    id: 1,
    subject: 'Unable to login',
    description: 'I get an error when I try to sign in with my email.',
    category: 'Authentication',
    priority: 'High',
    status: 'Open',
    comments: [
      { id: 1, text: 'Please try resetting your password first.', createdAt: '2026-07-01' },
    ],
    createdAt: '2026-07-01',
  },
  {
    id: 2,
    subject: 'Billing question',
    description: 'I need help with my latest invoice and charge.',
    category: 'Billing',
    priority: 'Medium',
    status: 'In Progress',
    comments: [],
    createdAt: '2026-06-30',
  },
];

function App() {
  const [tickets, setTickets] = useState(() => {
    const saved = window.localStorage.getItem('customer-tickets');
    return saved ? JSON.parse(saved) : defaultTickets;
  });
  const [activeView, setActiveView] = useState('list');
  const [query, setQuery] = useState('');
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [form, setForm] = useState({
    subject: '',
    description: '',
    category: 'General',
    priority: 'Low',
  });
  const [counts, setCounts] = useState({ open: 0, inProgress: 0, resolved: 0 });

  useEffect(() => {
    window.localStorage.setItem('customer-tickets', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    const open = tickets.filter((ticket) => ticket.status === 'Open').length;
    const inProgress = tickets.filter((ticket) => ticket.status === 'In Progress').length;
    const resolved = tickets.filter((ticket) => ticket.status === 'Resolved').length;
    setCounts({ open, inProgress, resolved });
  }, [tickets]);

  const filteredTickets = tickets.filter((ticket) => {
    const text = `${ticket.subject} ${ticket.description} ${ticket.category} ${ticket.status} ${ticket.priority}`.toLowerCase();
    return text.includes(query.toLowerCase());
  });

  const handleFormChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmitTicket = (event) => {
    event.preventDefault();
    if (!form.subject || !form.description) {
      return;
    }

    const nextId = tickets.length > 0 ? Math.max(...tickets.map((ticket) => ticket.id)) + 1 : 1;
    const newTicket = {
      id: nextId,
      subject: form.subject,
      description: form.description,
      category: form.category,
      priority: form.priority,
      status: 'Open',
      comments: [],
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setTickets([newTicket, ...tickets]);
    setForm({ subject: '', description: '', category: 'General', priority: 'Low' });
    setActiveView('list');
    setSelectedTicketId(newTicket.id);
  };

  const handleAddComment = (ticketId, text) => {
    if (!text.trim()) return;

    setTickets(
      tickets.map((ticket) => {
        if (ticket.id === ticketId) {
          return {
            ...ticket,
            comments: [
              ...ticket.comments,
              { id: ticket.comments.length + 1, text: text.trim(), createdAt: new Date().toISOString().slice(0, 10) },
            ],
          };
        }
        return ticket;
      })
    );
  };

  const handleStatusChange = (ticketId, status) => {
    setTickets(
      tickets.map((ticket) => {
        if (ticket.id === ticketId) {
          return { ...ticket, status };
        }
        return ticket;
      })
    );
  };

  const selectedTicket = tickets.find((ticket) => ticket.id === selectedTicketId);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 rounded-3xl bg-slate-900 p-8 text-white shadow-xl sm:p-10">
          <h1 className="text-3xl font-semibold">Customer Ticketing Portal</h1>
          <p className="mt-3 text-slate-300">Create and manage support tickets with a beginner-friendly React interface.</p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
          <main className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Menu</p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <button
                      type="button"
                      className={`rounded-full px-4 py-2 text-sm font-medium ${
                        activeView === 'list' ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-slate-50 text-slate-700'
                      }`}
                      onClick={() => setActiveView('list')}
                    >
                      Ticket List
                    </button>
                    <button
                      type="button"
                      className={`rounded-full px-4 py-2 text-sm font-medium ${
                        activeView === 'create' ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-slate-50 text-slate-700'
                      }`}
                      onClick={() => setActiveView('create')}
                    >
                      Create Ticket
                    </button>
                    <button
                      type="button"
                      className={`rounded-full px-4 py-2 text-sm font-medium ${
                        activeView === 'faq' ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-slate-50 text-slate-700'
                      }`}
                      onClick={() => setActiveView('faq')}
                    >
                      Help
                    </button>
                  </div>
                </div>

                <div className="w-full max-w-sm">
                  <label className="block text-sm font-medium text-slate-600">Search tickets</label>
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search by subject, category, or status"
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
                  />
                </div>
              </div>
            </div>

            {activeView === 'list' && (
              <TicketList tickets={filteredTickets} onViewTicket={setSelectedTicketId} />
            )}
            {activeView === 'create' && (
              <TicketForm form={form} onChange={handleFormChange} onSubmit={handleSubmitTicket} />
            )}
            {activeView === 'faq' && (
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">Help</h2>
                <div className="mt-4 space-y-4 text-sm text-slate-600">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="font-semibold text-slate-900">How do I add a ticket?</p>
                    <p className="mt-2">Go to Create Ticket, fill the form, and click Submit.</p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="font-semibold text-slate-900">How can I search?</p>
                    <p className="mt-2">Type in the search field to filter the ticket list.</p>
                  </div>
                </div>
              </div>
            )}
          </main>

          <aside className="space-y-6">
            <TicketDetails
              ticket={selectedTicket}
              onAddComment={handleAddComment}
              onChangeStatus={handleStatusChange}
            />
            <TicketSummary counts={counts} />
          </aside>
        </div>
      </div>
    </div>
  );
}

export default App;


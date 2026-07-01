import TicketCard from './TicketCard';

export default function TicketList({ tickets, onViewTicket }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900">Tickets</h2>
      {tickets.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center text-slate-600">
          No matching tickets found.
        </div>
      ) : (
        tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} onView={onViewTicket} />
        ))
      )}
    </div>
  );
}

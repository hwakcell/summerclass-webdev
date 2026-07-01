export default function TicketCard({ ticket, onView }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-slate-900">{ticket.subject}</p>
          <p className="text-sm text-slate-500">#{ticket.id} • {ticket.status} • {ticket.priority}</p>
        </div>
        <button
          type="button"
          className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-700"
          onClick={() => onView(ticket.id)}
        >
          View
        </button>
      </div>
      <p className="mt-4 text-sm text-slate-600">{ticket.description}</p>
    </div>
  );
}

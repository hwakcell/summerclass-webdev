import { useState } from 'react';

export default function TicketDetails({ ticket, onAddComment, onChangeStatus }) {
  const [comment, setComment] = useState('');

  if (!ticket) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Ticket details</h2>
        <div className="mt-5 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-600">
          Select a ticket to see the details.
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Ticket details</h2>
      <div className="mt-5 space-y-4 text-slate-600">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <p className="font-semibold text-slate-900">{ticket.subject}</p>
          <p className="text-sm text-slate-500">Ticket #{ticket.id}</p>
          <p className="mt-3">{ticket.description}</p>
          <p className="mt-3 text-sm">Category: {ticket.category}</p>
          <p className="text-sm">Priority: {ticket.priority}</p>
          <p className="text-sm">Status: {ticket.status}</p>
          <p className="text-sm">Created: {ticket.createdAt}</p>
        </div>

        <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900">Comments</p>
            <select
              value={ticket.status}
              onChange={(event) => onChangeStatus(ticket.id, event.target.value)}
              className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
            >
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>

          {ticket.comments.length === 0 ? (
            <p className="text-sm text-slate-500">No comments yet.</p>
          ) : (
            <div className="space-y-3">
              {ticket.comments.map((commentItem) => (
                <div key={commentItem.id} className="rounded-3xl bg-white p-3 shadow-sm">
                  <p className="text-sm text-slate-800">{commentItem.text}</p>
                  <p className="mt-1 text-xs text-slate-500">{commentItem.createdAt}</p>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-3">
            <textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              rows={3}
              className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900"
              placeholder="Add a comment"
            />
            <button
              type="button"
              onClick={() => {
                onAddComment(ticket.id, comment);
                setComment('');
              }}
              className="w-full rounded-3xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Add comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

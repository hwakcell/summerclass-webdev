export default function TicketForm({ form, onChange, onSubmit }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Create ticket</h2>
      <form onSubmit={onSubmit} className="mt-5 space-y-4">
        <label className="block text-sm font-medium text-slate-700">
          Subject
          <input
            value={form.subject}
            onChange={(event) => onChange('subject', event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            placeholder="Issue title"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Description
          <textarea
            value={form.description}
            onChange={(event) => onChange('description', event.target.value)}
            rows={5}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            placeholder="Describe the problem in detail"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Category
          <select
            value={form.category}
            onChange={(event) => onChange('category', event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
          >
            <option>General</option>
            <option>Authentication</option>
            <option>Billing</option>
            <option>Technical</option>
          </select>
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Priority
          <select
            value={form.priority}
            onChange={(event) => onChange('priority', event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </label>

        <button type="submit" className="rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700">
          Submit ticket
        </button>
      </form>
    </div>
  );
}

export default function TicketSummary({ counts }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Summary</h2>
      <div className="mt-4 space-y-3 text-slate-600">
        <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-3">
          <span>Open</span>
          <span className="font-semibold text-emerald-700">{counts.open}</span>
        </div>
        <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-3">
          <span>In progress</span>
          <span className="font-semibold text-sky-700">{counts.inProgress}</span>
        </div>
        <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-3">
          <span>Resolved</span>
          <span className="font-semibold text-slate-900">{counts.resolved}</span>
        </div>
      </div>
    </div>
  );
}

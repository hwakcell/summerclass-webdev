export default function Panel({ title, children }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      {title ? <h2 className="text-xl font-semibold text-slate-900">{title}</h2> : null}
      <div className="mt-5 text-slate-600">{children}</div>
    </div>
  );
}

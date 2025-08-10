export default function Field({label, hint, children}:{label:string; hint?:string; children:React.ReactNode}) {
  return (
    <label className="block mb-3">
      <div className="mb-1 text-sm font-medium text-text">{label}</div>
      {children}
      {hint && <div className="mt-1 text-xs text-text-muted">{hint}</div>}
    </label>
  );
}

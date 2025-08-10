export default function Card({title, actions, children}:{title?:string; actions?:React.ReactNode; children:React.ReactNode}) {
  return (
    <section className="card p-5">
      {(title || actions) && (
        <header className="mb-3 flex items-center justify-between">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          <div className="flex gap-2">{actions}</div>
        </header>
      )}
      {children}
    </section>
  );
}

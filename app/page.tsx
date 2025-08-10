"use client";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_300px_at_30%_-20%,rgba(124,92,255,.25),transparent)]"></div>
        <div className="container-page py-20 md:py-28">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-semibold leading-[1.05] tracking-tight">
              File smarter FOIA/FOIL. <span className="text-brand">Track with ease.</span>
            </h1>
            <p className="mt-4 text-lg text-text-soft">
              FOIATrack drafts requests with AI, keeps them private by default, and gives you a clean pipeline made for businesses, journalists, and curious citizens.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="/dashboard" className="btn btn-primary no-underline">Open dashboard</Link>
              <Link href="/requests/new" className="btn btn-ghost no-underline">Draft a request</Link>
            </div>
            <div className="mt-4 text-xs text-text-muted">
              No public posting. You decide when and what to share.
            </div>
          </div>
        </div>
      </section>

      <section className="container-page grid gap-6 md:grid-cols-3">
        {[
          {title:"Compliance & controls",body:"Private by default, optional org spaces, audit-friendly timelines, exportable archives."},
          {title:"AI that doesn’t overreach",body:"Universal State Assist drafts from *your* inputs and won’t invent deadlines or rules."},
          {title:"Built for teams",body:"Business users and newsrooms get aliases, tracking, and templated workflows."}
        ].map((f)=>(
          <div key={f.title} className="card p-5">
            <div className="text-sm font-medium text-brand">{f.title}</div>
            <div className="mt-2 text-sm text-text-soft">{f.body}</div>
          </div>
        ))}
      </section>
    </main>
  );
}

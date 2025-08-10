"use client";
import { useState } from "react";
import Field from "@/components/ui/Field";
import Button from "@/components/ui/Button";

export default function NewRequest() {
  const [form, setForm] = useState({
    title: "", agencyName: "", records: "",
    lawName: "", statuteCitation: "", appealAuthority: "", appealWindow: "",
    private: true, dontAssertRules: true
  });
  const [busy, setBusy] = useState(false);

  async function draft() {
    setBusy(true);
    try {
      const r = await fetch("/api/proxy/ai/draft", {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({
          title: form.title || "Public records request",
          records: form.records,
          lawName: form.lawName,
          statuteCitation: form.statuteCitation,
          appealAuthority: form.appealAuthority,
          appealWindow: form.appealWindow,
          dontAssertRules: form.dontAssertRules
        })
      }).then(r=>r.json());
      setForm(prev=>({ ...prev, records: `${prev.records}\n\n${r.text || ""}` }));
    } finally { setBusy(false); }
  }

  async function save() {
    setBusy(true);
    try {
      await fetch("/api/proxy/requests", {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({
          title: form.title, body: form.records, agencyName: form.agencyName,
          delivery: "proxy", private: form.private,
          appealType: "Public Records", appealWindow: form.appealWindow, appealTarget: form.appealAuthority
        })
      });
      window.location.href = "/dashboard";
    } finally { setBusy(false); }
  }

  return (
    <main className="container-page py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Draft a new request</h1>
        <p className="text-text-muted text-sm">Clear, modern, and private by default.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <section className="card p-5">
          <Field label="What are you asking for? (title)">
            <input className="input" aria-label="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} placeholder="Emails about X program (Jan–Mar 2024)" />
          </Field>
          <Field label="Agency">
            <input className="input" aria-label="Agency" value={form.agencyName} onChange={e=>setForm({...form, agencyName:e.target.value})} placeholder="Start typing…" />
          </Field>
          <Field label="Describe the records">
            <textarea className="textarea" aria-label="Records description" value={form.records} onChange={e=>setForm({...form, records:e.target.value})} placeholder="Subject, date ranges, custodians, formats…" />
          </Field>
          <div className="flex gap-2">
            <Button onClick={draft} disabled={busy}>Suggest phrasing with AI</Button>
            <Button variant="ghost" onClick={save} disabled={busy}>Create request</Button>
          </div>
        </section>

        <section className="card p-5">
          <div className="text-sm font-medium mb-3">Universal State Assist (optional)</div>
          <div className="grid gap-3">
            <input className="input" placeholder="Law name" value={form.lawName} onChange={e=>setForm({...form, lawName:e.target.value})}/>
            <input className="input" placeholder="Statute citation" value={form.statuteCitation} onChange={e=>setForm({...form, statuteCitation:e.target.value})}/>
            <input className="input" placeholder="Appeal authority" value={form.appealAuthority} onChange={e=>setForm({...form, appealAuthority:e.target.value})}/>
            <input className="input" placeholder="Appeal window" value={form.appealWindow} onChange={e=>setForm({...form, appealWindow:e.target.value})}/>
            <label className="inline-flex items-center gap-2 text-sm text-text-soft">
              <input type="checkbox" className="rounded border-white/20 bg-white/5" checked={form.dontAssertRules} onChange={e=>setForm({...form, dontAssertRules:e.target.checked})}/>
              Don’t assert deadlines/fee rules unless I provide them
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-text-soft">
              <input type="checkbox" className="rounded border-white/20 bg-white/5" checked={form.private} onChange={e=>setForm({...form, private:e.target.checked})}/>
              Keep this request private (recommended)
            </label>
          </div>
        </section>
      </div>
    </main>
  );
}

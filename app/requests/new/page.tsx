"use client";
import { useState } from "react";
import { apiFetch } from "@/lib/api";
export default function NewRequest() {
  const [form, setForm] = useState({
    title: "", agencyName: "", records: "", delivery: "proxy",
    lawName: "", statuteCitation: "", appealAuthority: "", appealWindow: "", dontAssertRules: true, private: true
  });

  async function draft() {
    const r = await apiFetch("/ai/draft", {
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
  }

  async function save() {
    await apiFetch("/requests", {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({
        title: form.title, body: form.records, agencyName: form.agencyName,
        delivery: form.delivery, private: form.private,
        appealType: "Public Records", appealWindow: form.appealWindow, appealTarget: form.appealAuthority
      })
    });
    window.location.href = "/dashboard";
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Draft a new request</h1>
      <label className="block mb-3"><div className="text-sm font-medium">Title</div>
        <input className="w-full border rounded p-2" value={form.title} onChange={e=>setForm({...form, title:e.target.value})}/></label>
      <label className="block mb-3"><div className="text-sm font-medium">Agency</div>
        <input className="w-full border rounded p-2" value={form.agencyName} onChange={e=>setForm({...form, agencyName:e.target.value})}/></label>
      <label className="block mb-3"><div className="text-sm font-medium">Describe records</div>
        <textarea className="w-full border rounded p-2 h-40" value={form.records} onChange={e=>setForm({...form, records:e.target.value})}/></label>
      <details className="mb-3"><summary className="cursor-pointer">Universal State Assist (optional)</summary>
        <div className="grid gap-2 mt-2">
          <input className="border rounded p-2" placeholder="Law name" value={form.lawName} onChange={e=>setForm({...form, lawName:e.target.value})}/>
          <input className="border rounded p-2" placeholder="Statute citation" value={form.statuteCitation} onChange={e=>setForm({...form, statuteCitation:e.target.value})}/>
          <input className="border rounded p-2" placeholder="Appeal authority" value={form.appealAuthority} onChange={e=>setForm({...form, appealAuthority:e.target.value})}/>
          <input className="border rounded p-2" placeholder="Appeal window" value={form.appealWindow} onChange={e=>setForm({...form, appealWindow:e.target.value})}/>
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.dontAssertRules} onChange={e=>setForm({...form, dontAssertRules:e.target.checked})}/> Don’t assert deadlines/fee rules unless I provide them
          </label>
        </div>
      </details>
      <div className="flex gap-2">
        <button className="border rounded px-3 py-2" onClick={draft}>Suggest phrasing with AI</button>
        <button className="border rounded px-3 py-2" onClick={save}>Create request</button>
      </div>
    </main>
  );
}

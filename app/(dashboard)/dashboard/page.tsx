"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export default function Dashboard() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(()=> { apiFetch("/requests").then(r=>r.json()).then(setItems).catch(()=>setItems([])); }, []);
  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Your pipeline</h1>
        <a className="border rounded px-3 py-2" href="/requests/new">+ New</a>
      </div>
      <ul className="space-y-3">
        {items.map((r)=> (
          <li key={r.id} className="border rounded p-3">
            <div className="font-medium">{r.title}</div>
            <div className="text-xs text-gray-600">{r.agency?.name || "No agency"} • Status: {r.status}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}

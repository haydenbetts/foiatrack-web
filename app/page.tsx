"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <main className="p-8">
      {!session ? (
        <div>
          <h1 className="text-2xl font-semibold">FOIATrack</h1>
          <p className="text-gray-600 mb-4">Private-by-default FOIA/FOIL tracker with AI drafting.</p>
          <button onClick={()=>signIn("email")} className="border rounded px-3 py-2">Sign in with email</button>
        </div>
      ) : (
        <div>
          <p className="mb-2">Signed in as {session.user?.email}</p>
          <a className="underline" href="/dashboard">Go to Dashboard</a>
          <div><button className="mt-4 border rounded px-3 py-2" onClick={()=>signOut()}>Sign out</button></div>
        </div>
      )}
    </main>
  );
}

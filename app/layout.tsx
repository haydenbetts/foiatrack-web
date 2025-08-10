import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "FOIATrack — Write + track FOIA/FOIL with AI",
  description: "Private-by-default records requests for teams, reporters, and citizens."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-50 border-b border-white/5 backdrop-blur bg-[var(--bg)]/70">
          <div className="container-page flex h-14 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 no-underline">
              <div className="h-6 w-6 rounded-lg bg-brand"></div>
              <span className="font-semibold tracking-tight">FOIATrack</span>
              <span className="chip">Private by default</span>
            </Link>
            <nav className="flex items-center gap-2">
              <Link className="btn btn-ghost no-underline" href="/dashboard">Dashboard</Link>
              <Link className="btn btn-ghost no-underline" href="/requests/new">New request</Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="container-page py-12 text-xs text-text-muted">
          <div className="border-t border-white/5 pt-6">© {new Date().getFullYear()} FOIATrack</div>
        </footer>
      </body>
    </html>
  );
}

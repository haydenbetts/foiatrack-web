import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/options";
import { SignJWT } from "jose";

const API = process.env.NEXT_PUBLIC_API_URL!;

async function sign(email: string) {
  const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "dev");
  return new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10m")
    .sign(secret);
}

/** Extract the catch-all tail after /api/proxy/ from the request URL */
function extractSegments(req: NextRequest): string[] {
  const pathname = req.nextUrl?.pathname ?? new URL(req.url).pathname;
  const marker = "/api/proxy/";
  const i = pathname.indexOf(marker);
  const tail = i >= 0 ? pathname.slice(i + marker.length) : "";
  return tail ? tail.split("/").map(decodeURIComponent) : [];
}

async function forward(req: NextRequest): Promise<Response> {
  const segments = extractSegments(req);
  const session = await getServerSession(authOptions);
  const email = (session?.user?.email as string) || "demo@foiatrack.app";
  const token = await sign(email);

  const url = `${API}/${segments.join("/")}`;
  const init: RequestInit = {
    method: req.method,
    headers: {
      "content-type": req.headers.get("content-type") ?? "",
      "authorization": `Bearer ${token}`
    },
    // Next 15 requires explicit cache for dynamic fetches unless you set elsewhere
    cache: "no-store"
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = await req.text();
  }

  const r = await fetch(url, init);
  const body = await r.text();
  return new NextResponse(body, {
    status: r.status,
    headers: { "content-type": r.headers.get("content-type") ?? "application/json" }
  });
}

export async function GET(req: NextRequest) { return forward(req); }
export async function POST(req: NextRequest) { return forward(req); }
export async function PUT(req: NextRequest) { return forward(req); }
export async function PATCH(req: NextRequest) { return forward(req); }
export async function DELETE(req: NextRequest) { return forward(req); }

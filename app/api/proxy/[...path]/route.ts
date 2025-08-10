import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/options";
import { SignJWT } from "jose";

// Use the service URL (Docker) or env you set
const API = process.env.NEXT_PUBLIC_API_URL!;

async function sign(email: string) {
  const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "dev");
  return new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10m")
    .sign(secret);
}

type Ctx = { params: { path: string[] } };

async function handle(req: Request, { params }: Ctx): Promise<Response> {
  const session = await getServerSession(authOptions);
  const email = (session?.user?.email as string) || "demo@foiatrack.app";
  const token = await sign(email);

  const url = `${API}/${params.path.join("/")}`;
  const init: RequestInit = {
    method: req.method,
    headers: {
      "content-type": req.headers.get("content-type") ?? "",
      "authorization": `Bearer ${token}`
    }
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

export async function GET(req: Request, ctx: Ctx) { return handle(req, ctx); }
export async function POST(req: Request, ctx: Ctx) { return handle(req, ctx); }
export async function PUT(req: Request, ctx: Ctx) { return handle(req, ctx); }
export async function PATCH(req: Request, ctx: Ctx) { return handle(req, ctx); }
export async function DELETE(req: Request, ctx: Ctx) { return handle(req, ctx); }

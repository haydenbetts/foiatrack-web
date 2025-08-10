import { NextRequest, NextResponse } from "next/server";
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

async function proxyHandler(req: NextRequest, { params }: { params: { path: string[] } }) {
  const session = await getServerSession(authOptions);
  const email = (session?.user?.email as string) || "demo@foiatrack.app";
  const token = await sign(email);

  const url = `${API}/${params.path.join("/")}`;
  const init: RequestInit = {
    method: req.method,
    headers: {
      "content-type": req.headers.get("content-type") || "",
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
    headers: { "content-type": r.headers.get("content-type") || "application/json" }
  });
}

export { proxyHandler as GET, proxyHandler as POST, proxyHandler as PUT, proxyHandler as PATCH, proxyHandler as DELETE };

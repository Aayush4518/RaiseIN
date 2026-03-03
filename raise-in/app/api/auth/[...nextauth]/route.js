// app/api/auth/[...nextauth]/route.js
import { authOptions } from "@/lib/auth";
import { authRateLimit } from "@/lib/ratelimit";
import { NextResponse } from "next/server";

async function handle(req) {
  const ip =
    req.headers.get("x-forwarded-for") || req.socket?.remoteAddress || "anonymous";

  // Rate limit check
  const { success } = await authRateLimit.limit(ip);
  if (!success) {
    return new NextResponse(JSON.stringify({ error: "Too many requests" }), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Dynamically import NextAuth for App Router
  const { default: NextAuth } = await import("next-auth/next");

  // Call NextAuth with the request and options
  return NextAuth({ req, options: authOptions });
}

// Export for GET and POST
export async function GET(req) {
  return handle(req);
}

export async function POST(req) {
  return handle(req);
}
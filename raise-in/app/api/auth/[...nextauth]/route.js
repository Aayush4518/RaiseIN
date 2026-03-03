import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';
import { authRateLimit } from '@/lib/ratelimit';

// create reusable NextAuth handler once with options
const nextAuthHandler = NextAuth(authOptions);

// common processing logic for both GET and POST
async function handle(req, context) {
  const ip =
    req.headers.get('x-forwarded-for') || req.socket?.remoteAddress ||
    'anonymous';

  const { success } = await authRateLimit.limit(ip);
  if (!success) {
    return new Response(JSON.stringify({ error: 'Too many requests' }), {
      status: 429,
    });
  }

  // forward the request and context so NextAuth treats it as an App Router call
  return nextAuthHandler(req, context);
}

export async function GET(req, context) {
  return handle(req, context);
}

export async function POST(req, context) {
  return handle(req, context);
}
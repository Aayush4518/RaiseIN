import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';
import { authRateLimit } from '@/lib/ratelimit';

// create reusable NextAuth handler once with options
const nextAuthHandler = NextAuth(authOptions);

// common processing logic for both GET and POST
async function handle(req, context) {
  // debugging help: log method + url/query so we can inspect callback flows
  try {
    const url = req.nextUrl ? req.nextUrl.href : req.url;
    const query = req.nextUrl ? req.nextUrl.searchParams.toString() : new URL(req.url).search;
    console.log('Auth route:', req.method, url, 'query', query, 'params', context?.params);
  } catch {}
  const ip =
    req.headers.get('x-forwarded-for') || req.socket?.remoteAddress ||
    'anonymous';

  // don't throttle the actual OAuth callback itself or the internal
  // logging endpoint NextAuth uses.  Failing either one will surface an
  // `error=Callback` back to the browser or spam the console with 429s.
  // We'll only apply the window for other actions (sign-in page, sign-out,
  // etc).
  const path = req.nextUrl ? req.nextUrl.pathname : new URL(req.url).pathname;
  if (!path.includes('/callback') && !path.includes('/_log')) {
    const { success } = await authRateLimit.limit(ip);
    if (!success) {
      console.warn('auth rate limit exceeded for', ip);
      return new Response(JSON.stringify({ error: 'Too many requests' }), {
        status: 429,
      });
    }
  }

  // forward the request and context so NextAuth treats it as an App Router call
  try {
    return await nextAuthHandler(req, context);
  } catch (err) {
    // log to server logs for debugging; this is expensive but helps
    // diagnose why callbacks fail in production.
    console.error('NextAuth handler error:', err);

    // certain adapter/network issues are transient (SSL handshake,
    // timeouts, etc) and should not block the OAuth callback from
    // completing.  If we return a 500 the client will be redirected back
    // with `error=Callback` which makes the flow useless.  Instead we'll
    // swallow the error and return a generic 200; the user can retry
    // signing in and our wrapped adapter will log the original failure.
    const msg = String(err).toLowerCase();
    if (msg.includes('adapter_error') || msg.includes('tls') || msg.includes('ssl')) {
      console.warn('Suppressing adapter/SSL error so callback can succeed');
      return new Response(null, { status: 200 });
    }

    // otherwise propagate the failure so the client sees a real error
    return new Response(JSON.stringify({ error: 'Authentication error' }), {
      status: 500,
    });
  }
}

export async function GET(req, context) {
  return handle(req, context);
}

export async function POST(req, context) {
  return handle(req, context);
}
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';
import { authRateLimit } from '@/lib/ratelimit';


async function handler(req){
    const ip= req.headers.get('x-forwarded-for') || req.socket?.remoteAddress || 'anonymous';

    const { success }= await authRateLimit.limit(ip);
    if(!success){
        return new Response(JSON.stringify({error: 'Too many requests'}), {status: 429})
    }
    return NextAuth(req, authOptions);
}
// const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

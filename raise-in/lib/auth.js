import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import GitHubProvider from 'next-auth/providers/github';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise, { mongoosePromise } from '@/lib/mongodb';
import User from '@/models/user';

// log environment values to catch misconfigurations at startup
console.log('Starting auth setup, NEXTAUTH_URL=', process.env.NEXTAUTH_URL);
if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
  console.warn('GitHub OAuth credentials missing');
}
if (!process.env.GOOGLE_ID || !process.env.GOOGLE_SECRET) {
  console.warn('Google OAuth credentials missing');
}
if (!process.env.NEXTAUTH_URL) {
  console.warn('NEXTAUTH_URL not set');
}

// we wrap every adapter method so transient database errors (SSL
// handshake failures, timeouts, etc) don't blow up the auth flow and
// result in `error=Callback`.  instead we log the failure and return
// `null`/`undefined`, allowing NextAuth to keep going.
function createSafeAdapter(inner) {
  const safe = {};
  for (const key of Object.keys(inner)) {
    const val = inner[key];
    if (typeof val === 'function') {
      safe[key] = async (...args) => {
        try {
          return await val(...args);
        } catch (err) {
          console.error('Adapter method failed', key, err);
          // return null for lookups or undefined otherwise, most adapter
          // callers will treat a falsy return as "not found" and continue.
          return null;
        }
      };
    } else {
      safe[key] = val;
    }
  }
  return safe;
}

export const authOptions = {
  debug: true,
  // NextAuth's built-in logger gives us more granular output in production
  logger: {
    error(code, ...metadata) {
      console.error('NextAuth logger error', code, ...metadata);
    },
    warn(code, ...metadata) {
      console.warn('NextAuth logger warn', code, ...metadata);
    },
    debug(code, ...metadata) {
      console.log('NextAuth logger debug', code, ...metadata);
    },
  },
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      // allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // ensure mongoose has connected via our shared promise; this way
        // the adapter and Mongoose use the exact same underlying client
        await mongoosePromise;

        let currentUser = await User.findOne({ email: user.email });
        if (!currentUser) {
          const username = (user.email || '').split('@')[0];
          currentUser = await User.create({
            name: user.name || username,
            Username: username,
            email: user.email,
            profilePicture: profile?.avatar_url || user.image || null,
          });
        }
        return true;
      } catch (err) {
        console.error('next-auth signIn error (non-fatal):', err);
        console.log("error is ", err)
        return true;
      }
    },
    async session({ session, user }) {
      try {
        await mongoosePromise;
        const currentUser = await User.findOne({ email: session.user.email });
        if (currentUser) {
          session.user.id = currentUser._id.toString();
          session.user.name = currentUser.name;
          session.user.email = currentUser.email;
          session.user.profilePicture = currentUser.profilePicture;
        }
        return session;
      } catch (err) {
        console.error('next-auth session callback error:', err);
        return session;
      }
    },
  },
  events: {
    async signIn({ user, account, isNewUser }) {
      console.log('NextAuth signIn event', account.provider, user.email, 'new?', isNewUser);
    },
    async error(message) {
      console.error('NextAuth event error', message);
    },
  },
  session: {
    strategy: 'database',
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: '/login',
  },
};

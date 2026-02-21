import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from 'next-auth/providers/github'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"
import { signIn } from 'next-auth/react'
import mongoose from 'mongoose'
import User from '@/models/user'
import Payment from '@/models/Payment'
import Username from '@/app/[username]/page'

const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await mongoose.connect(process.env.MONGODB_URI);

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
        console.error('next-auth signIn error:', err);
        return false;
      }
    },
  },
  session: {
    strategy: "database",
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: '/login',
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

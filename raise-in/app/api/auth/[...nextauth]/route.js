import NextAuth from 'next-auth'
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from 'next-auth/providers/github'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"

export async function GET(request) {}
 
export async function HEAD(request) {}
 
export async function POST(request) {}
export const authoptions= NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    // OAuth authentication providers...
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET
    // }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    // Passwordless / email sign in
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  session: {
    strategy: "database",
    secret: process.env.NEXTAUTH_SECRET,
  },
})
// const handler= NextAuth(authoptions)

export { authoptions as GET, authoptions as POST }  

import NextAuth, { Awaitable } from "next-auth";

import GithubProvider from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { findOrCreateUser, getRoleByKey, login } from "@/lib/data";
import { User } from "@/types/next-auth";
import { toast } from "@/customize/mui/toast";

export const authOptions: NextAuthOptions = {
  secret: process.env.NO_SECRET,
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password){
          return null;
        }

        const user: User = {
          username: credentials.username,
          password: credentials.password,
          type: 'CREDENTIALS'
        };

        const res = await login(user.username!, user.password!);
        if (res.errCode === 0) {
          return res.data as null;
        } else {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, token, user }) {
      session.user = token.user as User;
      return session;
    },
    async jwt({ token, user, account, profile, trigger }) {
      const myUser: User = Object.keys(token.user || {}).length > 0 ? token.user : user;
      if (trigger === 'signIn' && account?.provider === 'github' || account?.provider === 'google') {
        const role = await getRoleByKey('USER');
        myUser.role = {
          name: role?.name,
          key: role?.key
        }
        switch(account.provider) {
          case 'github':
            myUser.type = 'github';
            myUser.username = user?.name!;
            break;
          case 'google':
            myUser.type = 'google';
            myUser.username = user?.email!;
            break;
        }
        await findOrCreateUser(user);
      }else if (trigger === 'signIn' && account?.provider === 'credentials') {
        const role = await getRoleByKey('USER');
        myUser.role = {
          name: role?.name,
          key: role?.key
        }
        myUser.type = 'credentials';
      }
      token.user = myUser;
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

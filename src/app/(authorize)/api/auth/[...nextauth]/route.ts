import NextAuth from "next-auth";

import { findOrCreateUser, getRoleByKey, login } from "@/lib/data";
import { User } from "@/types/next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

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
      clientSecret: process.env.GOOGLE_SECRET!,
      authorization: { params: { access_type: "offline" } },
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
        if (res.errCode === 200) {
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
      delete session.user.password;
      return session;
    },
    async jwt({ token, user, account, profile, trigger }) {
    if (trigger === 'signIn' && account?.provider === 'github' || account?.provider === 'google') {
        if (account){
          const myUser: User = {};
          const role = await getRoleByKey('USER');
          myUser.role = String(role?._id);
          switch (account.provider) {
            case 'github':
              myUser.username = user?.name!;
              myUser.name = user?.name!;
              myUser.email = user?.email!;
              myUser.type = account.provider.toUpperCase();
              break;
            case 'google':
              myUser.username = user?.email!;
              myUser.name = user?.name!;
              myUser.email = user?.email!;
              myUser.type = account.provider.toUpperCase();
              break;
          }
          myUser.image = user?.image!;
          const res = await findOrCreateUser(myUser);
          if (res.data){
            token.user = res.data;
            token.access_token = account?.access_token!;
            token.refresh_token = account?.refresh_token!;
            token.expires_at = account?.expires_at!;
            return token;
          }else throw new Error('Có lỗi xảy ra')
        }
      }else if (trigger === 'signIn' && account?.provider === 'credentials'){
        token.user = user;
      }
      return token;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60,
  },
  pages: {
    signIn: '/auth/signIn',
    signOut: '/auth/signOut',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
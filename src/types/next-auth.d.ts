import NextAuth, { DefaultSession } from "next-auth"
import { DefaultJWT, JWT } from "next-auth/jwt"

export type Role = {
  id?: string;
  key?: string;
  name?: string;
}

export interface User {
  id?: string ;
  name?: string | null
  email?: string | null
  image?: string | null
  role?: string | Role;
  username?: string ;
  password?: string;
  type?: string;
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    user: User & DefaultJWT["user"]
  }
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User & DefaultSession["user"]
  }
}
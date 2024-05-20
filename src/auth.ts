import { DrizzleAdapter } from "@auth/drizzle-adapter"
import NextAuth, { type DefaultSession } from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { db } from "./server/db"
import { createTable } from "./server/db/schema"
import type { Adapter } from "next-auth/adapters"
import Credentials from "next-auth/providers/credentials"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User & DefaultSession["user"];
  }

  interface User {
    id?: string;
    admin: boolean;
    // ...other properties
    // role: UserRole;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.admin = user.admin;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.admin = token.admin as boolean;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1 day
  },
  adapter: DrizzleAdapter(db, createTable) as Adapter,
  providers: [GitHub, Google, Credentials({
    name: "Credentials",
    credentials: {
      email: {
        label: "Email",
        type: "email",
      },
      password: {
        label: "Password",
        type: "password"
      },
    },
    // authorize: async (credentials) => {
    //   const {
    //     email, password
    //   } = credentials;

    //   try {
    //     const getUser = await db.
    //   } catch (error) {

    //   }
    // }
  })],
})
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { authConfig } from "./auth.config"
import { prisma } from "@/src/lib/prisma"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,  // spread the base config
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // full DB logic here — safe, runs on Node.js
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        })
        
        if (!user || !user.password) return null
        const match = await bcrypt.compare(
          credentials.password as string,
          user.password
        )
        if (!match) return null
        return { id: user.id, email: user.email, name: user.name }
      }
    })
  ],
})
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import { prismaClient } from "./prisma";
import { compare } from "bcryptjs";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Preencha todos os campos.");
        }

        const user = await prismaClient.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("Email incorreto ou não cadastrado.");
        }

        if (!user.password) {
          throw new Error(
            "Conta registrada com login social. Use outro método."
          );
        }

        const isValid = await compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Senha incorreta.");
        }

        return {
          id: user.id,
          name: user.name ?? "",
          email: user.email ?? "",
          image: user.image ?? "",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const existingUser = await prismaClient.user.findUnique({
          where: { email: user.email! },
        });

        if (existingUser && existingUser.password) {
          const msg = encodeURIComponent(
            "Este e-mail já está vinculado a outro método de login."
          );
          throw new Error(msg);
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.image = user.image;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.image = token.image as string;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      return "/Menu";
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

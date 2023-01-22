/* eslint-disable no-param-reassign */
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { User } from 'next-auth/core/types';

import { prisma } from '../../../lib/prisma';
import { comparePwd } from '../../../lib/password';

export default NextAuth({
  providers: [
    CredentialsProvider({
      type: 'credentials',
      name: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const { username, password: plaintextPassword } = credentials as {
          username: string;
          password: string;
        };

        const user = await prisma.admin.findUnique({
          where: { username },
        });

        if (!user || !(await comparePwd(plaintextPassword, user.password))) {
          throw new Error('Invalid credentials');
        }
        return {
          id: user.id,
          username: user.username,
          email: user.email,
        } as User;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as User;
      return session;
    },
  },
});

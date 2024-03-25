/* eslint-disable no-param-reassign */
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { User } from 'next-auth/core/types';

import { prisma } from '../../../lib/prisma';
import { comparePwd, hashPwd } from '../../../lib/password';
import { seedDemoUser } from '../../../lib/demo';

/**
 * Handle authentication for admin.
 */
const handleAdminAuth = async (username: string, plaintextPassword: string) => {
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
    isDemo: false,
  } as User;
};

/**
 * Handle authentication for demo user. The user cannot log in twice with the same username, since a random username
 * is generated on each start of the demo, so there is no password to check.
 */
const handleDemoAuth = async (username: string, plaintextPassword: string) => {
  const newDemoUser = await prisma.admin.create({
    data: {
      username,
      email: `${username}@demo.com`,
      password: await hashPwd(plaintextPassword),
      isDemo: true,
    },
  });

  await seedDemoUser(newDemoUser.id);

  return {
    id: newDemoUser.id,
    username: newDemoUser.username,
    email: newDemoUser.email,
    isDemo: true,
  } as User;
};

/**
 * Handle requests to /api/auth. API is generated by NextAuth.
 */
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

        if (username.startsWith('DEMO_')) {
          return handleDemoAuth(username, plaintextPassword);
        }
        return handleAdminAuth(username, plaintextPassword);
      },
    }),
  ],
  pages: {
    signIn: '/landing',
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

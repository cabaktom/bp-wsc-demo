/* eslint-disable no-param-reassign */
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

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
        return { username: user.username } as any;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
});

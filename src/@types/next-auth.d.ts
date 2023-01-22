import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: number;
    username: string;
    email: string;
  }

  interface Session {
    user: User & DefaultSession['user'];
  }
}

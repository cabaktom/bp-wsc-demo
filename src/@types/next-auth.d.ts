import type { DefaultSession } from 'next-auth';

// extension of Next-Auth types for custom credentials provider
declare module 'next-auth' {
  interface User {
    id: string;
    username: string;
    email: string;
    isDemo: boolean;
  }

  interface Session {
    user: User & DefaultSession['user'];
    isDemo: boolean;
  }
}

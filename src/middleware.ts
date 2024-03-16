import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: async ({ token, req }) => {
      if (new URL(req.url).pathname === '/landing') return true;
      return token ? !!token.isDemo : false;
    },
  },
});

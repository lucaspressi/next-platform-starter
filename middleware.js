import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    return null;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
    pages: {
      signIn: '/login',
    }
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/create-quiz/:path*',
    '/api/quiz/:path*'
  ]
};
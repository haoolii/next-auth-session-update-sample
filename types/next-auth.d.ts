import NextAuth from 'next-auth';
import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      access_token?: string;
    } & DefaultSession['user'];
  }

  interface User {
    access_token?: string;
  }
}
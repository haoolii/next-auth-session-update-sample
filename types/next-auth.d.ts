import NextAuth from 'next-auth';
import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      access_token?: string;  // 可選的 access_token
    } & DefaultSession['user'];
  }

  interface User {
    access_token?: string;  // 可選的 access_token
  }
}
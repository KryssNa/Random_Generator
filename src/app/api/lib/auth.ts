// lib/auth.ts
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '../database/db';
import { User } from '../database/user';
// dot env configuration
import dotenv from 'dotenv';
dotenv.config();

// JWT secret from environment variable
const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'default';

// Token generation function
const generateToken = (user: any) => {
  return jwt.sign(
    { 
      id: user._id,
      email: user.email,
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Email and password are required');
          }

          await connectDB();
          
          // Find user and include password
          const user = await User.findOne({ email: credentials.email }).select('+password');
          
          if (!user) {
            throw new Error('Invalid email or password');
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          
          if (!isPasswordValid) {
            throw new Error('Invalid email or password');
          }

          // Generate JWT token
          const token = generateToken(user);

          // Return user data with token
          return {
            id: user._id.toString(),
            email: user.email,
            role: user.role,
            token: token, // Include JWT token
            name: user.email // NextAuth expects a name field
          };
        } catch (error) {
          console.error('Auth error:', error);
          throw error;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Add custom fields to token
        token.role = user.role;
        token.accessToken = user.token;
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        // Add custom fields to session
        (session.user as any).role = token.role;
        (session.user as any).accessToken = token.accessToken;
        (session.user as any).userId = token.userId;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login', // Custom login page path
    error: '/auth/error', // Error page path
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: JWT_SECRET,
  jwt: {
    secret: JWT_SECRET,
    maxAge: 24 * 60 * 60, // 24 hours
  },
  debug: process.env.NODE_ENV === 'development',
};

// Type declaration for session
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
      accessToken: string;
    }
  }
  interface User {
    role: string;
    token: string;
  }
}
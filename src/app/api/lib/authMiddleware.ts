// lib/authMiddleware.ts
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { authOptions } from './auth';

import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'default';

interface JWTPayload {
  id: string;
  email: string;
  role: string;
}

export async function isAuthenticated(req: Request) {
  try {
    // First try to get session from NextAuth
    const session = await getServerSession(authOptions);
    
    if (session) {
      return {
        success: true,
        session
      };
    }

    // If no session, check for Bearer token
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return {
        success: false,
        response: NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        )
      };
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
      
      // Create a session-like object from JWT payload
      const jwtSession = {
        user: {
          id: decoded.id,
          email: decoded.email,
          role: decoded.role,
          accessToken: token
        }
      };

      return {
        success: true,
        session: jwtSession
      };
    } catch (error) {
      return {
        success: false,
        response: NextResponse.json(
          { error: 'Invalid token' },
          { status: 401 }
        )
      };
    }
  } catch (error) {
    console.error('Auth error:', error);
    return {
      success: false,
      response: NextResponse.json(
        { error: 'Authentication failed' },
        { status: 401 }
      )
    };
  }
}

export async function isAdmin(req: Request) {
  const authResult = await isAuthenticated(req);
  
  if (!authResult.success) {
    return authResult;
  }

  if (authResult.session?.user?.role !== 'ADMIN') {
    return {
      success: false,
      response: NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    };
  }

  return {
    success: true,
    session: authResult.session
  };
}
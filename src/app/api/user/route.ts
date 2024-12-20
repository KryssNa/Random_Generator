// app/api/users/route.ts
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import connectDB from "../database/db";
import { User } from "../database/user";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();



const JWT_SECRET = process.env.NEXTAUTH_SECRET || "default_secret";

export function generateToken(user: any) {
  return jwt.sign(
    { 
      userId: user._id,
      email: user.email,
      role: user.role 
    },
    JWT_SECRET,
    { 
      expiresIn: '24h' // Token expires in 24 hours
    }
  );
}

// POST - Create new user
export async function POST(request: Request) {
  try {
    // Connect to database
    await connectDB();

    // Get user data from request
    const { email, password, role } = await request.json();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = new User({
      email,
      password,
      role: role || "ADMIN",
    });

    await newUser.save();

    // Generate JWT token
    const token = generateToken(newUser);

    // Return user without password and include token
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    return NextResponse.json(
      { 
        message: "User created successfully", 
        user: userWithoutPassword,
        token 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: error.message || "Error creating user" },
      { status: 500 }
    );
  }
}

// Add a login endpoint to generate tokens for existing users
export async function POST_LOGIN(request: Request) {
  try {
    await connectDB();

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken(user);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user.toObject();

    return NextResponse.json({
      user: userWithoutPassword,
      token
    });

  } catch (error: any) {
    console.error("Error logging in:", error);
    return NextResponse.json(
      { error: error.message || "Error during login" },
      { status: 500 }
    );
  }
}
// app/api/verify/route.ts
import crypto from "crypto";
import { NextResponse } from "next/server";
import connectDB from "../database/db";
import { Verification } from "../database/user";
import { isAdmin, isAuthenticated } from "../lib/authMiddleware";

// Connect to MongoDB
connectDB();

export function generateQRCode(): string {
  // Generate 16 random bytes (which will give us 32 hex characters)
  const randomBytes = crypto.randomBytes(16);

  // Convert to hexadecimal string and uppercase
  return randomBytes.toString("hex").toUpperCase();
}

const randomText = generateQRCode();
const generateRandomOneDigit = () => Math.floor(Math.random() * 10);

// GET - Fetch verification data (public route)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fullQrCode = searchParams.get("hDwjuscv");
  console.log("fullQrCode", fullQrCode);

  if (!fullQrCode) {
    return NextResponse.json(
      { error: "QR code parameter is required" },
      { status: 400 }
    );
  }

  // Extract the first part before the first '/'
  const qrCode = fullQrCode.split("/")[0];
  console.log("extracted qrCode", qrCode);

  try {
    const data = await Verification.findOne({ qrCode }).lean();

    if (!data) {
      return NextResponse.json(
        { error: "Verification data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch verification data" },
      { status: 500 }
    );
  }
}

// POST - Create new verification data (admin only)
// Modified POST route
export async function POST(request: Request) {
  const authResult = await isAuthenticated(request);
  if (!authResult.success) {
    return authResult.response;
  }
  try {
    const json = await request.json();

    // Generate unique QR code
    let qrCode = generateQRCode();
    let isUnique = false;
    let maxAttempts = 5;

    // Ensure QR code is unique
    while (!isUnique && maxAttempts > 0) {
      const existing = await Verification.findOne({ qrCode }).lean();
      if (!existing) {
        isUnique = true;
      } else {
        qrCode = generateQRCode();
        maxAttempts--;
      }
    }

    if (!isUnique) {
      return NextResponse.json(
        { error: "Failed to generate unique QR code" },
        { status: 500 }
      );
    }

    const verification = new Verification({
      qrCode,
      status: json.status,
      visaNumber: json.visaNumber,
      nationality: json.nationality,
      passportNumber: json.passportNumber,
      arabicName: json.arabicName,
      latinName: json.latinName,
      expiryDate: new Date(json.expiryDate),
    });

    await verification.save();
    return NextResponse.json({
      data: {
        verification,
        url: `${
          process.env.NEXT_PUBLIC_VERIFICATION_URL
        }${qrCode}/${randomText}/${generateRandomOneDigit()}`,
      },
      msg: "Verification data created successfully",
    });
  } catch (error) {
    console.error("Error creating data:", error);
    return NextResponse.json(
      { error: "Failed to create verification data" },
      { status: 500 }
    );
  }
}

// PUT - Update verification data (admin only)
export async function PUT(request: Request) {
  const authResult = await isAdmin(request);
  if (!authResult.success) {
    return authResult.response;
  }

  try {
    const json = await request.json();
    const { _id, ...updateData } = json;

    const updatedVerification = await Verification.findByIdAndUpdate(
      _id,
      {
        ...updateData,
        expiryDate: new Date(updateData.expiryDate),
      },
      { new: true }
    );

    if (!updatedVerification) {
      return NextResponse.json(
        { error: "Verification data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedVerification);
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json(
      { error: "Failed to update verification data" },
      { status: 500 }
    );
  }
}

// DELETE - Delete verification data (admin only)
export async function DELETE(request: Request) {
  const authResult = await isAdmin(request);
  if (!authResult.success) {
    return authResult.response;
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "ID parameter is required" },
      { status: 400 }
    );
  }

  try {
    const deletedVerification = await Verification.findByIdAndDelete(id);

    if (!deletedVerification) {
      return NextResponse.json(
        { error: "Verification data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting data:", error);
    return NextResponse.json(
      { error: "Failed to delete verification data" },
      { status: 500 }
    );
  }
}

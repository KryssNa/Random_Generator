import { NextResponse } from "next/server";
import { Verification } from "../../database/user";
import { isAdmin } from "../../lib/authMiddleware";

// GET ALL - Fetch all verification data (admin only)
export async function GET(request: Request) {
  const authResult = await isAdmin(request);
  if (!authResult.success) {
    return authResult.response;
  }

  try {
    const verifications = await Verification.find({})
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json(verifications);
  } catch (error) {
    console.error("Error fetching all data:", error);
    return NextResponse.json(
      { error: "Failed to fetch verification data" },
      { status: 500 }
    );
  }
}

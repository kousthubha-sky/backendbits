import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    console.log("Bootstrap API called");
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    console.log("Session:", session ? "exists" : "null");

    const body = await request.json().catch(() => ({}));
    const { role = 'admin' } = body;
    console.log("Requested role:", role);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("Bootstrap: Looking for user with ID:", session.user.id);
    console.log("Bootstrap: User email:", session.user.email);

    // Find the user (same logic as submit API)
    let userResult = await db.select().from(user).where(eq(user.id, session.user.id));
    console.log("Bootstrap: Found user by ID:", userResult[0] ? "yes" : "no");

    if (!userResult[0] && session.user.email) {
      // Fallback: try to find by email
      userResult = await db.select().from(user).where(eq(user.email, session.user.email));
      console.log("Bootstrap: Found user by email:", userResult[0] ? "yes" : "no");
    }

    if (!userResult[0]) {
      console.log("Bootstrap: User not found");
      return NextResponse.json({
        error: "User not found. Please try logging out and logging back in.",
        details: "Your user account may not be properly created in the database."
      }, { status: 404 });
    }

    const currentUser = userResult[0];
    console.log("Bootstrap: Current user role:", currentUser.role);

    // Validate role
    if (!['reviewer', 'admin'].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Promote to requested role
    await db.update(user).set({ role }).where(eq(user.id, currentUser.id));

    console.log(`User promoted to ${role}`);

    return NextResponse.json({
      success: true,
      message: `User promoted to ${role} successfully`
    });

  } catch (error) {
    console.error("Error promoting user to admin:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
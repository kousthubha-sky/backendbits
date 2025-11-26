"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user } from "@/lib/schema";
import { eq, desc, count } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const currentUserResult = await db.select().from(user).where(eq(user.id, session.user.id));
    const currentUser = currentUserResult[0];

    const body = await request.json();
    const { userId, newRole } = body;

    if (!userId || !newRole) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Allow users to update their own role, or admins to update any role
    const canUpdate = userId === session.user.id || (currentUser && currentUser.role === 'admin');

    if (!canUpdate) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
    }

    if (!['user', 'contributor', 'reviewer', 'admin'].includes(newRole)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Allow self-promotion to admin for development/bootstrap purposes
    // In production, this should be more restrictive
    const isSelfPromotion = userId === session.user.id;
    const isAlreadyAdmin = currentUser && currentUser.role === 'admin';

    if (newRole === 'admin' && !isAlreadyAdmin && !isSelfPromotion) {
      return NextResponse.json({ error: "Cannot set admin role for others" }, { status: 403 });
    }

    // Try to update by user ID first
    const result1 = await db.update(user).set({ role: newRole }).where(eq(user.id, userId));

    // If no user found by ID, try by email (fallback for existing users)
    let result2 = null;
    if (userId === session.user.id && session.user.email) {
      result2 = await db.update(user).set({ role: newRole }).where(eq(user.email, session.user.email));
    }

    if (!result1 && !result2) {
      // Debug: check what users exist
      const allUsers = await db.select({ id: user.id, email: user.email, name: user.name }).from(user);
      console.log("Available users:", allUsers);
      console.log("Looking for userId:", userId);
      console.log("Session user:", { id: session.user.id, email: session.user.email });

      return NextResponse.json({
        error: "User not found",
        debug: {
          requestedId: userId,
          sessionId: session.user.id,
          sessionEmail: session.user.email,
          availableUsers: allUsers.length
        }
      }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "User role updated successfully" });

  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userResult = await db.select().from(user).where(eq(user.id, session.user.id));
    const currentUser = userResult[0];

    // Check if user has admin role
    if (!currentUser || currentUser.role !== 'admin') {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const users = await db.select({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      reputationScore: user.reputationScore,
      joinedDate: user.joinedDate,
      lastActive: user.lastActive,
      isVerified: user.isVerified
    }).from(user).orderBy(desc(user.joinedDate)).limit(limit).offset(offset);

    const totalResult = await db.select({ count: count() }).from(user);
    const total = totalResult[0]?.count || 0;

    return NextResponse.json({ users, total, limit, offset });

  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
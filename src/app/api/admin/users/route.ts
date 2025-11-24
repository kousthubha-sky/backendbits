"use server";

import { auth } from "@/lib/auth";
import { getAuthDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await getAuthDatabase();
    const currentUser = await db.collection("user").findOne({ id: session.user.id });

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
    let result = await db.collection("user").updateOne(
      { id: userId },
      { $set: { role: newRole } }
    );

    // If no user found by ID, try by email (fallback for existing users)
    if (result.matchedCount === 0) {
      // For self-updates, try to find by session email
      if (userId === session.user.id && session.user.email) {
        result = await db.collection("user").updateOne(
          { email: session.user.email },
          { $set: { role: newRole } }
        );
      }
    }

    if (result.matchedCount === 0) {
      // Debug: check what users exist
      const allUsers = await db.collection("user").find({}, { projection: { id: 1, email: 1, name: 1 } }).toArray();
      console.log("Available users:", allUsers.map(u => ({ id: u.id, email: u.email, name: u.name })));
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

    const db = await getAuthDatabase();
    const user = await db.collection("user").findOne({ id: session.user.id });

    // Check if user has admin role
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const users = await db.collection("user")
      .find({}, {
        projection: {
          id: 1,
          name: 1,
          email: 1,
          role: 1,
          reputationScore: 1,
          joinedDate: 1,
          lastActive: 1,
          isVerified: 1
        }
      })
      .sort({ joinedDate: -1 })
      .skip(offset)
      .limit(limit)
      .toArray();

    const total = await db.collection("user").countDocuments();

    return NextResponse.json({ users, total, limit, offset });

  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
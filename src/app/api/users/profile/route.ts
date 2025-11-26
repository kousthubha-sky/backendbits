"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Try to find by user ID first
    let userResult = await db.select({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
      reputationScore: user.reputationScore,
      githubUsername: user.githubUsername,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
      website: user.website,
      location: user.location,
      skills: user.skills,
      isVerified: user.isVerified,
      verificationBadge: user.verificationBadge,
      joinedDate: user.joinedDate,
      lastActive: user.lastActive,
    }).from(user).where(eq(user.id, session.user.id));

    // If no user found by ID, try by email (fallback for existing users)
    if (!userResult[0] && session.user.email) {
      userResult = await db.select({
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
        reputationScore: user.reputationScore,
        githubUsername: user.githubUsername,
        avatarUrl: user.avatarUrl,
        bio: user.bio,
        website: user.website,
        location: user.location,
        skills: user.skills,
        isVerified: user.isVerified,
        verificationBadge: user.verificationBadge,
        joinedDate: user.joinedDate,
        lastActive: user.lastActive,
      }).from(user).where(eq(user.email, session.user.email));
    }

    if (!userResult[0]) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userResult[0]);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      bio,
      website,
      location,
      skills,
      githubUsername,
      avatarUrl,
    } = body;

    // Validate input
    if (name && (typeof name !== "string" || name.length > 100)) {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }

    if (bio && (typeof bio !== "string" || bio.length > 500)) {
      return NextResponse.json({ error: "Bio too long" }, { status: 400 });
    }

    if (website && (typeof website !== "string" || website.length > 200)) {
      return NextResponse.json({ error: "Invalid website URL" }, { status: 400 });
    }

    if (location && (typeof location !== "string" || location.length > 100)) {
      return NextResponse.json({ error: "Location too long" }, { status: 400 });
    }

    if (skills && (!Array.isArray(skills) || skills.length > 20)) {
      return NextResponse.json({ error: "Too many skills" }, { status: 400 });
    }

    const updateData: any = {
      lastActive: new Date(),
    };

    if (name !== undefined) updateData.name = name;
    if (bio !== undefined) updateData.bio = bio;
    if (website !== undefined) updateData.website = website;
    if (location !== undefined) updateData.location = location;
    if (skills !== undefined) updateData.skills = skills;
    if (githubUsername !== undefined) updateData.githubUsername = githubUsername;
    if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl;

    // Try to update by user ID first
    const result1 = await db.update(user).set(updateData).where(eq(user.id, session.user.id));

    // If no user found by ID, try by email (fallback for existing users)
    let result2 = null;
    if (session.user.email) {
      result2 = await db.update(user).set(updateData).where(eq(user.email, session.user.email));
    }

    if (!result1 && !result2) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
"use server";

import { auth } from "@/lib/auth";
import { getAuthDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await getAuthDatabase();
    // Try to find by user ID first
    let user = await db.collection("user").findOne(
      { id: session.user.id },
      {
        projection: {
          id: 1,
          name: 1,
          email: 1,
          image: 1,
          role: 1,
          reputationScore: 1,
          githubUsername: 1,
          avatarUrl: 1,
          bio: 1,
          website: 1,
          location: 1,
          skills: 1,
          isVerified: 1,
          verificationBadge: 1,
          joinedDate: 1,
          lastActive: 1,
        }
      }
    );

    // If no user found by ID, try by email (fallback for existing users)
    if (!user && session.user.email) {
      user = await db.collection("user").findOne(
        { email: session.user.email },
        {
          projection: {
            id: 1,
            name: 1,
            email: 1,
            image: 1,
            role: 1,
            reputationScore: 1,
            githubUsername: 1,
            avatarUrl: 1,
            bio: 1,
            website: 1,
            location: 1,
            skills: 1,
            isVerified: 1,
            verificationBadge: 1,
            joinedDate: 1,
            lastActive: 1,
          }
        }
      );
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
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

    const db = await getAuthDatabase();
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
    let result = await db.collection("user").updateOne(
      { id: session.user.id },
      { $set: updateData }
    );

    // If no user found by ID, try by email (fallback for existing users)
    if (result.matchedCount === 0 && session.user.email) {
      result = await db.collection("user").updateOne(
        { email: session.user.email },
        { $set: updateData }
      );
    }

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
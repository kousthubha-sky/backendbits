"use server";

import { auth } from "@/lib/auth";
import { getAuthDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    console.log("Session:", session);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await getAuthDatabase();

    // Try multiple ways to find the user
    let user = await db.collection("user").findOne({ id: session.user.id });

    if (!user && session.user.email) {
      // Fallback: try to find by email
      user = await db.collection("user").findOne({ email: session.user.email });
    }

    if (!user) {
      return NextResponse.json({
        error: "User not found. Please try logging out and logging back in.",
        details: "Your user account may not be properly created in the database."
      }, { status: 404 });
    }

    const body = await request.json();
    const {
      title,
      description,
      githubUrl,
      category,
      techStack,
      features,
      deployment,
      useCases,
    } = body;

    // Validate required fields
    if (!title || !description || !githubUrl || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate GitHub URL format
    if (!githubUrl.match(/^https:\/\/github\.com\/[^\/]+\/[^\/]+$/)) {
      return NextResponse.json({ error: "Invalid GitHub repository URL" }, { status: 400 });
    }

    // Check if template already exists
    const existingTemplate = await db.collection("templates").findOne({ githubUrl });
    if (existingTemplate) {
      return NextResponse.json({ error: "Template with this GitHub URL already exists" }, { status: 409 });
    }

    // Check if user already has a pending submission
    const pendingSubmission = await db.collection("template_submissions").findOne({
      submitterId: session.user.id,
      status: { $in: ['submitted', 'under_review'] }
    });

    if (pendingSubmission) {
      return NextResponse.json({ error: "You already have a pending submission. Please wait for it to be reviewed." }, { status: 409 });
    }

    // Create submission
    const submission = {
      id: `submission_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      submitterId: session.user.id,
      submitterName: user.name || user.email,
      status: 'submitted',
      submittedAt: new Date(),
      title,
      description,
      githubUrl,
      category,
      techStack: techStack || [],
      features: features || [],
      deployment: deployment || {},
      useCases: useCases || [],
      reviewNotes: [],
      version: 1,
    };

    const result = await db.collection("template_submissions").insertOne(submission);

    // Update user reputation (small boost for submission)
    await db.collection("user").updateOne(
      { id: session.user.id },
      { $inc: { reputationScore: 5 } }
    );

    return NextResponse.json({
      success: true,
      submissionId: submission.id,
      message: "Template submitted successfully for review"
    });

  } catch (error) {
    console.error("Error submitting template:", error);
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

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    const db = await getAuthDatabase();

    // Build query based on user role and status
    const user = await db.collection("user").findOne({ id: session.user.id });
    const query: any = {};

    if (user?.role === 'admin') {
      // Admins can see all submissions
      if (status) {
        query.status = status;
      }
    } else {
      // All users can see their own submissions
      query.submitterId = session.user.id;
      if (status) {
        query.status = status;
      }
    }

    const submissions = await db.collection("template_submissions")
      .find(query)
      .sort({ submittedAt: -1 })
      .skip(offset)
      .limit(limit)
      .toArray();

    const total = await db.collection("template_submissions").countDocuments(query);

    return NextResponse.json({
      submissions,
      total,
      limit,
      offset
    });

  } catch (error) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
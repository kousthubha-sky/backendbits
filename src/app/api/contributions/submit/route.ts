"use server";

import { auth } from "@/lib/auth";
import { getAuthDatabase } from "@/lib/mongodb";
import { requireCSRFToken } from "@/lib/csrf";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // CSRF protection
    if (!requireCSRFToken(request, session.user.id)) {
      return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
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

    // Validate and sanitize GitHub URL format
    let url: URL;
    try {
      url = new URL(githubUrl);
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
    }

    // Ensure it's a GitHub URL
    if (url.protocol !== 'https:' || url.hostname !== 'github.com') {
      return NextResponse.json({ error: "Only GitHub repository URLs are allowed" }, { status: 400 });
    }

    // Validate GitHub URL structure (owner/repo)
    const pathParts = url.pathname.split('/').filter(part => part.length > 0);
    if (pathParts.length !== 2) {
      return NextResponse.json({ error: "Invalid GitHub repository URL format. Expected: https://github.com/owner/repo" }, { status: 400 });
    }

    // Sanitize owner and repo names
    const [owner, repo] = pathParts;
    const ownerRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;
    const repoRegex = /^[a-zA-Z0-9._-]+$/;

    if (!ownerRegex.test(owner)) {
      return NextResponse.json({ error: "Invalid GitHub owner name" }, { status: 400 });
    }

    if (!repoRegex.test(repo) || repo.length > 100) {
      return NextResponse.json({ error: "Invalid GitHub repository name" }, { status: 400 });
    }

    // Reconstruct sanitized URL
    const sanitizedGithubUrl = `https://github.com/${owner}/${repo}`;

    // Validate title
    if (typeof title !== 'string' || title.length < 3 || title.length > 100) {
      return NextResponse.json({ error: "Title must be between 3 and 100 characters" }, { status: 400 });
    }

    // Validate description
    if (typeof description !== 'string' || description.length < 10 || description.length > 1000) {
      return NextResponse.json({ error: "Description must be between 10 and 1000 characters" }, { status: 400 });
    }

    // Validate category
    const validCategories = ['auth', 'payment', 'AI projects', 'personal', 'Portfolio', 'github'];
    if (!validCategories.includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }



    // Validate title
    if (typeof title !== 'string' || title.length < 3 || title.length > 100) {
      return NextResponse.json({ error: "Title must be between 3 and 100 characters" }, { status: 400 });
    }

    // Validate description
    if (typeof description !== 'string' || description.length < 10 || description.length > 1000) {
      return NextResponse.json({ error: "Description must be between 10 and 1000 characters" }, { status: 400 });
    }

    // Validate category
    if (!['auth', 'payment', 'AI projects', 'personal', 'Portfolio', 'github'].includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
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

    // Validate optional fields
    if (techStack && (!Array.isArray(techStack) || techStack.length > 20)) {
      return NextResponse.json({ error: "Too many technologies (max 20)" }, { status: 400 });
    }

    if (features && (!Array.isArray(features) || features.length > 20)) {
      return NextResponse.json({ error: "Too many features (max 20)" }, { status: 400 });
    }

    if (useCases && (!Array.isArray(useCases) || useCases.length > 10)) {
      return NextResponse.json({ error: "Too many use cases (max 10)" }, { status: 400 });
    }

    // Sanitize arrays
    const sanitizedTechStack = techStack ? techStack.filter((tech: any) =>
      typeof tech === 'string' && tech.length > 0 && tech.length <= 50
    ) : [];

    const sanitizedFeatures = features ? features.filter((feature: any) =>
      typeof feature === 'string' && feature.length > 0 && feature.length <= 200
    ) : [];

    const sanitizedUseCases = useCases ? useCases.filter((useCase: any) =>
      typeof useCase === 'string' && useCase.length > 0 && useCase.length <= 200
    ) : [];

    // Create submission
    const submission = {
      id: `submission_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      submitterId: session.user.id,
      submitterName: user.name || user.email,
      status: 'submitted',
      submittedAt: new Date(),
      title: title.trim(),
      description: description.trim(),
      githubUrl: sanitizedGithubUrl,
      category,
      techStack: sanitizedTechStack,
      features: sanitizedFeatures,
      deployment: deployment || {},
      useCases: sanitizedUseCases,
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
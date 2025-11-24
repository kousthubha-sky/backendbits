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
    const user = await db.collection("user").findOne({ id: session.user.id });

    // Check if user has reviewer role or higher
    if (!user || (user.role !== 'reviewer' && user.role !== 'admin')) {
      return NextResponse.json({ error: "Insufficient permissions. You need reviewer role or higher." }, { status: 403 });
    }

    const body = await request.json();
    const { submissionId, action, notes, rating } = body;

    if (!submissionId || !action) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!['approve', 'reject', 'request_changes'].includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    // Find the submission
    const submission = await db.collection("template_submissions").findOne({ id: submissionId });
    if (!submission) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    if (submission.status !== 'submitted' && submission.status !== 'under_review') {
      return NextResponse.json({ error: "Submission is not in a reviewable state" }, { status: 400 });
    }

    // Create review record
    const review = {
      id: `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      submissionId,
      reviewerId: session.user.id,
      reviewerName: user.name || user.email,
      action,
      rating: rating || null,
      notes: notes || '',
      reviewedAt: new Date(),
    };

    await db.collection("template_reviews").insertOne(review);

    // Update submission status
    let newStatus;
    if (action === 'approve') {
      newStatus = 'approved';

      // Move approved template to main templates collection
      const template = {
        slug: submission.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
        name: submission.title,
        status: "pending", // Will be reviewed by admin before going live
        category: submission.category,
        summary: submission.description.substring(0, 150) + (submission.description.length > 150 ? '...' : ''),
        description: submission.description,
        techStack: submission.techStack,
        features: submission.features,
        demoUrl: null,
        codeUrl: submission.githubUrl,
        deployment: submission.deployment,
        useCases: submission.useCases,
        submittedBy: submission.submitterId,
        approvedBy: session.user.id,
        approvedAt: new Date(),
        version: 1,
      };

      await db.collection("pending_templates").insertOne(template);

    } else if (action === 'reject') {
      newStatus = 'rejected';
    } else if (action === 'request_changes') {
      newStatus = 'changes_requested';
    }

    await db.collection("template_submissions").updateOne(
      { id: submissionId },
      {
        $set: { status: newStatus, lastReviewedAt: new Date() },
        $push: { reviewNotes: review }
      } as any
    );

    // Update reviewer reputation
    await db.collection("user").updateOne(
      { id: session.user.id },
      { $inc: { reputationScore: action === 'approve' ? 10 : 5 } }
    );

    // Update submitter reputation
    if (action === 'approve') {
      await db.collection("user").updateOne(
        { id: submission.submitterId },
        { $inc: { reputationScore: 25 } }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Template ${action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'changes requested'} successfully`
    });

  } catch (error) {
    console.error("Error reviewing submission:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
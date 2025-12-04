"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user, template_submissions } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userResult = await db.select().from(user).where(eq(user.id, session.user.id));
    const currentUser = userResult[0];

    // Check if user has reviewer role or higher
    if (!currentUser || (currentUser.role !== 'reviewer' && currentUser.role !== 'admin')) {
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
    const submissionResult = await db.select().from(template_submissions).where(eq(template_submissions.id, submissionId));
    const submission = submissionResult[0];
    if (!submission) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    if (submission.status !== 'submitted' && submission.status !== 'under_review') {
      return NextResponse.json({ error: "Submission is not in a reviewable state" }, { status: 400 });
    }

    // Create review record (for now, we'll store in submission reviewNotes)
    const review = {
      id: crypto.randomUUID(),
      reviewerId: session.user.id,
      reviewerName: currentUser.name || currentUser.email || 'Unknown',
      action,
      rating: rating || null,
      notes: notes || '',
      reviewedAt: new Date(),
    };

    // Update submission status
    let newStatus;
    if (action === 'approve') {
      newStatus = 'approved';

      // Note: pending_templates table not implemented yet - template stays in submissions

    } else if (action === 'reject') {
      newStatus = 'rejected';
    } else if (action === 'request_changes') {
      newStatus = 'changes_requested';
    }

    const currentReviewNotes = Array.isArray(submission.reviewNotes) ? submission.reviewNotes : [];
    await db.update(template_submissions).set({
      status: newStatus,
      lastReviewedAt: new Date(),
      reviewNotes: [...currentReviewNotes, review]
    }).where(eq(template_submissions.id, submissionId));

    // Update reviewer reputation
    await db.update(user).set({
      reputationScore: (currentUser.reputationScore || 0) + (action === 'approve' ? 10 : 5)
    }).where(eq(user.id, session.user.id));

    // Update submitter reputation
    if (action === 'approve' && submission.submitterId) {
      const submitterResult = await db.select({ reputationScore: user.reputationScore }).from(user).where(eq(user.id, submission.submitterId));
      const currentScore = submitterResult[0]?.reputationScore || 0;
      await db.update(user).set({
        reputationScore: currentScore + 25
      }).where(eq(user.id, submission.submitterId));
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
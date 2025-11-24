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
    const user = await db.collection("user").findOne({ id: session.user.id });

    // Check if user has admin role
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    // Get dashboard statistics
    const totalUsers = await db.collection("user").countDocuments();
    const totalSubmissions = await db.collection("template_submissions").countDocuments();
    const pendingReviews = await db.collection("template_submissions").countDocuments({
      status: { $in: ['submitted', 'under_review'] }
    });

    // Get approved today (submissions approved in the last 24 hours)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const approvedToday = await db.collection("template_submissions").countDocuments({
      status: 'approved',
      lastReviewedAt: { $gte: yesterday }
    });

    // Get recent activity (last 10 actions)
    const recentActivity = await db.collection("template_submissions")
      .find({})
      .sort({ submittedAt: -1 })
      .limit(10)
      .project({
        title: 1,
        submitterName: 1,
        status: 1,
        submittedAt: 1,
        lastReviewedAt: 1
      })
      .toArray();

    return NextResponse.json({
      totalUsers,
      totalSubmissions,
      pendingReviews,
      approvedToday,
      recentActivity: recentActivity.map(activity => ({
        type: activity.status === 'approved' ? 'approval' : 'submission',
        title: activity.title,
        user: activity.submitterName,
        timestamp: activity.lastReviewedAt || activity.submittedAt
      }))
    });

  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
import { auth } from "@/lib/auth";
import { getAuthDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    console.log("Admin dashboard API called");
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    console.log("Session:", session ? "exists" : "null");
    console.log("Session user:", session?.user);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await getAuthDatabase();
    let user = await db.collection("user").findOne({ id: session.user.id });

    if (!user && session.user.email) {
      user = await db.collection("user").findOne({ email: session.user.email });
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isAdmin = user.role === 'admin';

    // Get basic statistics (available to all users)
    const totalTemplates = await db.collection("templates").countDocuments();

    let totalUsers = 0;
    let totalSubmissions = 0;
    let pendingReviews = 0;
    let pendingTemplates = 0;
    let approvedToday = 0;
    let publishedToday = 0;

    if (isAdmin) {
      // Admin-only statistics
      totalUsers = await db.collection("user").countDocuments();
      totalSubmissions = await db.collection("template_submissions").countDocuments();
      pendingReviews = await db.collection("template_submissions").countDocuments({
        status: { $in: ['submitted', 'under_review'] }
      });
      pendingTemplates = await db.collection("pending_templates").countDocuments();

      // Get approved today (submissions approved in the last 24 hours)
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      approvedToday = await db.collection("template_submissions").countDocuments({
        status: 'approved',
        lastReviewedAt: { $gte: yesterday }
      });

      // Get published today (templates published in the last 24 hours)
      publishedToday = await db.collection("templates").countDocuments({
        publishedAt: { $gte: yesterday }
      });
    }

    let recentActivity: any[] = [];

    if (isAdmin) {
      // Get recent activity (last 10 actions) - admin only
      const activityData = await db.collection("template_submissions")
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

      recentActivity = activityData.map(activity => ({
        type: activity.status === 'approved' ? 'approval' : activity.status === 'published' ? 'publication' : 'submission',
        title: activity.title,
        user: activity.submitterName,
        timestamp: activity.lastReviewedAt || activity.submittedAt
      }));
    }

    return NextResponse.json({
      totalUsers,
      totalSubmissions,
      pendingReviews,
      pendingTemplates,
      totalTemplates,
      approvedToday,
      publishedToday,
      recentActivity
    });

  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
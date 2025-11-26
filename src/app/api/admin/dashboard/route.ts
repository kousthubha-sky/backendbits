import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user, templates, template_submissions } from "@/lib/schema";
import { eq, gte, desc, count, sql } from "drizzle-orm";
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

    let userResult = await db.select().from(user).where(eq(user.id, session.user.id));

    if (!userResult[0] && session.user.email) {
      userResult = await db.select().from(user).where(eq(user.email, session.user.email));
    }

    const currentUser = userResult[0];

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isAdmin = currentUser.role === 'admin';

    // Get basic statistics (available to all users)
    const totalTemplatesResult = await db.select({ count: count() }).from(templates);
    const totalTemplates = totalTemplatesResult[0]?.count || 0;

    let totalUsers = 0;
    let totalSubmissions = 0;
    let pendingReviews = 0;
    let pendingTemplates = 0;
    let approvedToday = 0;
    let publishedToday = 0;

    if (isAdmin) {
      // Admin-only statistics
      const totalUsersResult = await db.select({ count: count() }).from(user);
      totalUsers = totalUsersResult[0]?.count || 0;

      const totalSubmissionsResult = await db.select({ count: count() }).from(template_submissions);
      totalSubmissions = totalSubmissionsResult[0]?.count || 0;

      // Count pending reviews (simplified - count all submissions for now)
      const allSubmissions = await db.select().from(template_submissions);
      pendingReviews = allSubmissions.length;

      // Note: pending_templates table doesn't exist in our schema, skipping for now
      pendingTemplates = 0;

      // Get approved today (submissions approved in the last 24 hours) - simplified
      const approvedSubmissions = await db.select().from(template_submissions)
        .where(eq(template_submissions.status, 'approved'));
      approvedToday = approvedSubmissions.length;

      // Get published today (templates published in the last 24 hours) - simplified
      const allTemplates = await db.select().from(templates);
      publishedToday = allTemplates.length;
    }

    let recentActivity: any[] = [];

    if (isAdmin) {
      // Get recent activity (last 10 actions) - admin only
      const activityData = await db.select({
        title: template_submissions.title,
        submitterName: template_submissions.submitterName,
        status: template_submissions.status,
        submittedAt: template_submissions.submittedAt,
        lastReviewedAt: template_submissions.lastReviewedAt
      }).from(template_submissions).orderBy(desc(template_submissions.submittedAt)).limit(10);

      recentActivity = activityData.map(activity => ({
        type: activity.status === 'approved' ? 'approval' : activity.status === 'published' ? 'publication' : 'submission',
        title: activity.title,
        user: activity.submitterName || 'Unknown',
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
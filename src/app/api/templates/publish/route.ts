"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user, templates } from "@/lib/schema";
import { eq, desc, count } from "drizzle-orm";
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

    // Check if user has admin role
    if (!currentUser || currentUser.role !== 'admin') {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const body = await request.json();
    const { templateId, action } = body;

    if (!templateId || !action) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!['publish', 'reject'].includes(action)) {
      return NextResponse.json({ error: "Invalid action. Must be 'publish' or 'reject'" }, { status: 400 });
    }

    // Find the pending template (for now, we'll assume templates table has a status field)
    const pendingTemplateResult = await db.select().from(templates).where(eq(templates.id, templateId));
    const pendingTemplate = pendingTemplateResult[0];
    if (!pendingTemplate) {
      return NextResponse.json({ error: "Pending template not found" }, { status: 404 });
    }

    if (action === 'publish') {
      // Update template status to published
      await db.update(templates).set({
        status: "Production-ready",
        publishedAt: new Date(),
        version: (pendingTemplate.version || 1) + 1,
      }).where(eq(templates.id, templateId));

      // Update submitter reputation for successful publication
      if (pendingTemplate.submittedBy) {
        const submitterResult = await db.select({ reputationScore: user.reputationScore }).from(user).where(eq(user.id, pendingTemplate.submittedBy));
        const currentScore = submitterResult[0]?.reputationScore || 0;
        await db.update(user).set({
          reputationScore: currentScore + 50
        }).where(eq(user.id, pendingTemplate.submittedBy));
      }

      // Log the publication (TODO: implement logging table)
      console.log(`Template ${templateId} published by ${currentUser.name || currentUser.email}`);

      return NextResponse.json({
        success: true,
        message: "Template published successfully",
        template: pendingTemplate
      });

    } else if (action === 'reject') {
      // Update the template status to rejected
      await db.update(templates).set({
        status: "rejected",
      }).where(eq(templates.id, templateId));

      // Log the rejection (TODO: implement logging table)
      console.log(`Template ${templateId} rejected by ${currentUser.name || currentUser.email}`);

      return NextResponse.json({
        success: true,
        message: "Template rejected"
      });
    }

  } catch (error) {
    console.error("Error publishing template:", error);
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

    const userResult = await db.select().from(user).where(eq(user.id, session.user.id));
    const currentUser = userResult[0];

    // Check if user has admin role
    if (!currentUser || currentUser.role !== 'admin') {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Get templates (for now, get all - in future we might filter by status)
    const pendingTemplates = await db.select().from(templates)
      .orderBy(desc(templates.createdAt))
      .limit(limit)
      .offset(offset);

    const totalResult = await db.select({ count: count() }).from(templates);
    const total = totalResult[0]?.count || 0;

    return NextResponse.json({
      templates: pendingTemplates,
      total,
      limit,
      offset
    });

  } catch (error) {
    console.error("Error fetching pending templates:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
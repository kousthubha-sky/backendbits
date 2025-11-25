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

    // Check if user has admin role
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const body = await request.json();
    const { templateId, action, notes } = body;

    if (!templateId || !action) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!['publish', 'reject'].includes(action)) {
      return NextResponse.json({ error: "Invalid action. Must be 'publish' or 'reject'" }, { status: 400 });
    }

    // Find the pending template
    const pendingTemplate = await db.collection("pending_templates").findOne({ slug: templateId });
    if (!pendingTemplate) {
      return NextResponse.json({ error: "Pending template not found" }, { status: 404 });
    }

    if (action === 'publish') {
      // Move template to main templates collection
      const publishedTemplate = {
        ...pendingTemplate,
        status: "Production-ready", // Set to production ready when published
        publishedBy: session.user.id,
        publishedAt: new Date(),
        version: (pendingTemplate.version || 1) + 1,
      };

      // Insert into main templates collection
      await db.collection("templates").insertOne(publishedTemplate);

      // Remove from pending templates
      await db.collection("pending_templates").deleteOne({ slug: templateId });

      // Update submitter reputation for successful publication
      if (pendingTemplate.submittedBy) {
        await db.collection("user").updateOne(
          { id: pendingTemplate.submittedBy },
          { $inc: { reputationScore: 50 } } // Bonus for getting published
        );
      }

      // Log the publication
      await db.collection("template_publish_log").insertOne({
        templateId: templateId,
        action: 'published',
        adminId: session.user.id,
        adminName: user.name || user.email,
        notes: notes || '',
        publishedAt: new Date(),
        templateName: pendingTemplate.name,
      });

      return NextResponse.json({
        success: true,
        message: "Template published successfully",
        template: publishedTemplate
      });

    } else if (action === 'reject') {
      // Update the pending template with rejection notes
      await db.collection("pending_templates").updateOne(
        { slug: templateId },
        {
          $set: {
            status: "rejected",
            rejectedBy: session.user.id,
            rejectedAt: new Date(),
            rejectionNotes: notes || ''
          }
        }
      );

      // Log the rejection
      await db.collection("template_publish_log").insertOne({
        templateId: templateId,
        action: 'rejected',
        adminId: session.user.id,
        adminName: user.name || user.email,
        notes: notes || '',
        rejectedAt: new Date(),
        templateName: pendingTemplate.name,
      });

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

    const db = await getAuthDatabase();
    const user = await db.collection("user").findOne({ id: session.user.id });

    // Check if user has admin role
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Get pending templates
    const pendingTemplates = await db.collection("pending_templates")
      .find({})
      .sort({ approvedAt: -1 })
      .skip(offset)
      .limit(limit)
      .toArray();

    const total = await db.collection("pending_templates").countDocuments();

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
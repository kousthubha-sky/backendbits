"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle, XCircle, ExternalLink, Calendar, User } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PendingTemplate {
  slug: string;
  name: string;
  status: string;
  category: string;
  summary: string;
  description: string;
  techStack: string[];
  features: string[];
  demoUrl: string | null;
  codeUrl: string;
  deployment: Record<string, unknown>;
  useCases: Record<string, unknown>[];
  submittedBy: string;
  approvedBy: string;
  approvedAt: string;
}

export default function AdminTemplatesPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [templates, setTemplates] = useState<PendingTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<PendingTemplate | null>(null);
  const [action, setAction] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [processing, setProcessing] = useState(false);

  const checkAdminAccess = useCallback(async () => {
    try {
      const response = await fetch("/api/users/profile");
      if (response.ok) {
        const userData = await response.json();
        if (userData.role !== 'admin') {
          toast.error("Admin access required");
          router.push("/");
          return;
        }
        fetchPendingTemplates();
      }
    } catch {
      toast.error("Failed to verify admin access");
      router.push("/");
    }
   }, [router]);

   useEffect(() => {
     if (!isPending && !session) {
       router.push("/auth/login");
       return;
     }

     if (session) {
       checkAdminAccess();
     }
   }, [session, isPending, router, checkAdminAccess]);

   const fetchPendingTemplates = async () => {
    try {
      const response = await fetch("/api/templates/publish");
      if (response.ok) {
        const data = await response.json();
        setTemplates(data.templates || []);
      } else {
        toast.error("Failed to load pending templates");
      }
    } catch (error) {
      console.error("Error fetching pending templates:", error);
      toast.error("Failed to load pending templates");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async () => {
    if (!selectedTemplate || !action) return;

    setProcessing(true);
    try {
      const response = await fetch("/api/templates/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          templateId: selectedTemplate.slug,
          action,
          notes,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(result.message);

        // Remove the template from the list
        setTemplates(templates.filter(t => t.slug !== selectedTemplate.slug));
        setSelectedTemplate(null);
        setAction('');
        setNotes('');
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to process template");
      }
    } catch (error) {
      console.error("Error processing template:", error);
      toast.error("Failed to process template");
    } finally {
      setProcessing(false);
    }
  };

  if (isPending || loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-32 flex items-center justify-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-black mb-2">Template Management</h1>
                <p className="text-gray-600">Review and publish pending templates</p>
              </div>
              <Button variant="outline" onClick={() => router.push('/admin')}>
                Back to Dashboard
              </Button>
            </div>
          </div>

          {templates.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">All Caught Up!</h3>
                <p className="text-gray-600 text-center">
                  There are no pending templates waiting for review.
                  <br />
                  New submissions will appear here when they&apos;re approved by reviewers.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Card key={template.slug} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2">{template.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {template.category} • {template.techStack.slice(0, 2).join(", ")}
                          {template.techStack.length > 2 && "..."}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {template.summary}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        Approved {new Date(template.approvedAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <User className="h-3 w-3 mr-1" />
                        Submitted by user
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(template.codeUrl, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View Code
                      </Button>

                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => {
                            setSelectedTemplate(template);
                            setAction('reject');
                          }}
                          disabled={processing}
                        >
                          <XCircle className="h-3 w-3 mr-1" />
                          Reject
                        </Button>

                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => {
                            setSelectedTemplate(template);
                            setAction('publish');
                          }}
                          disabled={processing}
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Publish
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Action Form */}
          {selectedTemplate && action && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>
                  {action === 'publish' ? 'Publish Template' : 'Reject Template'}
                </CardTitle>
                <CardDescription>
                  {action === 'publish'
                    ? `Publish "${selectedTemplate.name}" to make it available to all users.`
                    : `Reject "${selectedTemplate.name}". This action cannot be undone.`
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">
                      {action === 'publish' ? 'Publication Notes (Optional)' : 'Rejection Notes (Optional)'}
                    </label>
                    <textarea
                      placeholder={action === 'publish' ? "Add any notes about this publication..." : "Provide feedback for the submitter..."}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedTemplate(null);
        setAction('');
                        setNotes('');
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant={action === 'publish' ? 'default' : 'destructive'}
                      onClick={handleAction}
                      disabled={processing}
                      className={action === 'publish' ? 'bg-green-600 hover:bg-green-700' : ''}
                    >
                      {processing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      {action === 'publish' ? 'Publish Template' : 'Reject Template'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
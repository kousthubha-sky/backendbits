"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus, Eye, CheckCircle, XCircle, Clock, AlertCircle, Star, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Submission {
  id: string;
  submitterId: string;
  submitterName: string;
  status: string;
  submittedAt: string;
  title: string;
  description: string;
  githubUrl: string;
  category: string;
  techStack: string[];
  features: string[];
  reviewNotes: any[];
}

interface Submission {
  id: string;
  submitterId: string;
  submitterName: string;
  status: string;
  submittedAt: string;
  title: string;
  description: string;
  githubUrl: string;
  category: string;
  techStack: string[];
  features: string[];
  reviewNotes: any[];
}

export default function ContributePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("submit");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userRole, setUserRole] = useState<string>('user');
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    githubUrl: "",
    category: "",
    techStack: [] as string[],
    features: [] as string[],
  });

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/auth/login");
      return;
    }

    if (session) {
      fetchUserRole();
      fetchSubmissions();
    }
  }, [session, isPending, router]);

  useEffect(() => {
    // Update role when it changes
    if (userRole) {
      // Role updated, can refresh UI if needed
    }
  }, [userRole]);

  const fetchUserRole = async () => {
    try {
      const response = await fetch("/api/users/profile");
      if (response.ok) {
        const userData = await response.json();
        setUserRole(userData.role || 'user');
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const response = await fetch("/api/contributions/submit");
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data.submissions || []);
      }
    } catch (error) {
      console.error("Error fetching submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/contributions/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Template submitted successfully!");
        setFormData({
          title: "",
          description: "",
          githubUrl: "",
          category: "",
          techStack: [],
          features: [],
        });
        fetchSubmissions(); // Refresh submissions
        setActiveTab("my-submissions");
      } else {
        toast.error(data.error || "Failed to submit template");
      }
    } catch (error) {
      toast.error("Failed to submit template");
    } finally {
      setSubmitting(false);
    }
  };

  const addTechStack = (tech: string) => {
    if (tech.trim() && !formData.techStack.includes(tech.trim())) {
      setFormData(prev => ({
        ...prev,
        techStack: [...prev.techStack, tech.trim()]
      }));
    }
  };

  const removeTechStack = (techToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.filter(tech => tech !== techToRemove)
    }));
  };

  const addFeature = (feature: string) => {
    if (feature.trim() && !formData.features.includes(feature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, feature.trim()]
      }));
    }
  };

  const removeFeature = (featureToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(feature => feature !== featureToRemove)
    }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'under_review':
        return <Eye className="h-4 w-4 text-blue-500" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'changes_requested':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const colors: { [key: string]: string } = {
      submitted: "bg-yellow-100 text-yellow-800",
      under_review: "bg-blue-100 text-blue-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      changes_requested: "bg-orange-100 text-orange-800"
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[status] || "bg-gray-100 text-gray-800"}`}>
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
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

  const canSubmit = true; // All authenticated users can submit
  const canReview = userRole === 'admin'; // Only admins can review

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-black mb-2">Contribute</h1>
            <p className="text-gray-600">Share your templates with the community</p>
          </div>

          <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("submit")}
                className={`px-4 py-2 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === "submit"
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <Plus className="h-4 w-4" />
                Submit Template
              </button>
              <button
                onClick={() => setActiveTab("my-submissions")}
                className={`px-4 py-2 border-b-2 font-medium text-sm ${
                  activeTab === "my-submissions"
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                My Submissions
              </button>
              {canReview && (
                <button
                  onClick={() => setActiveTab("review")}
                  className={`px-4 py-2 border-b-2 font-medium text-sm ${
                    activeTab === "review"
                      ? "border-black text-black"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Review Queue
                </button>
              )}
            </div>

            {/* Submit Tab */}
            {activeTab === "submit" && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Template Information</CardTitle>
                    <CardDescription>Basic information about your template</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="My Awesome Template"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <select
                          id="category"
                          value={formData.category}
                          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          required
                        >
                          <option value="">Select category</option>
                          <option value="auth">Authentication</option>
                          <option value="payment">Payment</option>
                          <option value="personal">Personal</option>
                          <option value="Portfolio">Portfolio</option>
                          <option value="AI projects">AI Projects</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe what your template does..."
                        rows={3}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="githubUrl">GitHub Repository URL *</Label>
                      <Input
                        id="githubUrl"
                        value={formData.githubUrl}
                        onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
                        placeholder="https://github.com/username/repo"
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Technical Details</CardTitle>
                    <CardDescription>Technology stack and features</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Tech Stack</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {formData.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md cursor-pointer hover:bg-blue-200"
                            onClick={() => removeTechStack(tech)}
                          >
                            {tech} ×
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add technology..."
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const input = e.target as HTMLInputElement;
                              addTechStack(input.value);
                              input.value = '';
                            }
                          }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Features</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {formData.features.map((feature) => (
                          <span
                            key={feature}
                            className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-md cursor-pointer hover:bg-green-200"
                            onClick={() => removeFeature(feature)}
                          >
                            {feature} ×
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add feature..."
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const input = e.target as HTMLInputElement;
                              addFeature(input.value);
                              input.value = '';
                            }
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button type="submit" disabled={submitting}>
                    {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Submit Template
                  </Button>
                </div>
              </form>
            )}

            {/* Review Tab */}
            {canReview && activeTab === "review" && (
              <ReviewQueue />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function ReviewQueue() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [reviewAction, setReviewAction] = useState<'approve' | 'reject' | 'request_changes'>('approve');
  const [reviewRating, setReviewRating] = useState(3);
  const [reviewNotes, setReviewNotes] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    fetchPendingReviews();
  }, []);

  const fetchPendingReviews = async () => {
    try {
      const response = await fetch('/api/contributions/submit?status=submitted&status=under_review');
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data.submissions || []);
      }
    } catch (error) {
      console.error('Error fetching pending reviews:', error);
      toast.error('Failed to load pending reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async () => {
    if (!selectedSubmission) return;

    setSubmittingReview(true);
    try {
      const response = await fetch(`/api/contributions/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          submissionId: selectedSubmission.id,
          action: reviewAction,
          rating: reviewRating,
          notes: reviewNotes,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`Template ${reviewAction === 'approve' ? 'approved' : reviewAction === 'reject' ? 'rejected' : 'changes requested'} successfully`);
        setSelectedSubmission(null);
        setReviewNotes('');
        setReviewRating(3);
        fetchPendingReviews(); // Refresh the queue
      } else {
        toast.error(data.error || 'Failed to submit review');
      }
    } catch (error) {
      toast.error('Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Review Queue */}
      <Card>
        <CardHeader>
          <CardTitle>Review Queue ({submissions.length})</CardTitle>
          <CardDescription>Review pending template submissions</CardDescription>
        </CardHeader>
        <CardContent>
          {submissions.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <p className="text-gray-600">No pending reviews. Great job!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {submissions.map((submission) => (
                <div key={submission.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{submission.title}</h3>
                      <p className="text-gray-600 mb-2">{submission.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                        <span>By: {submission.submitterName}</span>
                        <span>Category: {submission.category}</span>
                        <span>Submitted: {new Date(submission.submittedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {submission.techStack.slice(0, 4).map((tech) => (
                          <span key={tech} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md">
                            {tech}
                          </span>
                        ))}
                        {submission.techStack.length > 4 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                            +{submission.techStack.length - 4} more
                          </span>
                        )}
                      </div>
                      <a
                        href={submission.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        View Repository →
                      </a>
                    </div>
                    <Button
                      onClick={() => setSelectedSubmission(submission)}
                      className="ml-4"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Review Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Review Submission</CardTitle>
              <CardDescription>
                Review "{selectedSubmission.title}" by {selectedSubmission.submitterName}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Submission Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Submission Details</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Title:</strong> {selectedSubmission.title}</p>
                    <p><strong>Category:</strong> {selectedSubmission.category}</p>
                    <p><strong>Submitted:</strong> {new Date(selectedSubmission.submittedAt).toLocaleDateString()}</p>
                    <p>
                      <strong>Repository:</strong>{" "}
                      <a
                        href={selectedSubmission.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {selectedSubmission.githubUrl}
                      </a>
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Technical Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSubmission.techStack.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <h4 className="font-semibold mb-2 mt-4">Features</h4>
                  <ul className="text-sm space-y-1">
                    {selectedSubmission.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-gray-700">{selectedSubmission.description}</p>
              </div>

              {/* Review Form */}
              <div className="border-t pt-6">
                <h4 className="font-semibold mb-4">Your Review</h4>

                <div className="space-y-4">
                  <div>
                    <Label>Decision</Label>
                    <div className="flex gap-4 mt-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="reviewAction"
                          value="approve"
                          checked={reviewAction === 'approve'}
                          onChange={(e) => setReviewAction(e.target.value as any)}
                        />
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Approve
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="reviewAction"
                          value="reject"
                          checked={reviewAction === 'reject'}
                          onChange={(e) => setReviewAction(e.target.value as any)}
                        />
                        <XCircle className="h-4 w-4 text-red-500" />
                        Reject
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="reviewAction"
                          value="request_changes"
                          checked={reviewAction === 'request_changes'}
                          onChange={(e) => setReviewAction(e.target.value as any)}
                        />
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                        Request Changes
                      </label>
                    </div>
                  </div>

                  <div>
                    <Label>Rating (1-5 stars)</Label>
                    <div className="flex gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setReviewRating(star)}
                          className={`p-1 ${star <= reviewRating ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                          <Star className="h-6 w-6 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="reviewNotes">Review Notes</Label>
                    <textarea
                      id="reviewNotes"
                      value={reviewNotes}
                      onChange={(e) => setReviewNotes(e.target.value)}
                      placeholder="Provide detailed feedback for the submitter..."
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent mt-1"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedSubmission(null);
                    setReviewNotes('');
                    setReviewRating(3);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleReview}
                  disabled={submittingReview || !reviewNotes.trim()}
                >
                  {submittingReview && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Submit Review
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
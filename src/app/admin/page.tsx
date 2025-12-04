"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, FileText, CheckCircle, Clock, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface User {
  id: string;
  name?: string;
  email?: string;
  image?: string;
  role?: string;
  reputationScore?: number;
  joinedDate?: string;
  lastActive?: string;
  isVerified?: boolean;
}

interface DashboardStats {
  totalUsers: number;
  totalSubmissions: number;
  pendingReviews: number;
  pendingTemplates: number;
  totalTemplates: number;
  approvedToday: number;
  publishedToday: number;
  recentActivity?: unknown[];
}

export default function AdminDashboard() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdminAccess = useCallback(async () => {
    try {
      console.log("Checking admin access...");
      const response = await fetch("/api/users/profile");
      console.log("Profile response status:", response.status);

      if (response.ok) {
        const userData = await response.json();
        console.log("User data:", userData);
        const adminStatus = userData.role === 'admin';
        console.log("Is admin:", adminStatus);
        setIsAdmin(adminStatus);

        // Fetch dashboard data (some data is available to all users)
        fetchDashboardData(adminStatus);
      } else {
        console.log("Profile fetch failed");
        // If profile fetch fails, assume not admin
        setIsAdmin(false);
        fetchDashboardData(false);
      }
    } catch (_error) {
      console.error("Error checking admin access:", _error);
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

   const fetchDashboardData = async (isUserAdmin: boolean) => {
    try {
      // Only fetch users if user is admin
      if (isUserAdmin) {
        const usersResponse = await fetch("/api/admin/users");
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          setUsers(usersData.users || []);
        }
      } else {
        // Clear users list for non-admins
        setUsers([]);
      }

      // Fetch dashboard stats (available to all users)
      const statsResponse = await fetch("/api/admin/dashboard");
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const promoteToRole = async (role: 'reviewer' | 'admin') => {
    try {
      console.log(`Attempting to promote to ${role}...`);
      const response = await fetch("/api/admin/bootstrap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      });

      console.log(`Bootstrap response status:`, response.status);

      if (response.ok) {
        const result = await response.json();
        console.log("Bootstrap result:", result);
        toast.success(`Successfully promoted to ${role}!`);

        if (role === 'admin') {
          setIsAdmin(true);
          fetchDashboardData(true); // Refresh data as admin
        } else {
          // Refresh to check new role
          checkAdminAccess();
        }
      } else {
        const error = await response.json();
        console.log("Bootstrap error:", error);
        toast.error(error.error || `Failed to promote to ${role}`);
      }
    } catch (error) {
      console.error(`Error promoting to ${role}:`, error);
      toast.error(`Failed to promote to ${role}`);
    }
  };

  const promoteToAdmin = () => promoteToRole('admin');



  const updateUserRole = async (userId: string, newRole: string) => {
    if (!isAdmin) {
      toast.error("Admin privileges required");
      return;
    }

    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, newRole }),
      });

      if (response.ok) {
        toast.success("User role updated successfully");
        fetchDashboardData(isAdmin); // Refresh the data
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to update user role");
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error("Failed to update user role");
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
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-black mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage users and platform settings</p>
            {!isAdmin && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 mb-2">
                  You need admin privileges to fully manage the platform.
                </p>
                <div className="flex gap-2">
                  <Button onClick={() => promoteToRole('reviewer')} variant="outline">
                    Become Reviewer
                  </Button>
                  <Button onClick={promoteToAdmin} className="bg-yellow-600 hover:bg-yellow-700">
                    Become Admin
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Dashboard Stats */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Templates</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalTemplates}</div>
                </CardContent>
              </Card>
              {isAdmin && (
                <>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Pending Templates</CardTitle>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.pendingTemplates}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Published Today</CardTitle>
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.publishedToday}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.pendingReviews}</div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {isAdmin && (
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>View and manage user roles</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {users.slice(0, 5).map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white font-bold">
                              {user.name?.charAt(0)?.toUpperCase() || "U"}
                            </div>
                            <div>
                              <p className="font-medium">{user.name || "Anonymous"}</p>
                              <p className="text-sm text-gray-600">{user.email}</p>
                              <p className="text-xs text-gray-500">Role: {user.role || 'user'}</p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateUserRole(user.id, user.role === 'admin' ? 'user' : 'admin')}
                          >
                            {user.role === 'admin' ? 'Demote' : 'Promote to Admin'}
                          </Button>
                        </div>
                      ))}
                      {users.length > 5 && (
                        <div className="text-center pt-4">
                          <Button variant="outline">View All Users</Button>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Template Management</CardTitle>
                <CardDescription>Review and publish pending templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isAdmin ? (
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">
                        {stats?.pendingTemplates || 0} templates waiting for publication
                      </p>
                      <Button
                        onClick={() => router.push('/admin/templates')}
                        disabled={(stats?.pendingTemplates || 0) === 0}
                      >
                        Review Templates
                      </Button>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">
                      Become an admin to review and publish templates
                    </p>
                  )}
                  {stats && stats.pendingTemplates === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No pending templates to review</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Users } from "lucide-react";
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
  approvedToday: number;
}

export default function AdminDashboard() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/auth/login");
      return;
    }

    if (session) {
      checkAdminAccess();
    }
  }, [session, isPending, router]);

  const checkAdminAccess = async () => {
    try {
      const response = await fetch("/api/users/profile");
      if (response.ok) {
        const userData = await response.json();
        if (userData.role !== 'admin') {
          toast.error("Admin access required");
          router.push("/");
          return;
        }
        fetchUsers();
      }
    } catch (error) {
      toast.error("Failed to verify admin access");
      router.push("/");
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || []);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
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
          </div>

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
                  {users.map((user) => (
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
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface UserProfile {
  id: string;
  name?: string;
  email?: string;
  image?: string;
  role?: string;
  reputationScore?: number;
  githubUsername?: string;
  avatarUrl?: string;
  bio?: string;
  website?: string;
  location?: string;
  skills?: string[];
  isVerified?: boolean;
  verificationBadge?: string;
  joinedDate?: string;
  lastActive?: string;
}

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    website: "",
    location: "",
    skills: [] as string[],
    githubUsername: "",
    avatarUrl: "",
  });

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/auth/login");
      return;
    }

    if (session) {
      fetchProfile();
    }
  }, [session, isPending, router]);

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/users/profile");
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setFormData({
          name: data.name || "",
          bio: data.bio || "",
          website: data.website || "",
          location: data.location || "",
          skills: data.skills || [],
          githubUsername: data.githubUsername || "",
          avatarUrl: data.avatarUrl || "",
        });


      }
    } catch {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Profile updated successfully");
        fetchProfile(); // Refresh profile data
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to update profile");
      }
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };



  const getRoleBadgeColor = (role?: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'reviewer': return 'bg-blue-100 text-blue-800';
      case 'contributor': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const addSkill = (skill: string) => {
    if (skill.trim() && !formData.skills.includes(skill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill.trim()]
      }));
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
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
            <h1 className="text-4xl font-bold text-black mb-2">Profile</h1>
            <p className="text-gray-600">Manage your account settings and preferences</p>
          </div>

          <div className="space-y-6">
            {/* Profile Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Your public profile information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-black text-white text-2xl font-bold">
                    {profile?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold">{profile?.name || "Anonymous"}</h3>
                    <p className="text-gray-600">{profile?.email}</p>
                    {profile?.role && (
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full mt-1">
                        {profile.role}
                      </span>
                    )}
                  </div>
                </div>

                {profile?.bio && (
                  <div>
                    <Label className="text-sm font-medium">Bio</Label>
                    <p className="text-gray-700 mt-1">{profile.bio}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile?.location && (
                    <div>
                      <Label className="text-sm font-medium">Location</Label>
                      <p className="text-gray-700 mt-1">{profile.location}</p>
                    </div>
                  )}

                  {profile?.website && (
                    <div>
                      <Label className="text-sm font-medium">Website</Label>
                      <a
                        href={profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline mt-1 block"
                      >
                        {profile.website}
                      </a>
                    </div>
                  )}
                </div>

                {profile?.skills && profile.skills.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium">Skills</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profile.skills.map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-black">
                        {profile?.reputationScore || 0}
                      </div>
                      <div className="text-sm text-gray-600">Reputation</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-black">0</div>
                      <div className="text-sm text-gray-600">Contributions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-black">
                        {profile?.joinedDate ? new Date(profile.joinedDate).getFullYear() : new Date().getFullYear()}
                      </div>
                      <div className="text-sm text-gray-600">Member Since</div>
                    </div>
                  </div>

                  {/* Role Display */}
                  <div className="pt-4 border-t">
                    <Label className="text-sm font-medium">Role</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleBadgeColor(profile?.role)}`}>
                        {profile?.role || 'user'}
                      </span>
                    </div>
                  </div>
              </CardContent>
            </Card>

            {/* Edit Profile */}
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>Update your profile information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="githubUsername">GitHub Username</Label>
                    <Input
                      id="githubUsername"
                      value={formData.githubUsername}
                      onChange={(e) => setFormData(prev => ({ ...prev, githubUsername: e.target.value }))}
                      placeholder="your-github-username"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell us about yourself..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Skills</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md cursor-pointer hover:bg-blue-200"
                        onClick={() => removeSkill(skill)}
                      >
                        {skill} ×
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a skill..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const input = e.target as HTMLInputElement;
                          addSkill(input.value);
                          input.value = '';
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={saving}>
                    {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
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
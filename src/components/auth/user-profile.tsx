"use client";


import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useSession, authClient } from "@/lib/auth-client";
import { LogOut, User } from "lucide-react";

export function UserProfile() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("Successfully signed out");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Failed to sign out");
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="px-2 py-1">
        <p className="text-sm font-medium">{session.user.name || "User"}</p>
        <p className="text-xs text-gray-500">{session.user.email}</p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push("/profile")}
        className="gap-2 justify-start w-full"
      >
        <User className="h-4 w-4" />
        View Profile
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleSignOut}
        className="gap-2 justify-start w-full"
      >
        <LogOut className="h-4 w-4" />
        Sign Out
      </Button>
    </div>
  );
}
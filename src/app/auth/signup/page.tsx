import Link from "next/link";
import { SignupForm } from "@/components/auth/signup-form";
import { getOptionalServerSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export default async function SignupPage() {
  // If user is already authenticated, redirect to home
  const session = await getOptionalServerSession();
  if (session) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <Link href="/" className="inline-block mb-4">
            <div className="flex items-center gap-2 justify-center">
              <div className="flex items-center -space-x-1">
                <div className="w-3 h-3 bg-black rounded-sm" />
                <div className="w-3 h-3 bg-gray-400 rounded-full" />
              </div>
              <span className="text-xl font-bold">stack-end®</span>
            </div>
          </Link>
        </div>
        
        <SignupForm />
        
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="hover:text-brand underline underline-offset-4 font-medium"
          >
            Sign in
          </Link>
        </p>
        <p className="text-center text-sm text-muted-foreground">
          <Link
            href="/"
            className="hover:text-brand underline underline-offset-4"
          >
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
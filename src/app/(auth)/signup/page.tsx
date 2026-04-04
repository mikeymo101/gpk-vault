"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/collection");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 gpk-wallpaper">
      <div className="w-full max-w-md gpk-panel p-6">
        <div className="text-center mb-6">
          <img src="/logo.png" alt="GPK Vault" className="h-16 mx-auto drop-shadow-[3px_3px_0_rgba(0,0,0,0.2)] mb-3" />
          <p className="text-sm text-[#555]">
            Create your collector account
          </p>
        </div>
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={3}
                maxLength={30}
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <button type="submit" className="gpk-btn-primary w-full text-sm" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>
          <p className="text-center text-sm text-[#555] mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-[#7ED957] font-bold hover:underline">
              Sign in
            </Link>
          </p>
      </div>
    </div>
  );
}

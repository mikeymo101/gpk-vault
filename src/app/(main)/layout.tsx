import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { NavBar } from "@/components/NavBar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="min-h-screen bg-[#F2E8D5] relative">
      {/* Subtle GPK pattern */}
      <div className="gpk-wallpaper-subtle" />

      <div className="relative z-10">
        <NavBar user={user} profile={profile} />
        <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-6xl">
          <div className="gpk-panel p-4 sm:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

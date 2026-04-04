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
    <div className="min-h-screen gpk-wallpaper">
      <NavBar user={user} profile={profile} />
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-5xl">
        <div className="rounded-2xl border-4 border-[#d4a0b0]/60 bg-[#e8dcc8]/95 shadow-xl overflow-hidden backdrop-blur-sm">
          <div className="p-4 sm:p-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { User } from "@supabase/supabase-js";
import type { Profile } from "@/types";

const navLinks = [
  { href: "/collection", label: "My Collection" },
  { href: "/sets", label: "Browse Sets" },
];

export function NavBar({
  user,
  profile,
}: {
  user: User;
  profile: Profile | null;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const displayName = profile?.display_name || profile?.username || user.email;
  const initials = (displayName || "U").slice(0, 2).toUpperCase();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-7xl flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/collection" className="font-bold text-lg tracking-tight">
            GPK Vault
          </Link>
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={pathname.startsWith(link.href) ? "secondary" : "ghost"}
                  size="sm"
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="relative h-8 w-8 rounded-full inline-flex items-center justify-center hover:bg-accent">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">{initials}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="text-xs text-muted-foreground" disabled>
              {user.email}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut}>
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

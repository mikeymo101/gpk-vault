"use client";

import { useState } from "react";
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
  { href: "/collection", label: "Collection" },
  { href: "/sets", label: "Sets" },
  { href: "/needs", label: "Need" },
  { href: "/trades", label: "Trades" },
  { href: "/search", label: "Search" },
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
  const [mobileOpen, setMobileOpen] = useState(false);

  const displayName = profile?.display_name || profile?.username || user.email;
  const initials = (displayName || "U").slice(0, 2).toUpperCase();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="bg-gradient-to-r from-green-800 via-green-700 to-green-800 sticky top-0 z-50 shadow-lg border-b-2 border-green-900/30">
      <div className="container mx-auto px-4 max-w-7xl flex h-12 items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/collection" className="flex items-center gap-1.5">
            <span className="font-black text-lg tracking-tighter text-yellow-300 drop-shadow">GPK</span>
            <span className="font-bold text-lg tracking-tight text-white/90">VAULT</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <button
                  className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wide transition-colors ${
                    pathname.startsWith(link.href)
                      ? "bg-green-900/60 text-yellow-300"
                      : "text-green-100/80 hover:bg-green-600/40 hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile hamburger */}
          <button
            className="sm:hidden h-8 w-8 p-0 inline-flex items-center justify-center text-green-100/80 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="8" x2="20" y2="8" />
                  <line x1="4" y1="16" x2="20" y2="16" />
                </>
              )}
            </svg>
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger className="relative h-8 w-8 rounded-full inline-flex items-center justify-center hover:bg-green-600/40">
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
      </div>

      {/* Mobile nav dropdown */}
      {mobileOpen && (
        <div className="sm:hidden bg-green-800/90 border-t border-green-600/30 px-4 py-2 space-y-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
            >
              <button
                className={`w-full text-left px-3 py-2 rounded text-sm font-bold uppercase tracking-wide transition-colors ${
                  pathname.startsWith(link.href)
                    ? "bg-green-900/60 text-yellow-300"
                    : "text-green-100/80 hover:bg-green-600/40 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

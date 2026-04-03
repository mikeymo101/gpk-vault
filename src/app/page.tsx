import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="text-center space-y-6 max-w-lg">
        <h1 className="text-5xl font-bold tracking-tight">GPK Vault</h1>
        <p className="text-xl text-muted-foreground">
          Track your Garbage Pail Kids collection. Find trades. Buy &amp; sell.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/login">
            <Button size="lg">Sign In</Button>
          </Link>
          <Link href="/signup">
            <Button size="lg" variant="outline">
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

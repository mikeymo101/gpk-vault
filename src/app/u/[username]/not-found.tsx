import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProfileNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Collector not found</h2>
        <p className="text-muted-foreground mt-2">
          This username doesn&apos;t exist.
        </p>
        <Link href="/" className="mt-4 inline-block">
          <Button variant="outline">Go Home</Button>
        </Link>
      </div>
    </div>
  );
}

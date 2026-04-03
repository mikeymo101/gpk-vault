import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SetNotFound() {
  return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold">Set not found</h2>
      <p className="text-muted-foreground mt-2">
        This set doesn&apos;t exist or may have been removed.
      </p>
      <Link href="/sets" className="mt-4 inline-block">
        <Button variant="outline">Back to Sets</Button>
      </Link>
    </div>
  );
}

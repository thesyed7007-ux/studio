import { Briefcase } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <Briefcase className="h-7 w-7 text-primary" />
      <span className="font-headline text-xl font-bold text-foreground">CareerCopilot</span>
    </Link>
  );
}

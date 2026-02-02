
"use client";

import { usePathname } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutGrid,
  Search,
  FileText,
  DollarSign,
  MessageSquare,
  Building2,
  PlusCircle,
  ClipboardSignature,
  Mail,
  BookOpen,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useUser, useFirestore, useMemoFirebase, useDoc } from "@/firebase";
import { doc } from "firebase/firestore";

const ProBadge = () => (
    <Badge variant="default" className="absolute right-3 top-1/2 -translate-y-1/2 h-auto px-2 py-0.5 leading-none group-data-[collapsible=icon]:hidden">
      Pro
    </Badge>
);

const navItems = [
  { href: "/dashboard", icon: <LayoutGrid />, label: "Dashboard" },
  { href: "/jobs", icon: <Search />, label: "Job Search" },
  { href: "/resume-builder", icon: <ClipboardSignature />, label: "Resume Builder" },
  { href: "/resume-doctor", icon: <FileText />, label: "Resume Doctor", isPro: true },
  { href: "/salary-coach", icon: <DollarSign />, label: "Salary Coach", isPro: true },
  { href: "/interview-prep", icon: <MessageSquare />, label: "Interview Prep", isPro: true },
  { href: "/companies", icon: <Building2 />, label: "Companies" },
  { href: "/articles", icon: <BookOpen />, label: "Career Hub" },
  { href: "/post-a-job", icon: <PlusCircle />, label: "Post a Job" },
  { href: "/email-assistant", icon: <Mail />, label: "Email Assistant", isPro: true },
];

export function MainNav() {
  const pathname = usePathname();
  const { user } = useUser();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);

  const { data: userProfile } = useDoc<{ isPro?: boolean }>(userDocRef);
  const isProUser = userProfile?.isPro ?? false;

  return (
    <SidebarMenu>
      {navItems.map((item) => {
        const isFeatureLocked = item.isPro && !isProUser;
        const targetHref = isFeatureLocked ? '/upgrade' : item.href;

        return (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith(item.href) && !isFeatureLocked}
              tooltip={item.label}
            >
              <Link href={targetHref}>
                {isFeatureLocked ? <Lock /> : item.icon}
                <span>{item.label}</span>
                {item.isPro && <ProBadge />}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}

    
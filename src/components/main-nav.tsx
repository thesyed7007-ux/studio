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
} from "lucide-react";
import Link from "next/link";

const navItems = [
  { href: "/dashboard", icon: <LayoutGrid />, label: "Dashboard" },
  { href: "/jobs", icon: <Search />, label: "Job Search" },
  { href: "/resume-builder", icon: <ClipboardSignature />, label: "Resume Builder" },
  { href: "/resume-doctor", icon: <FileText />, label: "Resume Doctor" },
  { href: "/salary-coach", icon: <DollarSign />, label: "Salary Coach" },
  { href: "/interview-prep", icon: <MessageSquare />, label: "Interview Prep" },
  { href: "/companies", icon: <Building2 />, label: "Companies" },
  { href: "/articles", icon: <BookOpen />, label: "Career Hub" },
  { href: "/post-a-job", icon: <PlusCircle />, label: "Post a Job" },
  { href: "/email-assistant", icon: <Mail />, label: "Email Assistant" },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname.startsWith(item.href)}
            tooltip={item.label}
          >
            <Link href={item.href}>
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Settings, UsersIcon } from "lucide-react";

import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
} from "react-icons/go";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { usePathname } from "next/navigation";

const routes = [
  {
    label: "Home",
    href: "",
    icon: GoHome,
    activeIcon: GoHomeFill,
  },
  {
    label: "My Task",
    href: "/tasks",
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
    activeIcon: Settings,
  },
  {
    label: "Members",
    href: "/members",
    icon: UsersIcon,
    activeIcon: UsersIcon,
  },
];

export const Navigation = () => {
  const workspaceId = useWorkspaceId();
  const pathname = usePathname();

  return (
    <ul className="flex flex-col">
      {routes.map((i) => {
        const fullHref = `/workspaces/${workspaceId}${i.href}`;

        const isActive = pathname === fullHref;
        const Icon = isActive ? i.activeIcon : i.icon;
        return (
          <Link href={fullHref} key={i.href}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500",
                isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
              )}
            >
              <Icon className="size-5 text-neutral-700" />
              {i.label}
            </div>
          </Link>
        );
      })}
    </ul>
  );
};

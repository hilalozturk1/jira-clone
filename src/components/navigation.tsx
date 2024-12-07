"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

import { Settings, UsersIcon } from "lucide-react";

import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
} from "react-icons/go";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

const routes = [
  {
    label: "Home",
    href: "/",
    icon: GoHome,
    activeIcon: GoHomeFill,
    key: 1,
  },
  {
    label: "My Task",
    href: "/tasks",
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
    key: 2,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
    activeIcon: Settings,
    key: 3,
  },
  {
    label: "Members",
    href: "/members",
    icon: UsersIcon,
    activeIcon: UsersIcon,
    key: 4,
  },
];

export const Navigation = () => {
  const workspaceId = useWorkspaceId();
  const ref = useRef(null);

  const [key, setKey] = useState<number>();

  const handleClick = (e: any, i: any) => {
    setKey(i);
  };

  return (
    <ul className="flex flex-col">
      {routes.map((i) => {
        const fullHref = `/workspaces/${workspaceId}${i.href}`;

        const isActive = key === i.key;
        const Icon = isActive ? i.activeIcon : i.icon;

        return (
          <Link
            href={fullHref}
            key={i.href}
            onClick={(e) => handleClick(e, i.key)}
          >
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-md hover:text-slate-600 transition text-slate-500 h-10 text-[14px]",
                isActive && "bg-white shadow-sm hover:opacity-100 h-10"
              )}
            >
              <Icon className="size-4 text-neutral-500 text-md" />
              <span ref={ref} key={i.key}>
                {i.label}
              </span>
            </div>
          </Link>
        );
      })}
    </ul>
  );
};

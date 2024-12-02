"use client";

import { UserButton } from "@/features/auth/components/user-button";
import MobileSidebar from "./mobile-sidebar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function Navbar() {
  const pathname = usePathname();
  const [name, setName] = useState<string>("Home");

  const dynamicName = (p: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    p.includes("projects") && p.includes("create")
      ? setName("Create Project")
      : p.includes("members")
      ? setName("Member Setting")
      : p.includes("settings")
      ? setName("Workspace Setting")
      : p.includes("tasks")
      ? setName("Tasks")
      : p.includes("projects")
      ? setName("Project")
      : p.includes("create")
      ? setName("Create Workspace")
      : setName("Home");
  };

  useEffect(() => {
    dynamicName(pathname);
  });

  return (
    <nav className="bg-slate-100 p-6 flex items-center justify-between">
      <div className="flex-col hidden lg:flex">
        <h1 className="text-2xl text-slate-600 font-medium">{name}</h1>
        <p className="text-muted-foreground text-xs">
          {name === "Home" && (
            <span>Monitor all of your projects and tasks here</span>
          )}
        </p>
      </div>
      <MobileSidebar />
      <UserButton />
    </nav>
  );
}

export default Navbar;

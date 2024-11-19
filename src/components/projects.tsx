"use client";

import { cn } from "@/lib/utils";

import { RiAddCircleFill } from "react-icons/ri";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { WorkspaceAvatar } from "@/features/workspaces/components/workspace-avatar";

import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

export const Projects = () => {
  const router = useRouter();
  const pathname = usePathname();

  const workspaceId = useWorkspaceId();
  const { data } = useGetProjects({
    workspaceId,
  });

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Projects</p>
        <RiAddCircleFill
          onClick={() => {
            router.push(`/workspaces/${workspaceId}/projects/create`);
          }}
          className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
        />
      </div>
      {data?.documents.map((project) => {
        const href = `/workspaces/${workspaceId}/projects/${project.$id}`;
        const isActive = pathname === href;

        return (
          <Link href={href} key={project.$id}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-md hover-opacity-75 transition cursor-pointer",
                isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
              )}
            >
              <WorkspaceAvatar
                image={project?.imageUrl}
                name={project?.name}
                className="size-7"
                fallbackClassName="text-xs font-light"
                imageClassName="size-7"
              />
              <span className="truncate font-light text-sm">
                {project.name}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

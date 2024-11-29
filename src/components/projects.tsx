"use client";

import { cn } from "@/lib/utils";

import { RiAddCircleFill } from "react-icons/ri";

import { usePathname, useRouter } from "next/navigation";

import { WorkspaceAvatar } from "@/features/workspaces/components/workspace-avatar";

import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

export const Projects = () => {
  const router = useRouter();

  const workspaceId = useWorkspaceId();
  const { data } = useGetProjects({
    workspaceId,
  });

  const setProjectId = (project: string) => {
    localStorage.setItem("localStorageProjectId", project);
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Projects</p>
        <RiAddCircleFill
          onClick={() => {
            router.push(`/workspaces/${workspaceId}/projects/create`);
          }}
          className="size-5 text-slate-300 cursor-pointer hover:opacity-75 transition"
        />
      </div>
      {data?.documents.map((project) => {
        const isActive =
          localStorage.getItem("localStorageProjectId") === project.$id;

        return (
          <div
            key={project.$id}
            className={cn(
              "flex items-center gap-2.5 p-2.5 rounded-md hover-opacity-75 transition cursor-pointer",
              isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
            )}
            onClick={() => {
              setProjectId(project.$id);
            }}
          >
            <WorkspaceAvatar
              image={project?.imageUrl}
              name={project?.name}
              className="size-7"
              fallbackClassName="text-xs font-light"
              imageClassName="size-7"
            />
            <span className="truncate font-light text-sm">{project.name}</span>
          </div>
        );
      })}
    </div>
  );
};

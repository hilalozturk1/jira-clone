import { Project } from "../types";
import { PlusIcon } from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WorkspaceAvatar } from "@/features/workspaces/components/workspace-avatar";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

interface ProjectProps {
  projects: Project[] | undefined | [];
  total: number | undefined;
}

export const ProjectList = ({ projects, total }: ProjectProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();

  return (
    projects && (
      <div className="flex flex-col col-span-1 my-1 pt-4 px-4 bg-slate-200 bg-opacity-25">
        <div className="flex items-center justify-between ">
          <p className="text-md">Project Count: {total}</p>
          <Button
            variant="outline"
            size="icon"
            className="bg-amber-100 bg-opacity-50 text-xs text-slate-400 rounded-full"
            onClick={() => {
              router.push(`/workspaces/${workspaceId}/projects/create`);
            }}
          >
            <PlusIcon />
          </Button>
        </div>
        <div className="my-2" />
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {projects.length > 0 ? (
            projects.map((project) => (
              <li key={project.$id} className="mb-4">
                <Link
                  href={`/workspaces/${workspaceId}/projects/${project.$id}`}
                >
                  <Card className="shadow-none bg-inherit rounded-full border-slate-200 border-opacity-50 hover:opacity-75 transition">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="size-2 rounded-full bg-slate-300 mr-6" />
                        <WorkspaceAvatar
                          image={project?.imageUrl}
                          name={project?.name}
                          className="size-7 mr-2"
                          fallbackClassName="text-xs font-light"
                          imageClassName="size-7 mr-2"
                        />
                        <span className="truncate font-light text-sm">
                          {project.name}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </li>
            ))
          ) : (
            <li>No projects found.</li>
          )}
        </ul>
      </div>
    )
  );
};

"use client";

import Link from "next/link";

import { ArrowLeftIcon, Loader, PencilIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Analytics } from "@/components/analytics";
import { TaskViewSwitcher } from "@/features/tasks/components/task-view-switcher";
import { WorkspaceAvatar } from "@/features/workspaces/components/workspace-avatar";

import { useGetProject } from "@/features/projects/api/use-get-project";
import { useProjectId } from "@/features/workspaces/hooks/use-project-id";
import { useGetAnalytics } from "@/features/projects/api/use-get-analytics";

export const ProjectIdClient = () => {
  const projectId = useProjectId();

  const { data, isLoading: isLoadingProject } = useGetProject({ projectId });
  const { data: analytics, isLoading: isLoadingAnalytics } = useGetAnalytics({
    projectId,
  });
  const isLoading = isLoadingProject || isLoadingAnalytics;

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <Loader className="size-5 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full p-[50px] max-[600px]:p-4 bg-card rounded-lg">
      <div className="flex flex-col max-w-screen-2xl mx-auto justify-between w-full mb-5">
        <div className="flex justify-between w-full mb-2">
          <Button className="p-0" variant="ghost" size="sm" asChild>
            <Link href={`/workspaces/${data?.workspaceId}`}>
              <ArrowLeftIcon className="size-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button type="button" variant="ghost" size="sm" asChild>
            <Link
              href={`/workspaces/${data?.workspaceId}/projects/${data?.$id}/settings`}
            >
              <PencilIcon />
              Edit Button
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-x-2">
          <WorkspaceAvatar
            name={data?.name}
            image={data?.imageUrl}
            imageClassName="size-10"
          />
          <p className="text-md font-medium p-2"> {data?.name}</p>
        </div>
      </div>
      <Analytics data={analytics?.analyticsCount} />
      <TaskViewSwitcher />
    </div>
  );
};

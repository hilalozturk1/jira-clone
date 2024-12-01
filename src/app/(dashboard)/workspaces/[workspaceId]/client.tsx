"use client";

import { Loader } from "lucide-react";

import { Analytics } from "@/components/analytics";
import { TaskList } from "@/features/tasks/components/task-list";
import { ProjectList } from "@/features/projects/components/project-list";
import { MemberListWorkspace } from "@/features/members/components/member-list";

import { useGetTasks } from "@/features/tasks/api/use-get-tasks";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { UseGetWorkspaceAnalytics } from "@/features/workspaces/api/use-get-workspace-analytics";

export const WorkspaceInfo = () => {
  const workspaceId = useWorkspaceId();

  const { data: workspaceData, isLoading: isLoadingWorkspace } =
    UseGetWorkspaceAnalytics({
      workspaceId,
    });
  const { data: projectData, isLoading: isLoadingProject } = useGetProjects({
    workspaceId,
  });
  const { data: taskData, isLoading: isLoadingTask } = useGetTasks({
    workspaceId,
  });
  const { data: membersData, isLoading: isLoadingMembers } = useGetMembers({
    workspaceId,
  });

  const isLoading =
    isLoadingWorkspace || isLoadingProject || isLoadingTask || isLoadingMembers;

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <Loader className="size-5 animate-spin" />
      </div>
    );
  }
  return (
    <div className="h-full flex flex-col">
      <Analytics data={workspaceData?.analyticsCount} />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-1">
        <ProjectList
          projects={projectData?.documents}
          total={projectData?.total}
        />
        <MemberListWorkspace
          members={membersData?.documents}
          total={membersData?.total}
        />
        <TaskList tasks={taskData?.documents} total={taskData?.total} />
      </div>
    </div>
  );
};

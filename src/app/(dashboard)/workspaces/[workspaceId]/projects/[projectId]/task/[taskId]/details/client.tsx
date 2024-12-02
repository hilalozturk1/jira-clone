"use client";

import { Loader } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import TaskOverview from "@/features/tasks/components/task-overview";
import TaskBreadcrumbs from "@/features/tasks/components/task-breadcrumbs";
import { TaskDescription } from "@/features/tasks/components/task-description";

import { useGetTask } from "@/features/tasks/api/use-get-task";
import { useTaskId } from "@/features/workspaces/hooks/use-task-id";
import { useGetProject } from "@/features/projects/api/use-get-project";
import { useProjectId } from "@/features/workspaces/hooks/use-project-id";

export const TaskDetailClient = () => {
  const projectId = useProjectId();
  const taskId = useTaskId();

  const { data: taskData, isLoading: isLoadingTask } = useGetTask({ taskId });
  const { data: projectData, isLoading: isLoadingProject } = useGetProject({
    projectId,
  });

  const isLoading = isLoadingTask || isLoadingProject;

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <Loader className="size-5 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col bg-slate-200 bg-opacity-25">
      <TaskBreadcrumbs
        project={projectData?.updatedTask}
        task={taskData?.task}
      ></TaskBreadcrumbs>
      <Separator className="my-4" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TaskOverview
          project={projectData?.updatedTask}
          task={taskData?.task}
        />
        <TaskDescription task={taskData?.task} />
      </div>
    </div>
  );
};

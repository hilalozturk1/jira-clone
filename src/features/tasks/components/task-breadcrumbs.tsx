"use client";

import { Task } from "../types";
import { Project } from "@/features/projects/types";

import { SlashIcon, TrashIcon } from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { UseDeleteTask } from "../api/use-delete-task";

import { WorkspaceAvatar } from "@/features/workspaces/components/workspace-avatar";

interface TaskBreadcrumbsProps {
  project: Project;
  task: Task;
}

export const TaskBreadcrumbs = ({ project, task }: TaskBreadcrumbsProps) => {
  const router = useRouter();

  const { mutate: deleteTask } = UseDeleteTask();
  const handleDeleteTask = () => {
    deleteTask(
      {
        param: { taskId: task.$id },
      },
      {
        onSuccess: () => {
          router.push(`/workspaces/${project.workspaceId}/tasks`);
        },
      }
    );
  };

  return (
    <div className="w-full flex items-center justify-between p-2">
      <div className="flex items-center gap-x-4 rounded-lg">
        <WorkspaceAvatar
          name={project.name}
          className="size-7"
          fallbackClassName="font-normal text-md"
        />
        <Link
          href={`/workspaces/${project.workspaceId}/projects/${project.$id}`}
        >
          <span className="text-[15px] text-slate-500">{project.name}</span>
        </Link>
        <SlashIcon className="size-4 lg:size-4 text-slate-600" />
        <span className="text-[15px] text-slate-700">{task.name}</span>
      </div>
      <TrashIcon
        onClick={handleDeleteTask}
        className="size-4 block lg:hidden text-muted-foreground cursor-pointer"
      />
      <span
        onClick={handleDeleteTask}
        className="hidden lg:block text-[12px] text-slate-500 cursor-pointer"
      >
        Delete Task
      </span>
    </div>
  );
};

export default TaskBreadcrumbs;

import { Task } from "../types";
import { useRouter } from "next/navigation";

import {
  ExternalLinkIcon,
  MoreVertical,
  PencilIcon,
  TrashIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { UseDeleteTask } from "../api/use-delete-task";

interface TaskDropdownProps {
  task: Task;
}

export const TaskDropdown = ({ task }: TaskDropdownProps) => {
  const router = useRouter();
  const { mutate: deleteTask, isPending: isDeletingTask } = UseDeleteTask();

  const handleDeleteTask = (taskId: string) => {
    deleteTask({ param: { taskId } });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            router.push(
              `/workspaces/${task.workspaceId}/projects/${task.projectId}/task/${task.$id}/details`
            );
          }}
          className="font-medium p-[10px]"
        >
          <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
          Task Details
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            router.push(
              `/workspaces/${task.workspaceId}/projects/${task.projectId}`
            );
          }}
          className="font-medium p-[10px]"
        >
          <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
          Open Project
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            router.push(
              `/workspaces/${task.workspaceId}/projects/${task.projectId}/task/${task.$id}`
            )
          }
          className="font-medium p-[10px]"
        >
          <PencilIcon className="size-4 mr-2 stroke-2" />
          Edit Task
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleDeleteTask(task.$id)}
          disabled={isDeletingTask}
          className="text-amber-700 focus:text-amber-700 font-medium p-[10px]"
        >
          <TrashIcon className="size-4 mr-2 stroke-2" />
          Trash Task
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

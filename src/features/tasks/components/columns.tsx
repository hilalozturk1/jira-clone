"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

import { TaskStatus } from "../types";

import { UseDeleteTask } from "../api/use-delete-task";

import {
  ArrowUpDown,
  ExternalLinkIcon,
  MoreVertical,
  PencilIcon,
  TrashIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WorkspaceAvatar } from "@/features/workspaces/components/workspace-avatar";

export type Task = {
  name: string;
  status: TaskStatus;
  project: string;
  position: number;
  dueDate: string;
  workspaceId: string;
  projectId: string;
  $id: string;
};

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Task Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="p-5 text-left font-medium">{row.getValue("name")}</div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <div className="ml-5">
          <Badge
            className={status === TaskStatus.DONE ? "bg-green-200" : ""}
            variant="secondary"
          >
            {status}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "project",
    header: () => {
      return <div className="text-left">Project Id</div>;
    },
    cell: ({ row }) => {
      const project = row.original.project;

      return (
        <div className="flex items-center gap-x-2 text-sm">
          <WorkspaceAvatar
            className="size-6"
            name={project.name}
            image={project.image}
          />
          <span className="line-clamp-1"> {project.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const actions = row.original;
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
                  `/workspaces/${actions.workspaceId}/projects/${actions.projectId}/task/${actions.$id}/details`
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
                  `/workspaces/${actions.workspaceId}/projects/${actions.projectId}`
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
                  `/workspaces/${actions.workspaceId}/projects/${actions.projectId}/task/${actions.$id}`
                )
              }
              className="font-medium p-[10px]"
            >
              <PencilIcon className="size-4 mr-2 stroke-2" />
              Edit Task
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDeleteTask(actions.$id)}
              disabled={isDeletingTask}
              className="text-amber-700 focus:text-amber-700 font-medium p-[10px]"
            >
              <TrashIcon className="size-4 mr-2 stroke-2" />
              Trash Task
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

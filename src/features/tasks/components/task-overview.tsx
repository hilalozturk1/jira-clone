"use client";

import moment from "moment";

import { Task, TaskStatus } from "../types";
import { Project } from "@/features/projects/types";

import { PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { OverviewProperty } from "./overview-property";

interface TaskOverviewProps {
  task: Task;
  project: Project;
}

const statusColorMap: Record<TaskStatus, string> = {
  [TaskStatus.ALL]: "",
  [TaskStatus.BACKLOG]: "bg-pink-200 bg-opacity-25",
  [TaskStatus.TODO]: "bg-red-200 bg-opacity-25",
  [TaskStatus.IN_PROGRESS]: "bg-yellow-200 bg-opacity-25",
  [TaskStatus.IN_REVIEW]: "bg-blue-200 bg-opacity-25",
  [TaskStatus.DONE]: "bg-emerald-200 bg-opacity-25",
};

const TaskOverview = ({ task, project }: TaskOverviewProps) => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Overview</p>
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              router.push(
                `/workspaces/${project.workspaceId}/projects/${project.$id}/task/${task.$id}`
              )
            }
          >
            <PencilIcon className="size-4 mr-2" />
            Edit
          </Button>
        </div>
        <Separator className="my-4" />
        <div className="flex flex-col gap-y-4">
          <OverviewProperty label="Due Date">
            <span>{moment(task.dueDate).format("LL")}</span>
          </OverviewProperty>
          <OverviewProperty label="Status">
            <div
              className={`flex flex-col rounded-lg p-1 text-xs ${
                statusColorMap[task.status]
              }`}
            >
              {task.status}
            </div>
          </OverviewProperty>
        </div>
      </div>
    </div>
  );
};

export default TaskOverview;

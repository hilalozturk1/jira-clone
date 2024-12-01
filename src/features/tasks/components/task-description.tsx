"use client";

import { Task } from "../types";

import { useState } from "react";
import { PencilIcon, XIcon } from "lucide-react";
import { useUpdateTask } from "../api/use-update-task";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

interface TaskDesriptionProps {
  task: Task;
}

export const TaskDescription = ({ task }: TaskDesriptionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task?.description);

  const { mutate, isPending } = useUpdateTask();

  const handleUpdateDescription = () => {
    mutate(
      {
        json: {
          description: value,
          workspaceId: task.workspaceId,
        },
        param: {
          taskId: task.$id,
        },
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <p className="text-lg">Overview</p>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {isEditing ? (
            <XIcon className="size-4 mr-2" />
          ) : (
            <PencilIcon className="size-4 mr-2" />
          )}
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>
      <Separator className="my-4" />
      {isEditing ? (
        <div className="flex flex-col gap-y-4">
          <Textarea
            placeholder="Add a description.."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={4}
          />
          <Button
            className="w-fit ml-auto"
            onClick={handleUpdateDescription}
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-y-4">
          {task?.description || (
            <span className="text-slate-400 text-sm">No description set</span>
          )}
        </div>
      )}
    </div>
  );
};

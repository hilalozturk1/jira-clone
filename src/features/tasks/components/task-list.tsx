import { Task } from "../types";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";

import { CalendarIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

interface TaskProps {
  tasks: Task[] | undefined | [];
  total: number | undefined;
}

export const TaskList = ({ tasks, total }: TaskProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();

  return (
    tasks && (
      <div className="flex flex-col col-span-1 my-1 p-4 bg-slate-200 bg-opacity-25">
        <div className="flex items-center justify-between ">
          <p className="text-md">Task Count: {total}</p>
          <Button
            variant="outline"
            size="icon"
            className="bg-amber-100 bg-opacity-50 text-xs text-slate-400 rounded-full"
            onClick={() => {
              router.push(`/workspaces/${workspaceId}/create/task`);
            }}
          >
            <PlusIcon />
          </Button>
        </div>
        <div className="my-2" />
        <ul className="flex-flex-col gap-y-4">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <li key={task.$id} className="mb-4">
                <Link
                  href={`/workspaces/${workspaceId}/projects/${task.project.$id}/task/${task.$id}`}
                >
                  <Card className="shadow-none bg-inherit rounded-full border-slate-200 border-opacity-50 hover:opacity-75 transition">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="size-2 rounded-full bg-slate-300 mr-6" />
                        <div className="flex flex-col  gap-x-2">
                          <p className="text-sm">{task.name}</p>
                          <p className="text-xs">{task.project?.name}</p>
                        </div>
                      </div>
                      <div className="flex text-muted-foreground items-center">
                        <CalendarIcon className="size-3 mr-2" />
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(task.dueDate))}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </li>
            ))
          ) : (
            <li>No tasks found.</li>
          )}
        </ul>
        {tasks.length > 0 && (
          <Button variant="teritary" className="w-full mb-3" asChild>
            <Link href={`/workspaces/${workspaceId}/tasks`}>Show All</Link>
          </Button>
        )}
      </div>
    )
  );
};

import { TaskStatus } from "../types";

import {
  CircleCheckIcon,
  CircleDashedIcon,
  CircleDotIcon,
  CircleIcon,
  PlusIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface KanbanColumnHeaderProps {
  board: TaskStatus;
  taskCount: number;
}

const statusIconMap: Record<TaskStatus, React.ReactNode> = {
  [TaskStatus.ALL]: (
    <CircleDashedIcon className="size-[18px] text-pink-400" />
  ),
  [TaskStatus.BACKLOG]: (
    <CircleDashedIcon className="size-[18px] text-pink-400" />
  ),
  [TaskStatus.TODO]: <CircleIcon className="size-[18px] text-red-400" />,
  [TaskStatus.IN_PROGRESS]: (
    <CircleDashedIcon className="size-[18px] text-yellow-400" />
  ),
  [TaskStatus.IN_REVIEW]: (
    <CircleDotIcon className="size-[18px] text-blue-400" />
  ),
  [TaskStatus.DONE]: (
    <CircleCheckIcon className="size-[18px] text-emerald-400" />
  ),
};

function KanbanColumnHeader({ board, taskCount }: KanbanColumnHeaderProps) {
  const icon = statusIconMap[board];

  return (
    <div className="px-2 py-1.5 flex items-center justify-between gap-x-2">
      <div className="flex flex-row items-center text-sm gap-x-2">
        <span>{icon}</span>
        <span className="text-xs">{board}</span>
      </div>
      <div className="flex items-center">
        <div className="size-5 flex justify-center items-center border-slate-200 rounded-md shadow-sm border bg-white text-xs text-neutral-700">
          {taskCount}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="size-5 border-slate-200"
        >
          <PlusIcon className="size-4 text-neutral-500" />
        </Button>
      </div>
    </div>
  );
}

export default KanbanColumnHeader;

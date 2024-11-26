import moment from "moment";

import { Task } from "../types";

import { TaskDropdown } from "./task-dropdown";
import { Separator } from "@/components/ui/separator";
import { MemberAvatar } from "@/features/members/components/members-avatar";
import { WorkspaceAvatar } from "@/features/workspaces/components/workspace-avatar";

interface KanbanCardProps {
  task: Task;
}

export const KanbanCard = ({ task }: KanbanCardProps) => {
  return (
    <div className="bg-slate-100 p-2.5 mb-1.5 rounded shadow-sm w-full">
      <div className="flex items-center justify-between gap-x-2">
        <p>{task.name}</p>
        <TaskDropdown task={task} />
      </div>
      <div className="py-2">
        <Separator className="w-full" />
      </div>
      <div className="flex items-center gap-x-1.5">
        <MemberAvatar
          name={task.assignee.name}
          fallbackClassName="text-[10px] bg-slate-300"
        />
        <div className="text-sm rounded-full p-2">
          {moment(task.dueDate).format("LL")}
        </div>
      </div>
      <div className="flex items-center gap-x-3">
          <WorkspaceAvatar
          name={task.project.name}
          image={task.project.image}
          fallbackClassName="text-[10px] rounded-full"
          className="text-sm size-5 "
          />
          <span className="text-sm">{task.project.name}</span>
        </div>
    </div>
  );
};

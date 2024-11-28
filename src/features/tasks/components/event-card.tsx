import Link from "next/link";

import { TaskStatus } from "../types";
import { Project } from "@/features/projects/types";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { MemberAvatar } from "@/features/members/components/members-avatar";
import { WorkspaceAvatar } from "@/features/workspaces/components/workspace-avatar";

interface EventCardProps {
  title: string;
  assignee: string;
  project: Project;
  status: TaskStatus;
  id: string;
}

const statusColorMap: Record<TaskStatus, string> = {
  [TaskStatus.ALL]: "",
  [TaskStatus.BACKLOG]: "border-s-pink-200",
  [TaskStatus.TODO]: "border-s-red-200",
  [TaskStatus.IN_PROGRESS]: "border-s-yellow-200",
  [TaskStatus.IN_REVIEW]: "border-s-blue-200",
  [TaskStatus.DONE]: "border-s-emerald-200",
};

function EventCard({ title, assignee, project, status, id }: EventCardProps) {
  const workspaceId = useWorkspaceId();

  return (
    <div className="px-2">
      <Link
        href={`/workspaces/${workspaceId}/projects/${project.$id}/task/${id}`}
      >
        <div
          className={`flex flex-col border-s-4 rounded-lg p-1  
        hover:w-fit ${statusColorMap[status]}`}
        >
          <span className="text-xs">{title}</span>
          <div className="flex items-center gap-x-1">
            <MemberAvatar name={assignee?.name} />
            <WorkspaceAvatar
              className="size-5"
              name={project.name}
              image={project.imageUrl}
            />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default EventCard;

import { TaskStatus } from "../types";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ListCheckIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

interface DataFiltersProps {
  projectFilter?: boolean;
}

export const DataFilters = ({}: DataFiltersProps) => {
  const router = useRouter();

  const [filter, setFilter] = useState("");
  const [localStorageStatus, setLocalStorageStatus] = useState("");

  const workspaceId = useWorkspaceId();

  const { data: projectsData, isLoading: isLoadingProjects } = useGetProjects({
    workspaceId,
  });
  const { data: membersData, isLoading: isLoadingMembers } = useGetMembers({
    workspaceId,
  });

  const projectOptions = projectsData?.documents.map((project) => ({
    id: project.$id,
    name: project?.name,
    imageUrl: project?.imageUrl,
  }));

  const memberOptions = membersData?.documents.map((member) => ({
    id: member.$id,
    name: member.name,
  }));

  const isLoading = isLoadingProjects || isLoadingMembers;

  useEffect(() => {
    const getLocalStorageStatus = localStorage.getItem(
      "localStorageStatus"
    ) as string;

    if (!getLocalStorageStatus) {
      localStorage.setItem("localStorageStatus", TaskStatus.ALL);
    } else {
      if (filter) {
        localStorage.setItem("localStorageStatus", filter);
        setLocalStorageStatus(filter);
      } else {
        localStorage.setItem("localStorageStatus", getLocalStorageStatus);
        setLocalStorageStatus(getLocalStorageStatus);
      }
    }
    router.refresh();
  }, [filter, setFilter]);

  const onStatusChange = (value: string) => {
    setFilter(value as TaskStatus);
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex flex-row gap-2">
      <div className="basis-full lg:basis-1/4">
        <Select
          defaultValue={localStorageStatus || undefined}
          onValueChange={(value) => onStatusChange(value)}
        >
          <SelectTrigger className="w-full h-8">
            <div className="flex items-center pr-2">
              <ListCheckIcon className="size-4 mr-2" />
              <SelectValue placeholder="All status" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={TaskStatus.ALL}>All status</SelectItem>
            <Separator />
            <SelectItem value={TaskStatus.BACKLOG}>Backlog</SelectItem>
            <SelectItem value={TaskStatus.IN_PROGRESS}>In Progress</SelectItem>
            <SelectItem value={TaskStatus.IN_REVIEW}>In review</SelectItem>
            <SelectItem value={TaskStatus.TODO}>Todo</SelectItem>
            <SelectItem value={TaskStatus.DONE}>Done</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

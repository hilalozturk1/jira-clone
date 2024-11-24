import { TaskStatus } from "../types";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FolderIcon, ListCheckIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

interface DataFiltersProps {
  projectFilter?: boolean;
}

export const DataFilters = ({}: DataFiltersProps) => {
  const router = useRouter();

  const [filter, setFilter] = useState("");
  const [localStorageStatus, setLocalStorageStatus] = useState("");

  const [filterProjectId, setFilterProjectId] = useState("");
  const [localStorageProjectId, setLocalStorageProjectId] = useState("");

  const workspaceId = useWorkspaceId();

  const { data: projectsData, isLoading: isLoadingProjects } = useGetProjects({
    workspaceId,
  });

  const projectOptions = projectsData?.documents.map((project) => ({
    id: project.$id,
    name: project?.name,
  }));

  const isLoading = isLoadingProjects;

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

  useEffect(() => {
    const getLocalStorageProjectId = localStorage.getItem(
      "localStorageProjectId"
    ) as string;

    if (!getLocalStorageProjectId) {
      localStorage.setItem("localStorageProjectId", TaskStatus.ALL);
    } else {
      if (filterProjectId) {
        localStorage.setItem("localStorageProjectId", filterProjectId);
        setLocalStorageProjectId(filterProjectId);
      } else {
        localStorage.setItem("localStorageProjectId", getLocalStorageProjectId);
        setLocalStorageProjectId(getLocalStorageProjectId);
      }
    }
    router.refresh();
  }, [filterProjectId, setFilterProjectId]);

  const onStatusChange = (value: string) => {
    setFilter(value as TaskStatus);
  };

  const onProjectChange = (value: string) => {
    setFilterProjectId(value);
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 lg:flex-row">
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
      <div className="basis-full lg:basis-1/4">
        <Select
          defaultValue={localStorageProjectId}
          onValueChange={(value) => onProjectChange(value)}
        >
          <SelectTrigger className="w-full h-8">
            <div className="flex items-center pr-2">
              <FolderIcon className="size-4 mr-2" />
              <SelectValue placeholder="All Projects" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={TaskStatus.ALL}>All Projects</SelectItem>
            <Separator />
            {projectOptions?.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

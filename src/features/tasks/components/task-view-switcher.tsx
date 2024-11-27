"use client";

import { TaskStatus } from "../types";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { DeleteIcon, Loader, PlusIcon } from "lucide-react";

import { DataTable } from "./data-table";
import { DataKanban } from "./data-kanban";
import { DataFilters } from "./data-filters";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CreateTaskFormWrapper from "./create-task-form-wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { columns } from "./columns";

import { useGetTasks } from "../api/use-get-tasks";
import { useBulkUpdateTasks } from "../api/use-bulk-update-tasks";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import DataCalendar from "./data-calendar";

export const TaskViewSwitcher = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();

  const [isOpen, setIsOpen] = useState(false);
  const [tabValue, setTabValue] = useState("");
  const [localStorageTabValue, setLocalStorageTabValue] = useState("");

  let getStatus;
  let getProject;

  if (typeof window !== "undefined") {
    getStatus = localStorage.getItem("localStorageStatus") as string;
    getProject = localStorage.getItem("localStorageProjectId") as string;
  }

  const { mutate: bulkUpdate } = useBulkUpdateTasks();

  const { data: tasksData, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
    status: getStatus,
    projectId: getProject,
  });

  let button;

  if (!isOpen) {
    button = (
      <Button size="sm" className="w-full " onClick={() => setIsOpen(!isOpen)}>
        <PlusIcon />
        New
      </Button>
    );
  } else {
    button = button = (
      <Button size="sm" className="w-full " onClick={() => setIsOpen(!isOpen)}>
        <DeleteIcon />
        Close
      </Button>
    );
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getLocalStorageTabValue = localStorage.getItem(
        "localStorageTabValue"
      ) as string;

      if (!getLocalStorageTabValue) {
        localStorage.setItem("localStorageTabValue", "table");
      } else {
        if (tabValue) {
          localStorage.setItem("localStorageTabValue", tabValue);
          setLocalStorageTabValue(tabValue);
        } else {
          localStorage.setItem("localStorageTabValue", getLocalStorageTabValue);
          setLocalStorageTabValue(getLocalStorageTabValue);
        }
      }
      router.refresh();
    }
  }, [tabValue, setTabValue]);

  const onKanbanChange = useCallback(
    (tasks: { $id: string; status: TaskStatus; position: number }[]) => {
      bulkUpdate({
        json: { tasks },
      });
    },
    [bulkUpdate]
  );

  return (
    localStorageTabValue && (
      <Tabs
        value={localStorageTabValue}
        className="flex flex-col justify-between w-full rounded-lg shadow-neutral-300 shadow-md"
      >
        <div className="h-full flex overflow-auto">
          <div className="w-full flex md:flex-row flex-col md:justify-between gap-y-2 items-center">
            <TabsList className="w-full lg:w-auto lg:flex-row h-16 justify-start">
              <TabsTrigger
                className="h-8 lg:w-auto text-md font-normal"
                value="table"
                onClick={() => setTabValue("table")}
              >
                Table
              </TabsTrigger>
              <TabsTrigger
                className="h-8 lg:w-auto text-md font-normal"
                value="kanban"
                onClick={() => setTabValue("kanban")}
              >
                Kanban
              </TabsTrigger>
              <TabsTrigger
                className="h-8 lg:w-auto text-md font-normal"
                value="calendar"
                onClick={() => setTabValue("calendar")}
              >
                Calander
              </TabsTrigger>
            </TabsList>
            <div className="px-4 w-full md:w-auto">{button}</div>
          </div>
        </div>

        <div className="p-7">
          <Separator />
        </div>

        <div className="px-7">
          <span>Data Filters</span>
          <DataFilters></DataFilters>
        </div>

        <div className="p-7">
          <Separator />
        </div>
        {isLoadingTasks ? (
          <div className="h-screen flex flex-col items-center justify-center">
            <Loader className="size-5 animate-spin" />
          </div>
        ) : (
          <div className="px-7 pb-7">
            <TabsContent value="table" className="mt-0">
              <DataTable columns={columns} data={tasksData?.documents ?? []} />
            </TabsContent>
            <TabsContent value="kanban" className="mt-0">
              <DataKanban
                onChange={onKanbanChange}
                data={tasksData?.documents || []}
              ></DataKanban>
            </TabsContent>
            <TabsContent value="calendar" className="mt-0">
              <DataCalendar data={tasksData?.documents || []} />
            </TabsContent>
          </div>
        )}
        {isOpen && <CreateTaskFormWrapper />}
      </Tabs>
    )
  );
};

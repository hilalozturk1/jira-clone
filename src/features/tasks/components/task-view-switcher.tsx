"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { DeleteIcon, Loader, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CreateTaskFormWrapper from "./create-task-form-wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useGetTasks } from "../api/use-get-tasks";

export const TaskViewSwitcher = () => {
  const router = useRouter();

  const workspaceId = useWorkspaceId();
  const { data: tasksData, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
  });

  const [tabValue, setTabValue] = useState("");
  const [localStorageTabValue, setLocalStorageTabValue] = useState("");

  const [isOpen, setIsOpen] = useState(false);
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
    const getLocalStorageTabValue = localStorage.getItem(
      "localStorageTabValue"
    ) as string;

    if (!getLocalStorageTabValue) {
      localStorage.setItem("localStorageTabValue", "table");

      router.refresh();
    } else {
      if (tabValue) {
        localStorage.setItem("localStorageTabValue", tabValue);
        setLocalStorageTabValue(tabValue);
      } else {
        localStorage.setItem("localStorageTabValue", getLocalStorageTabValue);
        setLocalStorageTabValue(getLocalStorageTabValue);
      }
    }
  }, [tabValue, setTabValue]);

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

        <span className="ps-7">Data Filters</span>
        <div className="px-7 pt-7">
          <Separator />
        </div>
        {isLoadingTasks ? (
          <div className="h-screen flex flex-col items-center justify-center">
            <Loader className="size-5 animate-spin" />
          </div>
        ) : (
          <div className="ps-7 pb-7">
            <TabsContent value="table" className="mt-0">
              {JSON.stringify(tasksData)}
            </TabsContent>
            <TabsContent value="kanban" className="mt-0">
              {JSON.stringify(tasksData)}
            </TabsContent>
            <TabsContent value="calendar" className="mt-0">
              Data calendar
            </TabsContent>
          </div>
        )}
        {isOpen && <CreateTaskFormWrapper />}
      </Tabs>
    )
  );
};

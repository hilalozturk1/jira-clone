import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const TaskViewSwitcher = () => {
  return (
    <Tabs className="flex flex-col justify-between w-full rounded-lg shadow-neutral-300 shadow-md">
      <div className="h-full flex overflow-auto">
        <div className="w-full flex md:flex-row flex-col md:justify-between gap-y-2 items-center">
          <TabsList className="w-full lg:w-auto lg:flex-row h-16 justify-start">
            <TabsTrigger
              className="h-8 lg:w-auto text-md font-normal"
              value="table"
            >
              Table
            </TabsTrigger>
            <TabsTrigger
              className="h-8 lg:w-auto text-md font-normal"
              value="kanban"
            >
              Kanban
            </TabsTrigger>
            <TabsTrigger
              className="h-8 lg:w-auto text-md font-normal"
              value="calendar"
            >
              Calander
            </TabsTrigger>
          </TabsList>
          <div className="px-4 w-full md:w-auto">
            <Button size="sm" className="w-full ">
              <PlusIcon />
              New
            </Button>
          </div>
        </div>
      </div>

      <div className="p-7">
        <Separator />
      </div>

      <span className="ps-7">Data Filters</span>
      <div className="p-7">
        <Separator />
      </div>
      <div className="ps-7 pb-7">
        <TabsContent value="table" className="mt-0">
          Data table
        </TabsContent>
        <TabsContent value="kanban" className="mt-0">
          Data kanban
        </TabsContent>
        <TabsContent value="calendar" className="mt-0">
          Data calendar
        </TabsContent>
      </div>
    </Tabs>
  );
};

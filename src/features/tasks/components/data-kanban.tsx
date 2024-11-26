import { Task, TaskStatus } from "../types";

import { useState } from "react";

import { KanbanCard } from "./kanban-card";
import { TaskDropdown } from "./task-dropdown";
import KanbanColumnHeader from "./kanban-column-header";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Separator } from "@/components/ui/separator";

const boards: TaskStatus[] = [
  TaskStatus.BACKLOG,
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.IN_REVIEW,
  TaskStatus.DONE,
];

type TasksState = {
  [key in TaskStatus]: Task[];
};

interface DataKanbanProps {
  data: Task[];
}

export const DataKanban = ({ data }: DataKanbanProps) => {
  const [tasks, setTasks] = useState<TaskStatus>(() => {
    const initialTasks: TasksState = {
      [TaskStatus.ALL]: [],
      [TaskStatus.BACKLOG]: [],
      [TaskStatus.TODO]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.IN_REVIEW]: [],
      [TaskStatus.DONE]: [],
    };

    data.forEach((task) => {
      initialTasks[task.status].push(task);
    });

    Object.keys(initialTasks).forEach((status) => {
      initialTasks[status as TaskStatus].sort(
        (a, b) => a.position - b.position
      );
    });

    return initialTasks;
  });
  return (
    <ScrollArea className="w-full whitespace-nowrap border-none border">
      <DragDropContext onDragEnd={() => {}}>
        <div className="flex overflow-x-auto gap-x-2">
          {boards.map((board) => {
            return (
              <div
                key={board}
                className="flex-1 p-1.5 rounded-md border border-slate-200 m-w-[200px]"
              >
                <KanbanColumnHeader
                  board={board}
                  taskCount={tasks[board].length}
                ></KanbanColumnHeader>
                <Separator />
                <Droppable droppableId={board}>
                  {(provided) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="min-h-[200px] py-1.5"
                      >
                        {tasks[board].map((task, index) => (
                          <Draggable
                            draggableId={task.$id}
                            index={index}
                            key={task.$id}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <KanbanCard task={task} />
                              </div>
                            )}
                          </Draggable>
                        ))}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

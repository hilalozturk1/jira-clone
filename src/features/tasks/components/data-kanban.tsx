import { Task, TaskStatus } from "../types";

import { useCallback, useEffect, useState } from "react";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { KanbanCard } from "./kanban-card";
import { Separator } from "@/components/ui/separator";
import KanbanColumnHeader from "./kanban-column-header";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
  onChange: (
    tasks: { $id: string; status: TaskStatus; position: number }[]
  ) => void;
}

export const DataKanban = ({ data, onChange }: DataKanbanProps) => {
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

  useEffect(() => {
    const newTasks: TasksState = {
      [TaskStatus.ALL]: [],
      [TaskStatus.BACKLOG]: [],
      [TaskStatus.TODO]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.IN_REVIEW]: [],
      [TaskStatus.DONE]: [],
    };

    data.forEach((task) => {
      newTasks[task.status].push(task);
    });

    Object.keys(newTasks).forEach((status) => {
      newTasks[status as TaskStatus].sort((a, b) => a.position - b.position);
    });

    setTasks(newTasks);
  }, [data]);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return null;

      const { source, destination } = result;
      const sourceStatus = source.droppableId as TaskStatus;
      const destStatus = destination.droppableId as TaskStatus;

      let updatesPayload: {
        $id: string;
        status: TaskStatus;
        position: number;
      }[];

      setTasks((prevTasks) => {
        const newTasks = { ...prevTasks };

        const sourceColumn = [...newTasks[sourceStatus]];
        const [movedTask] = sourceColumn.splice(source.index, 1);

        if (!movedTask) {
          console.log("No task found at the source index");
          return prevTasks;
        }

        const updatedMoveTask =
          sourceStatus !== destStatus
            ? { ...movedTask, status: destStatus }
            : movedTask;

        newTasks[sourceStatus] = sourceColumn;
        const destColumn = [...newTasks[destStatus]];
        destColumn.splice(destination.index, 0, updatedMoveTask);
        newTasks[destStatus] = destColumn;

        updatesPayload = [];

        updatesPayload.push({
          $id: updatedMoveTask,
          status: destStatus,
          position: Math.min((destination.index + 1) * 1000, 1_000_000),
        });

        newTasks[destStatus].forEach((task, index) => {
          if (task && task.$id !== updatedMoveTask.$id) {
            const newPosition = Math.min((index + 1) * 1000, 1_000_000);
            if (task.position !== newPosition) {
              updatesPayload.push({
                $id: task.$id,
                status: destStatus,
                position: newPosition,
              });
            }
          }
        });

        if (sourceStatus !== destStatus) {
          newTasks[sourceStatus].forEach((task, index) => {
            if (task) {
              const newPosition = Math.min((index + 1) * 1000, 1_000_000);
              if (task.position !== newPosition) {
                updatesPayload.push({
                  $id: task.$id,
                  status: sourceStatus,
                  position: newPosition,
                });
              }
            }
          });
        }

        return newTasks;
      });

      onChange(updatesPayload);
    },
    [onChange]
  );

  return (
    <ScrollArea className="w-full whitespace-nowrap border-none border">
      <DragDropContext onDragEnd={onDragEnd}>
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
                        {provided.placeholder}
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

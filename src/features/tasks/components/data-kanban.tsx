import { Task, TaskStatus } from "../types";

import { useState } from "react";

import { DragDropContext } from "@hello-pangea/dnd";

import KanbanColumnHeader from "./kanban-column-header";

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
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};

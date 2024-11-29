import { getTaskInfo } from "@/features/tasks/queries";

import EditTaskForm from "@/features/tasks/components/edit-task-form";

interface TaskPageProps {
  params: {
    taskId: string;
  };
}

async function Task({ params }: TaskPageProps) {
  const data = await getTaskInfo({
    taskId: params.taskId,
  });

  return <EditTaskForm data={data}></EditTaskForm>;
}

export default Task;

import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/actions";
import { getTaskInfo } from "@/features/tasks/queries";
import { getProjectInfo } from "@/features/projects/queries";

import { Separator } from "@/components/ui/separator";
import TaskOverview from "@/features/tasks/components/task-overview";
import { TaskBreadcrumbs } from "@/features/tasks/components/task-breadcrumbs";
import { TaskDescription } from "@/features/tasks/components/task-description";

interface TaskDetailsPageProps {
  params: {
    projectId: string;
    taskId: string;
  };
}

const TaskDetail = async ({ params }: TaskDetailsPageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const taskData = await getTaskInfo({
    taskId: params.taskId,
  });

  const projectData = await getProjectInfo({
    projectId: params.projectId,
  });

  return (
    <div className="w-full flex flex-col bg-slate-200 bg-opacity-25">
      <TaskBreadcrumbs project={projectData} task={taskData}></TaskBreadcrumbs>
      <Separator className="my-4" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TaskOverview project={projectData} task={taskData} />
        <Separator className="" />
        <TaskDescription task={taskData} />
      </div>
    </div>
  );
};

export default TaskDetail;

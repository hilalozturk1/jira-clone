import { redirect } from "next/navigation";

import { TaskDetailClient } from "./client";
import { getCurrent } from "@/features/auth/actions";

const TaskDetail = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <TaskDetailClient />;
};

export default TaskDetail;

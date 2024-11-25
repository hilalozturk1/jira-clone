import { createSessionClient } from "@/lib/appwrite";
import { DATABASE_ID, TASKS_ID } from "@/config";
import { getMember } from "../members/utils";
import { Task } from "./types";

interface getTaskProps {
  taskId: string;
}

export const getTaskInfo = async ({ taskId }: getTaskProps) => {
  const { databases, account } = await createSessionClient();
  const user = await account.get();

  const task = await databases.getDocument<Task>(DATABASE_ID, TASKS_ID, taskId);

  const member = await getMember({
    databases,
    userId: user.$id,
    workspaceId: task.workspaceId,
  });

  if (!member) {
    throw new Error("Unauthorized");
  }

  return task;
};

import { Workspace } from "../workspaces/types";

import { createSessionClient } from "@/lib/appwrite";
import { DATABASE_ID, PROJECTS_ID } from "@/config";
import { getMember } from "../members/utils";

interface getProjectInfoProps {
  projectId: string;
}

export const getProjectInfo = async ({ projectId }: getProjectInfoProps) => {

  const { databases, account } = await createSessionClient();
  const user = await account.get();

  const project = await databases.getDocument<Workspace>(
    DATABASE_ID,
    PROJECTS_ID,
    projectId
  );

  const member = await getMember({
    databases,
    userId: user.$id,
    workspaceId: project.workspaceId,
  });

  if (!member) {
    throw new Error("Unauthorized");
  }

  return project;
};

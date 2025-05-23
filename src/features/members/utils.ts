import { Query, type Databases } from "node-appwrite";

import { DATABASE_ID, MEMBERS_ID } from "@/config";
import { MemberType } from "./types";

interface GetMemberProps {
  databases: Databases;
  workspaceId: string;
  userId: string;
}

export const getMember = async ({
  databases,
  workspaceId,
  userId,
}: GetMemberProps) => {
  try {
    const members = await databases.listDocuments<MemberType>(
      DATABASE_ID,
      MEMBERS_ID,
      [Query.equal("workspaceId", workspaceId), Query.equal("userId", userId)]
    );
    return members.documents[0];
  } catch (error) {
    console.log("error :>> ", error);
  }
};

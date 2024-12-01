import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/actions";
import { WorkspaceInfo } from "./client";

async function WorkspaceIdPage() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <WorkspaceInfo />;
}

export default WorkspaceIdPage;

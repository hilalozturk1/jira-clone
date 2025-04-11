import { redirect } from "next/navigation";
import { getCurrent } from "@/features/auth/actions";
import { getWorkspaceInfo } from "@/features/workspaces/actions";
import JoinWorkspaceForm from "@/features/workspaces/components/join-workspace-form";

// Define the params type and wrap it in a Promise
interface WorkspaceJoinPageProps {
  params: Promise<{
    workspaceId: string;
    inviteCode: string;
  }>;
}

export default async function JoinPage({
  params,
}: WorkspaceJoinPageProps) {
  // Await the params to extract its values
  const { workspaceId, inviteCode } = await params;
  
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const workspace = await getWorkspaceInfo({
    workspaceId,
  });
  if (!workspace) redirect("/");

  return (
    <div className="w-full lg:max-w-xl">
      <JoinWorkspaceForm initialValues={workspace} />
    </div>
  );
}

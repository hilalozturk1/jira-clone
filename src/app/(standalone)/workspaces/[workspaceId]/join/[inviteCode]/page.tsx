import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/actions";
import { getWorkspaceInfo } from "@/features/workspaces/actions";
import JoinWorkspaceForm from "@/features/workspaces/components/join-workspace-form";

interface WorkspaceIdJoinPageProps {
  params: {
    workspaceId: string;
  };
}

const JoinPage = async ({ params }: WorkspaceIdJoinPageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const workspace = await getWorkspaceInfo({
    workspaceId: params.workspaceId,
  });

  if (!workspace) {
    redirect("/");
  }

  return (
    <div className="w-full lg:max-w-xl">
      <JoinWorkspaceForm initialValues={workspace} />
    </div>
  );
};

export default JoinPage;

"use client";

import { Loader } from "lucide-react";
import { redirect } from "next/navigation";

import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { EditWorkSpaceForm } from "@/features/workspaces/components/edit-workspace-form";

export const WorkspaceIdSettingsClient = () => {
  const workspaceId = useWorkspaceId();
  const { data, isLoading } = useGetWorkspace({ workspaceId });

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <Loader className="size-5 animate-spin" />
      </div>
    );
  }

  if (!data) {
    redirect(`/workspaces/${workspaceId}`);
  }
  return (
    <div className="w-full lg:max-w-xl">
      <EditWorkSpaceForm initialValues={data} />
    </div>
  );
};

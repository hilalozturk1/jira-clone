"use client";

import { useGetProject } from "@/features/projects/api/use-get-project";
import { useProjectId } from "@/features/workspaces/hooks/use-project-id";

import { EditProjectForm } from "@/features/projects/components/edit-project-form";

export const ProjectIdSettingsClient = () => {
  const projectId = useProjectId();

  const { data } = useGetProject({ projectId });

  return <EditProjectForm initialValues={data} />;
};

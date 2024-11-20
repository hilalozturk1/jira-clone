import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/actions";
import { getProjectInfo } from "@/features/projects/queries";

import { EditProjectForm } from "@/features/projects/components/edit-project-form";

interface ProjectIdSettingsPageProps {
  params: {
    projectId: string;
  };
}

async function ProjectIdSettings({ params }: ProjectIdSettingsPageProps) {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const initialValues = await getProjectInfo({
    projectId: params.projectId,
  });

  return (
    <div className="w-full lg:max-w-xl">
      <EditProjectForm initialValues={initialValues} />
    </div>
  );
}

export default ProjectIdSettings;

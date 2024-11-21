import Link from "next/link";
import { redirect } from "next/navigation";

import { PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkspaceAvatar } from "@/features/workspaces/components/workspace-avatar";

import { getCurrent } from "@/features/auth/actions";
import { getProjectInfo } from "@/features/projects/queries";
import { TaskViewSwitcher } from "@/features/tasks/components/task-view-switcher";

interface ProjectIdPageProps {
  params: {
    projectId: string;
  };
}

const Project = async ({ params }: ProjectIdPageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const initialValues = await getProjectInfo({
    projectId: params.projectId,
  });

  return (
    <div className="flex flex-col w-full p-[50px] max-[600px]:p-4 bg-card rounded-lg">
      <div className="flex max-w-screen-2xl mx-auto justify-between w-full mb-5">
        <div className="flex items-center gap-x-2">
          <WorkspaceAvatar
            name={initialValues?.name}
            image={initialValues?.imageUrl}
            imageClassName="size-10"
          />
          <p className="text-md font-medium p-2"> {initialValues?.name}</p>
        </div>
        <div>
          <Button type="button" variant="ghost" size="sm" asChild>
            <Link
              href={`/workspaces/${initialValues?.workspaceId}/projects/${initialValues.$id}/settings`}
            >
              <PencilIcon />
              Edit Button
            </Link>
          </Button>
        </div>
      </div>
      <TaskViewSwitcher />
    </div>
  );
};

export default Project;

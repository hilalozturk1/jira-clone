import Link from "next/link";
import { redirect } from "next/navigation";

import { PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkspaceAvatar } from "@/features/workspaces/components/workspace-avatar";

import { getCurrent } from "@/features/auth/actions";
import { getProjectInfo } from "@/features/projects/queries";

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
    <div className="flex  max-w-screen-2xl mx-auto justify-between w-full p-[50px]">
      <div className="flex items-center gap-x-2">
        <WorkspaceAvatar
          name={initialValues?.name}
          image={initialValues?.imageUrl}
          imageClassName="size-10"
        />
        <p className="text-md font-semibold p-2"> {initialValues?.name}</p>
      </div>
      <div>
        <Button type="button" variant="secondary" size="sm" asChild>
          <Link
            href={`/workspaces/${initialValues?.workspaceId}/projects/${initialValues.$id}/settings`}
          >
            <PencilIcon />
            Edit Button
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Project;

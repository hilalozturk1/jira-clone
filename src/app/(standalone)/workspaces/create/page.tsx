import { redirect } from "next/navigation";
import { getCurrent } from "@/features/auth/actions";
import { CreateWorkSpaceForm } from "@/features/workspaces/components/create-workspace-form";

async function workspaceCreatePage() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return (
    <div className="w-full lg:max-w-xl">
      <CreateWorkSpaceForm />
    </div>
  );
}

export default workspaceCreatePage;

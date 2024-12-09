
import { CreateWorkSpaceForm } from "@/features/workspaces/components/create-workspace-form";

 function workspaceCreatePage() {

  return (
    <div className="w-full lg:max-w-xl">
      <CreateWorkSpaceForm onCancel={true}/>
    </div>
  );
}

export default workspaceCreatePage;

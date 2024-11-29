"use client";

import { CreateProjectForm } from "@/features/projects/components/create-project-form";

function CreateProject() {
  return (
    <div className="w-full lg:max-w-xl">
      <CreateProjectForm  onCancel={true} />
    </div>
  );
}

export default CreateProject;

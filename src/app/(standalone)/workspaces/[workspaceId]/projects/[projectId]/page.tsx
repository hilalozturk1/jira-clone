"use client";

import { useProjectId } from "@/features/workspaces/hooks/use-project-id";

const Project = () => {
  const projectId = useProjectId();

  return <div>Project {projectId} </div>;
};

export default Project;

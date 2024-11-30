import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/actions";
import { ProjectIdClient } from "./client";

const Project = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <ProjectIdClient />;
};

export default Project;

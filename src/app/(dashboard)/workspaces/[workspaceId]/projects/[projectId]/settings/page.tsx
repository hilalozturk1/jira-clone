import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/actions";
import { ProjectIdSettingsClient } from "./client";

async function ProjectIdSettings() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return (
    <div className="w-full lg:max-w-xl">
      <ProjectIdSettingsClient />
    </div>
  );
}

export default ProjectIdSettings;

import { getWorkspaces } from "@/features/workspaces/actions";
import { redirect } from "next/navigation";

async function HomePage() {


  const workspaces = await getWorkspaces();
  if (workspaces?.total === 0) {
    redirect("/workspaces/create");
  } else {
    workspaces?.documents[0]?.$id
      ? redirect(`/workspaces/${workspaces?.documents[0].$id}`)
      : redirect("/");
  }
}

export default HomePage;

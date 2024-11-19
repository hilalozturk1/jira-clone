import Link from "next/link";
import Image from "next/image";

import { Projects } from "./projects";
import { Separator } from "../components/ui/separator";
import { Navigation } from "../components/navigation";
import WorkspaceSwither from "./workspace-swither";

function Sidebar() {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link href="" className="flex justify-center items-center">
        <Image src="/logo.svg" alt="logo" width={35} height={35} />
        <span className="ms-4 text-amber-400 text-primary font-medium">
          Company
        </span>
      </Link>
      <Separator className="my-4" />
      <WorkspaceSwither />
      <Separator className="my-4" />
      <Navigation />
      <Projects />
    </aside>
  );
}

export default Sidebar;

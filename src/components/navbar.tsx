import { UserButton } from "@/features/auth/components/user-button";
import MobileSidebar from "./mobile-sidebar";

function Navbar() {
  return (
    <nav className="bg-slate-100 p-6 flex items-center justify-between">
      <div className="flex-col hidden lg:flex">
        <h1 className="text-2xl text-slate-600 font-medium">Home</h1>
        <p className="text-muted-foreground text-xs">
          Monitor all of your projects and tasks here
        </p>
      </div>
      <MobileSidebar />
      <UserButton />
    </nav>
  );
}

export default Navbar;

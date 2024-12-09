import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { Loader } from "lucide-react";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <div className="min-h-screen">
      <div className="flex w-full h-full">
        <Loader/>
        {children}
      </div>
    </div>
  );
};

export default HomeLayout;

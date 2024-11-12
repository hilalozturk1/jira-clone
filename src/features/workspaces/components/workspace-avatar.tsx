import Image from "next/image";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface WorkspaceAvatarProps {
  image?: string;
  name: string;
  className?: string;
}

export const WorkspaceAvatar = ({
  image,
  name,
  className,
}: WorkspaceAvatarProps) => {
  if (image) {
    return (
      <div className={cn("size-10 relative rounded-md overflow-hidden")}>
        <Image src={image} alt={name} fill className="object-cover" /> {name}
      </div>
    );
  }

  return (
    <Avatar className={cn("size-10 rounded-md", className)}>
      <AvatarFallback className="rounded-md text-white bg-blue-600 font-semibold text-lg uppercase">
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
};

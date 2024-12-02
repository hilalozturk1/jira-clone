import Image from "next/image";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface WorkspaceAvatarProps {
  image?: string;
  name: string | undefined;
  className?: string;
  fallbackClassName?: string;
  imageClassName?: string;
}

export const WorkspaceAvatar = ({
  image,
  name,
  className,
  fallbackClassName,
  imageClassName,
}: WorkspaceAvatarProps) => {
  if (image) {
    return (
      <div
        className={cn("relative rounded-md overflow-hidden", imageClassName)}
      >
        <Image src={image} alt="" fill className="object-cover" /> {name}
      </div>
    );
  }

  return (
    <Avatar className={cn("size-10 rounded-md", className)}>
      <AvatarFallback
        className={cn(
          "rounded-lg text-neutral-500 bg-amber-100 bg-opacity-50 uppercase font-semibold text-lg",
          fallbackClassName
        )}
      >
        {name && name[0]}
      </AvatarFallback>
    </Avatar>
  );
};

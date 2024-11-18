import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface MembersAvatarProps {
  name?: string;
  className: string;
  fallbackClassName?: string;
}

export const MemberAvatar = ({
  name,
  className,
  fallbackClassName,
}: MembersAvatarProps) => {
  return (
    <Avatar className={cn("size-5 transition", className)}>
      <AvatarFallback
        className={cn(
          "bg-neutral-200 font-medium text-neutral-600 flex items-center justify-center",
          fallbackClassName
        )}
      >
        {name?.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

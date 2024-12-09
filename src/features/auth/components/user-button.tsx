"use client";

import { Loader, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

import { useLogout } from "../api/use-logout";
import { useCurrent } from "../api/use-current";

export const UserButton = () => {
  const { data, isLoading } = useCurrent();
  const { mutate } = useLogout();

  if (isLoading) {
    return (
      <div className="size-10 rounded-lg flex items-center justify-center bg-neutral-200 border border-neutral-300">
        <Loader className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  //const { name, email } = data?.data.name ? data?.data.name : {};

  //const avatarFallback = name ? name : email;

  {
    /**
  name
    ? name.slice(0, 1).toUpperCase()
    : email.slice(0, 1).toUpperCase(); */
  }
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opacity-75 transition border rounded-lg bg-neutral-100 border-none">
          <AvatarFallback className="rounded-lg bg-white font-medium text-neutral-500 flex items-center justify-center border-none">
            {"User"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-60"
        sideOffset={10}
      >
        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
          <Avatar className="size-[52px] border rounded-lg border-neutral-100">
            <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center">
              {"User"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-neutral-900">
              {"User"}
            </p>
            <p className="text-xs text-neutral-500">{"user@gmail.com"}</p>
          </div>
        </div>
        <Separator />
        <DropdownMenuItem
          onClick={() => mutate()}
          className="h-10 flex items-center justify-center text-amber-700 curson-pointer font-medium"
        >
          <LogOut className="size-2 mr-2" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

import { MemberType } from "../types";

import { SettingsIcon } from "lucide-react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WorkspaceAvatar } from "@/features/workspaces/components/workspace-avatar";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

interface MemberProps {
  members: MemberType[] | undefined | [];
  total: number | undefined;
}

export const MemberListWorkspace = ({ members, total }: MemberProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();

  return (
    members && (
      <div className="flex flex-col col-span-1 my-1 pt-4 px-4 bg-slate-200 bg-opacity-25">
        <div className="flex items-center justify-between ">
          <p className="text-md">Member Count: {total}</p>
          <Button
            variant="outline"
            size="icon"
            className="bg-amber-100 bg-opacity-50 text-xs text-slate-400 rounded-full"
            onClick={() => {
              router.push(`/workspaces/${workspaceId}/members`);
            }}
          >
            <SettingsIcon className="size-4" />
          </Button>
        </div>
        <div className="my-2" />
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {members.length > 0 ? (
            members.map((member) => (
              <li key={member.$id} className="mb-4">
                <Card className="shadow-none bg-inherit rounded-full border-slate-200 border-opacity-50 hover:opacity-75 transition">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex flex-col">
                      <div className="items-center justify-between flex mb-1">
                        <div className="flex items-center">
                          <div className="size-2 rounded-full bg-slate-300 mr-6" />
                          <WorkspaceAvatar
                            image={member?.imageUrl}
                            name={member?.name}
                            className="size-7 mr-2"
                            fallbackClassName="text-xs font-light"
                            imageClassName="size-7 mr-2"
                          />
                          <span className="truncate font-light text-sm">
                            {member.name}
                          </span>
                        </div>
                        <span className="truncate font-light text-sm ml-8">
                          {member.email}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))
          ) : (
            <li>No members found.</li>
          )}
        </ul>
      </div>
    )
  );
};

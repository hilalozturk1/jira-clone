"use client";

import { RiAddCircleFill } from "react-icons/ri";

import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WorkspaceAvatar } from "@/features/workspaces/components/workspace-avatar";

function WorkspaceSwither() {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { data } = useGetWorkspaces();

  const onSelect = (id: string) => {
    router.push(`/workspaces/${id}`);
  };

  const createWorkspace = () => {
    router.push(`/workspaces/create`);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Workspaces</p>
        <RiAddCircleFill
          onClick={createWorkspace}
          className="size-5 text-neutral-300 cursor-pointer hover:opacity-75 transition"
        />
      </div>
      <Select onValueChange={onSelect} value={workspaceId}>
        <SelectTrigger className="w-full text-slate-500 bg-slate-200 text-[15px] font-normal p-2 border-none shadow-none h-10">
          <SelectValue placeholder="No workspace selected." />
        </SelectTrigger>
        <SelectContent>
          {data?.documents.map((i) => (
            <SelectItem key={i.$id} value={i.$id}>
              <div className="flex justify-start items-center gap-3">
                <WorkspaceAvatar
                  image={i.imageUrl}
                  name={i.name}
                  imageClassName="size-2 text-sm font-normal bg-slate-300"
                  className="size-6 text-sm font-normal bg-slate-300"
                  fallbackClassName="bg-slate-300 text-lg font-normal"
                />
                <span className="truncate">{i.name}</span>
              </div>{" "}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default WorkspaceSwither;

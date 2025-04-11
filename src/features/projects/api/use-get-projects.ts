import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { InferResponseType } from "hono";
import { toast } from "sonner";
import router from "next/router";

interface UseGetProjectsProps {
  workspaceId: string;
}
type ResponseType = InferResponseType<(typeof client.api.projects)["$get"]>;

export const useGetProjects = ({ workspaceId }: UseGetProjectsProps) => {
  const query = useQuery({
    queryKey: ["projects", workspaceId],
    queryFn: async () => {
      const response = await client.api.projects.$get({
        query: { workspaceId },
      });


      const asynResponse = async () => {
        return await response.json();
      };

      const responseValues: ResponseType = await asynResponse();
  
      responseValues.status === 500 && toast.error(responseValues.message);
      responseValues.status === 200 && router.push("/home");

      return responseValues;

    },
  });

  return query;
};

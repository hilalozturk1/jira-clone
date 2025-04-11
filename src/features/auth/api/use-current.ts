import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { toast } from "sonner";
import { InferResponseType } from "hono";
import { responses } from "../../../../assets/responses";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<(typeof client.api.auth.current)["$get"]>;

export const useCurrent = () => {
  const query = useQuery({
    queryKey: ["current"],
    queryFn: async () => {
      const response = await client.api.auth.current.$get();

      if (!response.ok && response.status === 401) {
        toast.success(response?.statusText);
      }

      const asynResponse = async () => {
        return await response.json();
      };

      const responseValues: ResponseType = await asynResponse();
      responseValues.message === "Unauthorized" && responses.current.error;
      responseValues.status === 200 && responses.current.success;
      return responseValues;
    },
  });

  return query;
};

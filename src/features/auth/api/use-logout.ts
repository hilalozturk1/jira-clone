import { useMutation } from "@tanstack/react-query";
import { InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.auth.logout)["$post"]>;

export const useLogout = () => {
  const router = useRouter();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.auth.logout.$post();

      let responseValues: ResponseType;
      const asynResponse = async () => {
        return await response.json();
      };

      responseValues = await asynResponse();

      responseValues.status === 401 && toast.error(responseValues.message);
      responseValues.status === 200 && router.push("/sign-in");
      
      return responseValues;
    },
    onSuccess: () => {
      toast.message("Succesfuly logout.");
      router.push("/sign-in");
    },
  });

  return mutation;
};

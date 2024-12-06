import { toast } from "sonner";

import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { error } from "console";

type ResponseType = InferResponseType<(typeof client.api.auth.login)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.auth.login)["$post"]>;

export const useLogin = () => {
  const router = useRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.login.$post({ json });

      let responseValues: ResponseType;
      const asynResponse = async () => {
        return await response.json();
      };

      responseValues = await asynResponse();

      responseValues.status === 401 && toast.error(responseValues.message);
      responseValues.status === 200 && router.push("/workspaces/create");

      return responseValues;
    },
    onSettled: (data, error) => {},
  });

  return mutation;
};

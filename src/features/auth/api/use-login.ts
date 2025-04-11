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

      
      const asynResponse = async () => {
        return await response.json();
      };

      const responseValues: ResponseType = await asynResponse();

      responseValues.status === 401 && toast.error(responseValues.message);
      responseValues.status === 200 && router.push("/home");

      return responseValues;
    },
    onSettled: (data, error) => {},
  });

  return mutation;
};

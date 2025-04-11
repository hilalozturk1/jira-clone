import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.auth.register)["$post"]
>;
type RequestType = InferRequestType<(typeof client.api.auth.register)["$post"]>;

export const useRegister = () => {
  const router = useRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.register.$post({ json });
      const data = await response.json();
      if ("error" in data && data.error) {
        throw new Error(data.error.message);
      }
      return data;
    },
    onSuccess: () => {
      router.push("/sign-in");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  return mutation;
};

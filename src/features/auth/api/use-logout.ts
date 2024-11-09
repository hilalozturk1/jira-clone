import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type ResonseType = InferResponseType<typeof client.api.auth.logout["$post"]>;
type RequestType = InferRequestType<typeof client.api.auth.logout["$post"]>;

export const useLogin = () => {
    const mutation = useMutation<
    ResonseType,
    Error,
    RequestType>({
        mutationFn: async() => {
           const response = await client.api.auth.logout.$post();
           return await response.json(); 
        }
    });

    return mutation;
}
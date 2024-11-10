import { useMutation } from "@tanstack/react-query";
import { InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type ResonseType = InferResponseType<typeof client.api.auth.logout["$post"]>;

export const useLogout = () => {

    const mutation = useMutation<
    ResonseType,
    Error>({
        mutationFn: async() => {
           const response = await client.api.auth.logout.$post();
           return await response.json(); 
        },
        onSuccess: () => {
           window.location.reload()
        }
    });

    return mutation;
}
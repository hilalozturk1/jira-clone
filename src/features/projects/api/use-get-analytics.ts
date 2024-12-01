import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

interface UseGetAnalyticsProps {
  projectId: string;
}

export const useGetAnalytics = ({ projectId }: UseGetAnalyticsProps) => {
  const query = useQuery({
    queryKey: ["project/analytics", projectId],
    queryFn: async () => {
      const response = await client.api.projects[":projectId"][
        "analytics"
      ].$get({
        param: { projectId },
      });

      if (!response.ok) {
        throw new Error("Failed fetching.");
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};

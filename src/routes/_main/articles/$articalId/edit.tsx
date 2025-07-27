import { createFileRoute } from "@tanstack/react-router";
import ArticaleForm from "@/components/pagesComponents/articles";
import { useSuspenseQuery } from "@tanstack/react-query";
import axiosInstance from "@/services/instance";
import { RouterContext } from "@/main";
import useFetch from "@/hooks/UseFetch";
import { prefetchWithUseFetchConfig } from "@/utils/preFetcher";

export const Route = createFileRoute("/_main/articles/$articalId/edit")({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    const { queryClient } = context as RouterContext;
    const endpoint = `articals/${params.articalId}`;
    await prefetchWithUseFetchConfig(queryClient, [endpoint], endpoint);
    return {
      articalId: params.articalId,
    };
  },
});

function RouteComponent() {
  const { articalId } = Route.useParams();
  const endpoint = `articals/${articalId}`;
  const { data } = useFetch({
    queryKey: [endpoint],
    endpoint,
    suspense: true,
  });
  return <ArticaleForm fetchData={data} />;
}

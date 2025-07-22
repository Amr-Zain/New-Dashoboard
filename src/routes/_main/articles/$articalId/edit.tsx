import { createFileRoute } from "@tanstack/react-router";
import ArticaleForm from "@/components/pagesComponents/articles";
import { useSuspenseQuery } from "@tanstack/react-query";
import axiosInstance from "@/services/instance";
import { RouterContext } from "@/main";

export const Route = createFileRoute("/_main/articles/$articalId/edit")({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    const { queryClient } = context as RouterContext;
    const endpoint = `articals/${params.articalId}`;
    await queryClient.prefetchQuery({
      queryKey: [endpoint],
      queryFn: async () => {
        const res = await axiosInstance.get(endpoint);
        if (res.data?.error) {
          throw new Error(res.data.message);
        }
        return res.data;
      },
    });
    return {
      articalId: params.articalId,
    };
  },
});

function RouteComponent() {
  const { articalId } = Route.useLoaderData();
  const endpoint = `articals/${articalId}`;
  const { data } = useSuspenseQuery({
    queryKey: [endpoint],
    queryFn: async () => {
      const res = await axiosInstance.get(endpoint);
      if (res.data?.error) {
        throw new Error(res.data.message);
      }
      return res.data;
    },
  });
  return <ArticaleForm fetchData={data} />;
}

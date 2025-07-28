import { createFileRoute } from "@tanstack/react-router";
import ArticaleForm from "@/components/pagesComponents/articles";
import { useSuspenseQuery } from "@tanstack/react-query";
import axiosInstance from "@/services/instance";
import { RouterContext } from "@/main";

export const Route = createFileRoute("/_main/branches/$branchId/edit")({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    const { queryClient } = context as RouterContext;
    const endpoint = `awards/${params.branchId}`;
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
      branchId: params.branchId,
    };
  },
});

function RouteComponent() {
  const { branchId } = Route.useLoaderData();
  const endpoint = `awards/${branchId}`;
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

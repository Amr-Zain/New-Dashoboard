import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import AppTable from "@/components/UiComponents/table/AppTable";
import { Edit, Home, Slider, Trash } from "iconsax-reactjs";
import TableImage from "@/components/UiComponents/table/TableImage";
import { useState } from "react";
import TableDeleteBtn from "@/components/UiComponents/table/TableDeleteBtn";
import { useNavigate } from "@tanstack/react-router";
import MainPageWrapper, {
  breadcrumbItem,
} from "@/components/generalComponents/layout/MainPageWrapper";
import { RouterContext } from "@/main";
import axiosInstance from "@/services/instance";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_main/branches/")({
  component: Branches,
  validateSearch: (search) => {
    return { page: (search.page as string) || "1" };
  },
  loaderDeps: ({ search: { page } }) => ({ page }),
  loader: async ({ context, deps: { page } }) => {
    const endpoint = `awards?page=${page}`;
    const { queryClient } = context as RouterContext;

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
   
  },
});
function Branches() {
  const currentSearchParams = Route.useSearch();
  const endpoint = `awards?page=${currentSearchParams.page}`;
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
  const { t } = useTranslation();
  const [refetchKey, setRefetchKey] = useState(0);
  const router = useNavigate();

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: "10",
      render: (_: any, record: any, index: number) => index + 1,
    },
    {
      title: t("tables.image"),
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <div className="flex items-center gap-2 min-w-36">
          <TableImage imgSrc={image} alt="product" />
        </div>
      ),
    },
    {
      title: t("tables.text"),
      dataIndex: "title",
      key: "title",
      sorter: true,
    },
    {
      title: t("tables.actions"),
      key: "action",
      render: (_: any, record: any) => {
        return (
          <div className="flex items-center gap-2 justify-center">
            <button
              onClick={() => router({ to: `/branches/${record?.id}/edit` })}
            >
              {" "}
              {/* Changed navigation call */}
              <Edit className="size-9 text-green-600 p-2 bg-green-100/80 rounded-full" />
            </button>
            <TableDeleteBtn
              item={record}
              endpoint={endpoint}
            />
          </div>
        );
      },
      align: "center",
    },
  ];

  const breadcrumbItems: breadcrumbItem[] = [
    { label: t("pages.home"), to: "/", icon: <Home /> },
    { label: t("pages.branches"), icon: <Slider /> },
  ];
  return (
    <MainPageWrapper breadcrumbItems={breadcrumbItems}>
      <AppTable
        columns={columns}
        tableData={data}
        headerModal={t("labels.add_award")}
        handleHeaderModal={() => router({ to: "/branches/add" })}
        currentSearchParams={currentSearchParams}
      />
    </MainPageWrapper>
  );
}

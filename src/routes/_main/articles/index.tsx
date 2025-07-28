import {
  createFileRoute,
  Link,
  redirect,
  Route as RouteType,
} from "@tanstack/react-router";
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
import useFetch from "@/hooks/UseFetch";
import { prefetchWithUseFetchConfig } from "@/utils/preFetcher";
import { useIsRTL } from "@/hooks/useIsRTL";

export const Route = createFileRoute("/_main/articles/")({
  component: Articles,
  // pendingComponent: LoaderPage,
  validateSearch: (search) => {
    return { page: (search?.page as string) || "1" };
  },
  loaderDeps: ({ search: { page } }) => ({ page }),
  loader: async ({ context, deps: { page } }) => {
    const { queryClient } = context as RouterContext;
    const endpoint = `articals`;
    await prefetchWithUseFetchConfig(queryClient, [endpoint], endpoint, {
      page,
    });
  },
});
function Articles() {
  const currentSearchParams = Route.useSearch();
  const endpoint = `articals`;
  const { data } = useFetch({
    queryKey: [endpoint],
    endpoint,
    suspense: true,
    params: { page: currentSearchParams.page },
  });
  const { t } = useTranslation();
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
            <Link to="/articles/$articalId/edit" params={{ articalId: record.id }} preload='intent'
            >
              {" "}
              {/* Changed navigation call */}
              <Edit className="size-9 text-green-600 p-2 bg-green-100/80 rounded-full" />
            </Link>
            <TableDeleteBtn item={record} endpoint={endpoint} />
          </div>
        );
      },
      align: "center",
    },
  ];

  const breadcrumbItems: breadcrumbItem[] = [
    { label: t("pages.home"), to: "/", icon: <Home /> },
    { label: t("pages.articles"), icon: <Slider /> },
  ];
  return (
    <MainPageWrapper breadcrumbItems={breadcrumbItems}>
      <AppTable
        columns={columns}
        tableData={data}
        headerModal={t("labels.add_slider")}
        handleHeaderModal={() => router({ to: "/articles/add" })}
        currentSearchParams={currentSearchParams}      />
    </MainPageWrapper>
  );
}

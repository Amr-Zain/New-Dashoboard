import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import AppTable from "@/components/UiComponents/table/AppTable";
import { Edit, Home, Slider, Trash } from "iconsax-reactjs";
import TableImage from "@/components/UiComponents/table/TableImage";
import { Suspense, useEffect, useMemo, useState } from "react";
import TableDeleteBtn from "@/components/UiComponents/table/TableDeleteBtn";
import { useNavigate } from "@tanstack/react-router";
import MainPageWrapper, {
  breadcrumbItem,
} from "@/components/generalComponents/layout/MainPageWrapper";
import { RouterContext } from "@/main";
import useFetch from "@/hooks/UseFetch";
import { prefetchWithUseFetchConfig } from "@/utils/preFetcher";
import { TableProps } from "antd";

export const Route = createFileRoute("/_main/articles/")({
  component: Articles,
  // pendingComponent: LoaderPage,
  validateSearch: (search) => {
    const searchParams: { page?: string } = {
      page: (search?.page as string) || "1",
    };
    return searchParams;
  },
  loaderDeps: ({ search: { page } }) => ({ page }),
  loader: async ({ context, deps: { page } }) => {
    const { queryClient } = context as RouterContext;
    const endpoint = `articals`;
    await prefetchWithUseFetchConfig(queryClient, [endpoint], endpoint, {
      page,
    });
  },
  // staleTime: 10_000,
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

  const columns: TableProps["columns"] = [
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
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: t("tables.actions"),
      key: "action",
      render: (_: any, record: any) => {
        return (
          <div className="flex items-center gap-2 justify-center">
            <Link
              to={`/articles/$articalId/edit`}
              params={{ articalId: record.id }}
              preload="render"
            >
              {" "}
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
        currentSearchParams={currentSearchParams}
        showExport
        exportEndPoint={endpoint}
      />
    </MainPageWrapper>
  );
}
/* 
// src/pages/UsersPage.tsx

import { ColumnGroupType, ColumnType } from 'antd/es/table';
import { generateAllFakeUsers, User } from '@/utils/fakeData'; // Import the new generator
import { Button } from 'antd';
import { PaginatedApiResponse } from '@/types/api'; // Ensure this is imported

interface UsersSearch {
  page?: string;
  keyword?: string;
  status?: 'active' | 'inactive' | 'pending' | 'all';
}

const UsersPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate(); // For updating URL search params
  const currentSearchParams = Route.useSearch();

  // --- Client-side data management ---
  const allUsers = useMemo(() => generateAllFakeUsers(100), []); // Generate 100 fake users once

  const [currentPage, setCurrentPage] = useState(Number(currentSearchParams.page) || 1);
  const [searchTerm, setSearchTerm] = useState(currentSearchParams.keyword  || "");
  const [activeTab, setActiveTab] = useState(currentSearchParams.status || 'all');

  const pageSize = 10; // Define page size for client-side pagination

  // Update states when URL search params change (e.g., from direct URL entry or browser navigation)
  useEffect(() => {
    setCurrentPage(Number(currentSearchParams.page) || 1);
    setSearchTerm(currentSearchParams.keyword || "");
    setActiveTab(currentSearchParams.status || 'all');
  }, [currentSearchParams]);

  // Apply filters and pagination to the data
  const processedData: PaginatedApiResponse<User> = useMemo(() => {
    let filteredData = allUsers;

    // 1. Apply search filter
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filteredData = filteredData.filter(user =>
        user.name.en.toLowerCase().includes(lowerSearchTerm) ||
        user.email.toLowerCase().includes(lowerSearchTerm)
      );
    }

    // 2. Apply status filter (from tabs)
    if (activeTab && activeTab !== 'all') {
      filteredData = filteredData.filter(user => user.status === activeTab);
    }

    const total = filteredData.length;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      meta: {
        total: total,
        page: currentPage,
        limit: pageSize,
      },
    };
  }, [allUsers, currentPage, searchTerm, activeTab, pageSize]);

  // --- End client-side data management ---

  const columns: (ColumnGroupType<User> | ColumnType<User>)[] = [
    {
      title: t('table.name'),
      dataIndex: ['name', 'en'], 
      key: 'name.en', 
      sorter: (a, b) => a.name.en.localeCompare(b.name.en),
    },
    {
      title: t('table.email'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t('table.role'),
      dataIndex: 'role',
      key: 'role',
      render: (role: User['role']) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold
            ${role === 'admin' ? 'bg-blue-100 text-blue-800' : ''}
            ${role === 'user' ? 'bg-green-100 text-green-800' : ''}
            ${role === 'editor' ? 'bg-purple-100 text-purple-800' : ''}
          `}
        >
          {t(`roles.${role}`)}
        </span>
      ),
    },
    {
      title: t('table.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: User['status']) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold
            ${status === 'active' ? 'bg-green-100 text-green-800' : ''}
            ${status === 'inactive' ? 'bg-red-100 text-red-800' : ''}
            ${status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
          `}
        >
          {t(`status.${status}`)}
        </span>
      ),
    },
    {
      title: t('table.age'),
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: t('table.createdAt'),
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: t('table.actions'),
      key: 'actions',
      render: (_, record) => (
        <Button size="small" onClick={() => alert(`View ${record.name.en}`)}>
          {t('button.view')}
        </Button>
      ),
    },
  ];

  const handleAddUser = () => {
    alert('Add New User Modal/Drawer should open!');
  };

  const tabs = [
    { key: 'all', label: t('tabs.all') },
    { key: 'active', label: t('tabs.active') },
    { key: 'inactive', label: t('tabs.inactive') },
    { key: 'pending', label: t('tabs.pending') },
  ];

  const filterProps = {
    statusData: [
      { id: 'active', name: t('status.active') },
      { id: 'inactive', name: t('status.inactive') },
      { id: 'pending', name: t('status.pending') },
    ],
    statusTitle: t('filter.status'),
    dateTitle: t('filter.dateRange'),
    FilterByPrice: false,
    statusKey: 'status',
  };

  const updateSearchParams = (newParams: Partial<UsersSearch>) => {
    navigate({
      to: '.',
      search: {
        ...currentSearchParams,
        ...newParams,
        page: newParams.page || currentSearchParams.page || '1', // Always ensure page is present
      } as unknown as true,
    });
  };

  return (
    <>
    <AppTable<User>
      showExport
      tableData={processedData} 
      columns={columns}
      showSelection={true}
      // hasSearch={true}
       hasFilter={true}
      headerModal={t('button.addNewUser')}
      handleHeaderModal={handleAddUser}
      // tableTitle={<h2 className="text-2xl font-bold">{t('table.users')}</h2>}
      currentSearchParams={currentSearchParams} // Pass currentSearchParams for URL updates
      tabs={tabs}
      filterProps={filterProps}
     
    />
    </>
  );
};


export default UsersPage; */

/*  */

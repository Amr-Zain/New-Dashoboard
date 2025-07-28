import React, { JSX, useEffect, useState } from "react";
import { Input, Skeleton, Table, Tabs } from "antd";
import type { TableProps } from "antd";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import TableFilter from "./TableFilter";
import { Add, Filter } from "iconsax-reactjs";
import i18n from "@/i18n";
import useFetch from "@/hooks/UseFetch";

import "@/styles/components/app-table.scss";
import TableSkeleton from "./TableSkeleton";

interface AppTableProps<T> extends TableProps<T> {
  style?: React.CSSProperties;
  columns: any;
  tableData?: any;
  dataSource?: T[];
  header?: React.ReactNode;
  pagination?: TableProps<T>["pagination"];
  expandable?: TableProps<T>["expandable"];
  rowKey?: string | ((record: T) => string);
  loading?: boolean;
  className?: string;
  tableTitle?: React.ReactNode | string;
  endpoint?: string;
  rowClassName?: (record: T, index: number) => string;
  showSelection?: boolean;
  hasFilter?: boolean;
  hasSearch?: boolean;
  headerModal?: string;
  handleHeaderModal?: () => void;
  currentSearchParams: Record<string, any>;
  tabs?: any;
  filterProps?: {
    statusData?: { id: string; name: string }[];
    statusTitle?: string;
    dateTitle?: string;
    FilterByPrice?: boolean;
    statusKey?: string;
  };
}

const AppTable = <T extends Record<string, any>>({
  columns,
  header,
  tableData,
  pagination,
  expandable,
  endpoint,
  rowKey = "id",
  loading,
  className,
  rowClassName,
  showSelection = false,
  hasFilter,
  hasSearch,
  headerModal,
  handleHeaderModal,
  tableTitle,
  currentSearchParams,
  tabs,
  filterProps,
  ...restProps
}: AppTableProps<T>): JSX.Element => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();
  const { keyword, status } = currentSearchParams;
  const page = 1;
  const initialSearchTerm = keyword || "";
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const initialTab = status || tabs?.[0]?.key || "";
  const [activeTab, setActiveTab] = useState(initialTab);
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(Number(page) || 1);

  const {
    data: fetchedData,
    isLoading,
    refetch,
  } = useFetch<any>({
    queryKey: [`${endpoint}`],
    endpoint: endpoint || "",
    params: {
      page: currentPage,
      limit: 10,
      keyword: searchTerm,
      status: activeTab === "all" ? undefined : activeTab,
    },
    onSuccess: (data) => {
      console.log("Fetched data:", data);
    },
    enabled: !!endpoint,
  });
  const sourceData = endpoint ? fetchedData : tableData;
  useEffect(() => {
    setCurrentPage(Number(page) || 1);
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    navigate({ to:".", search: { ...currentSearchParams, page: newPage.toString() } as unknown as true});
  };

  useEffect(() => {
    const typeFromParams = status || tabs?.[0]?.key || "";
    setActiveTab(typeFromParams);
  }, [status, tabs]);

  const rowSelection: TableProps<T>["rowSelection"] = showSelection
    ? {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log("Selected Rows:", selectedRows);
        },
      }
    : undefined;

  const handleBlur = () => {
    const newSearch = { ...currentSearchParams }; // Use currentSearchParams
    if (searchTerm) {
      newSearch.keyword = searchTerm;
    } else {
      delete newSearch.keyword;
    }
    navigate({ to:'.', search: newSearch });
  };

  const handleSort = (field: string, order: "ascend" | "descend") => {
    const languageKey = i18n.language === "ar" ? "ar" : "en";
    const source = sourceData?.data;
    if (!source) return;

    const sortedData = [...source].sort((a: any, b: any) => {
      const aValue = a[languageKey]?.[field] || a[field];
      const bValue = b[languageKey]?.[field] || b[field];

      if (typeof aValue == "string" && typeof bValue == "string") {
        return order === "ascend"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return order === "ascend"
          ? parseFloat(a[field]) - parseFloat(b[field])
          : parseFloat(b[field]) - parseFloat(a[field]);
      }
    });
  };

  return (
    <div className="app-table-container">
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <>
          <div className="table-header">
            {tabs && (
              <Tabs
                activeKey={activeTab}
                onChange={(key) => {
                  const newSearch = { ...currentSearchParams };
                  if (key == "all") {
                    delete newSearch.status;
                  } else {
                    newSearch.status = key;
                  }
                  navigate({ to: '.', search: newSearch });
                  setActiveTab(key);
                }}
                items={tabs.map(({ key, label }: any) => ({ key, label }))}
                className="custom-tabs-wrapper app-table-tabs"
              />
            )}

            {tableTitle && tableTitle}

            {hasSearch && (
              <Input
                className="lg:max-w-[300px] h-12 rounded-xl"
                placeholder={t("form.search")}
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                prefix={
                  <IoSearch className="text-[#B0B0B0] size-4 rtl:rotate-90" />
                }
                allowClear
                onBlur={handleBlur}
              />
            )}

            {hasFilter && (
              <button
                onClick={() => setOpenDrawer(true)}
                className=" flex items-center gap-2 rounded-[12px] h-12 py-5 px-6 border border-[#EEEEEE]"
              >
                <Filter />
                {t("Text.filter")}
              </button>
            )}

            {headerModal && (
              <button className="app-btn" onClick={handleHeaderModal}>
                <Add />
                {headerModal}
              </button>
            )}
          </div>

          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={sourceData?.data}
            expandable={expandable}
            loading={isLoading}
            rowKey={rowKey}
            className={className}
            rowClassName={rowClassName}
            pagination={{
              current: currentPage,
              pageSize: 10,
              total: sourceData?.meta?.total || 0,
              onChange: handlePageChange,
            }}
            {...restProps}
            onChange={(pagination, filters, sorter: any) => {
              if (sorter.order && sorter.columnKey) {
                handleSort(sorter.columnKey, sorter.order);
              }
            }}
          />

          {hasFilter && (
            <TableFilter
              openDrawer={openDrawer}
              setOpenDrawer={setOpenDrawer}
              currentSearchParams={currentSearchParams}
              {...filterProps}
            />
          )}
        </>
      )}
    </div>
  );
};

export default AppTable;

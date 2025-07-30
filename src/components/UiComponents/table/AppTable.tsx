
import React, { JSX, useState } from "react";
import { Input, Table, message } from "antd"; 
import type { TableProps } from "antd";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import TableFilter from "./TableFilter";
import { Add, Filter } from "iconsax-reactjs";
import i18n from "@/i18n";

import type { PaginatedApiResponse } from "@/types/api";
import useFetch from "@/hooks/UseFetch";

import "@/styles/components/app-table.scss";
import TableSkeleton from "./TableSkeleton";
import AppTabs from "@/components/profile/AppTabs";
import ExtractFile from "./ExtractFile";

interface AppTableProps<T> extends TableProps<T> {
  style?: React.CSSProperties;
  columns: TableProps<T>["columns"];
  tableData?: PaginatedApiResponse<T>;
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
  currentSearchParams: Record<string, string | undefined>;
  tabs?: { key: string; label: React.ReactNode }[];
  filterProps?: {
    statusData?: { id: string; name: string }[];
    statusTitle?: string;
    dateTitle?: string;
    FilterByPrice?: boolean;
    statusKey?: string;
  };
  showExport?: boolean;
  exportEndPoint?: string;
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
  showExport = false,
  exportEndPoint,
  ...restProps
}: AppTableProps<T>): JSX.Element => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const navigate = useNavigate();
  const { keyword, status } = currentSearchParams;
  const page = currentSearchParams.page || "1";

  const [searchTerm, setSearchTerm] = useState(keyword || "");
  const { t } = useTranslation();

  const { data: fetchedData, isLoading } = useFetch<PaginatedApiResponse<T>>({
    queryKey: [`${endpoint}`],
    endpoint: endpoint || "",
    params: {
      page,
      limit: 10,
      keyword: searchTerm,
      status: status === "all" ? undefined : status,
    },
    onSuccess: (data) => {
      console.log("Fetched data:", data);
    },
    enabled: !!endpoint,
  });

  const sourceData = endpoint ? fetchedData : tableData;

  const handlePageChange = (newPage: number) => {
    navigate({
      to: ".",
      search: {
        ...currentSearchParams,
        page: newPage.toString(),
      },
    });
  };

  const handleRowSelectionChange = (
    selectedRowKeys: React.Key[],
    selectedRows: T[]
  ) => {
    setSelectedRows(selectedRows);
    console.log("Selected Rows:", selectedRows);
  };

  const rowSelection: TableProps<T>["rowSelection"] = showSelection
    ? {
        onChange: handleRowSelectionChange,
        selectedRowKeys: selectedRows.map((row) => {
          // Ensure rowKey is correctly extracted for selected rows
          if (typeof rowKey === "function") {
            return rowKey(row);
          }
          return row[rowKey as keyof T];
        }) as React.Key[], // Cast to React.Key[]
      }
    : undefined;

  const handleBlur = () => {
    const newSearch = { ...currentSearchParams };
    if (searchTerm) {
      newSearch.keyword = searchTerm;
    } else {
      delete newSearch.keyword;
    }
    navigate({ to: ".", search: newSearch });
  };

  const handleSort = (field: string, order: "ascend" | "descend") => {
    const languageKey = i18n.language === "ar" ? "ar" : "en";
    const source = sourceData?.data;
    if (!source) return;

    const sortedData = [...source].sort((a: T, b: T) => {
      const aValue = (a as any)[languageKey]?.[field] || a[field];
      const bValue = (b as any)[languageKey]?.[field] || b[field];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return order === "ascend"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        const numA = parseFloat(aValue);
        const numB = parseFloat(bValue);
        return order === "ascend" ? numA - numB : numB - numA;
      }
    });
    // If you want client-side sorting to affect the displayed data,
    // you would need a state variable for `dataSource` and update it here:
    // setDataSource(sortedData);
  };

  return (
    <div className="app-table-container">
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <>
          <div className="table-header">
            {tabs && (
              <AppTabs
                active={status || tabs?.[0]?.key}
                tabItems={tabs.map(({ key, label }) => ({ key, label }))}
                name="status"
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

            {showExport && (
              <ExtractFile
                columns={columns}
                selectedRows={selectedRows}
                endpoint={exportEndPoint}
                currentSearchParams={currentSearchParams}
              />
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
              current: +page,
              pageSize: 10,
              total: sourceData?.meta?.total || 0,
              onChange: handlePageChange,
            }}
            {...restProps}
            onChange={(pagination, filters, sorter) => {
              const singleSorter = Array.isArray(sorter) ? sorter[0] : sorter;
              if (
                singleSorter &&
                singleSorter.order &&
                singleSorter.columnKey
              ) {
                handleSort(
                  singleSorter.columnKey.toString(),
                  singleSorter.order
                );
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

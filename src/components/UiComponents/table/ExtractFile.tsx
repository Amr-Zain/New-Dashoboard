import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ExcelJS from "exceljs"; 
import { message } from "antd";
import { Export } from "iconsax-reactjs";
import type { TableProps } from "antd";
import useFetch from "@/hooks/UseFetch";
import type { PaginatedApiResponse } from "@/types/api";

interface ExtractFileProps<T> {
  columns: TableProps<T>["columns"];
  selectedRows?: T[];
  endpoint?: string;
  currentSearchParams?: Record<string, string | undefined>;
  filename?: string;
}

function ExtractFile<T>({
  selectedRows,
  columns,
  endpoint,
  currentSearchParams = {},
  filename = "exported_data.xlsx",
}: ExtractFileProps<T>) {
  const { t } = useTranslation();
  const [isExporting, setIsExporting] = useState(false);

  const { data: fetchedData, refetch } = useFetch<PaginatedApiResponse<T>>({
    queryKey: [endpoint],
    endpoint: endpoint || "",
    params: {
      ...currentSearchParams,
      limit: 1000,
    },
    enabled: false,
  });

  const handleExportSelected = async () => {
    setIsExporting(true);
    message.loading({ content: t("Text.exporting"), key: "exporting" });

    try {
      let dataToExport: T[] = [];
      if (endpoint) {
        const response = await refetch();
        if (response.data?.data) {
          dataToExport = response.data.data;
        } else {
          message.error({
            content: t("Text.export_failed_fetch_data"),
            key: "exporting",
          });
          return;
        }
      } else if (selectedRows && selectedRows.length > 0) {
        dataToExport = selectedRows;
      } else {
        message.warning({
          content: t("Text.no_data_source_for_export"),
          key: "exporting",
        });
        return;
      }

      if (dataToExport.length === 0) {
        message.warning({
          content: t("Text.no_records_to_export"),
          key: "exporting",
        });
        return;
      }

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Data");

      // Prepare headers
      const excelHeaders: { header: string; key: string; width?: number }[] =
        [];
      const exportableColumns = columns?.filter(
        (
          col
        ): col is { dataIndex: string | string[]; title?: React.ReactNode } =>
          "dataIndex" in col && col.dataIndex !== undefined
      );

      exportableColumns?.forEach((col) => {
        let headerText = "";
        let dataKey = "";

        if (typeof col.title === "string") {
          headerText = col.title;
        } else if (typeof col.dataIndex === "string") {
          headerText = col.dataIndex;
        } else if (Array.isArray(col.dataIndex)) {
          headerText = col.dataIndex.join(".");
        }

        if (typeof col.dataIndex === "string") {
          dataKey = col.dataIndex;
        } else if (Array.isArray(col.dataIndex)) {
          // For array dataIndex, create a concatenated key or a more complex one if needed
          dataKey = col.dataIndex.join("_"); // Using _ for a simpler key for ExcelJS
        }

        if (headerText && dataKey) {
          excelHeaders.push({ header: headerText, key: dataKey, width: 20 }); // Set a default width
        }
      });

      worksheet.columns = excelHeaders;

      // Add data rows
      dataToExport.forEach((row) => {
        const rowData: Record<string, any> = {};
        exportableColumns?.forEach((col) => {
          const dataIndex = col.dataIndex;
          let value: any = undefined;
          let dataKey = "";

          if (typeof dataIndex === "string") {
            if (dataIndex.includes(".")) {
              value = dataIndex
                .split(".")
                .reduce(
                  (acc: any, part: string) =>
                    acc && typeof acc === "object" && acc[part] !== undefined
                      ? acc[part]
                      : undefined,
                  row
                );
            } else {
              value = (row as any)[dataIndex];
            }
            dataKey = dataIndex;
          } else if (Array.isArray(dataIndex)) {
            value = dataIndex.reduce(
              (acc: any, part: string) =>
                acc && typeof acc === "object" && acc[part] !== undefined
                  ? acc[part]
                  : undefined,
              row
            );
            dataKey = dataIndex.join("_");
            // Use the same key as defined in headers
          }
          rowData[dataKey] = value;
        });
        worksheet.addRow(rowData);
      });

      // Generate and download the Excel file
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      message.success({ content: t("Text.export_success"), key: "exporting" });
    } catch (error) {
      console.error("Export error:", error);
      message.error({ content: t("Text.export_failed"), key: "exporting" });
    } finally {
      setIsExporting(false);
    }
  };

  if (!selectedRows?.length && !endpoint) {
    return null;
  }

  return (
    <button
      className="app-btn"
      onClick={handleExportSelected}
      disabled={isExporting}
    >
      <Export />
      {isExporting
        ? t("Text.exporting")
        : selectedRows?.length
          ? t("Text.export_selected")
          : t("Text.export_all")}
    </button>
  );
}

export default ExtractFile;

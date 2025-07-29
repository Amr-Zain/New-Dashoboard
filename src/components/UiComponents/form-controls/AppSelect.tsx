import React, { useMemo } from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import useFetch from "@/hooks/UseFetch";

interface OptionType {
  label: React.ReactNode | string;
  value: string | number;
}

interface FetchedItem {
  id?: string | number;
  name?: string;
  title?: string;
  value?: string | number;
  [lang: string]: any;
}

interface AppSelectProps {
  value?: any;
  onChange?: (value: any) => void;
  placeholder?: string;
  endpoint?: string;
  options?: OptionType[];
  mode?: "multiple" | "tags";
  inputProps?: any;
}

const AppSelect: React.FC<AppSelectProps> = ({
  value,
  onChange,
  placeholder,
  endpoint,
  options,
  mode,
  inputProps,
}) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const { data: fetchedData, isLoading } = useFetch<
    FetchedItem[] | { data: FetchedItem[] }
  >({
    endpoint: endpoint ?? null,
    queryKey: [endpoint],
    enabled: !!endpoint && !options,
    general: inputProps?.general,
    params: inputProps?.params,
  });

  const dynamicOptions = useMemo(() => {
    if (!fetchedData) return [];

    const rawData = Array.isArray(fetchedData)
      ? fetchedData
      : Array.isArray(fetchedData?.data)
      ? fetchedData.data
      : [];

    return rawData.map((item : any) => ({
      label:
        item?.[lang]?.name ??
        item?.name ??
        item?.title ??
        item?.value ??
        "undefined",
      value: item?.id ?? item?.value,
    }));
  }, [fetchedData, lang]);

  const finalOptions = options || dynamicOptions;

  return (
    <Select
      className="ant-select"
      loading={isLoading}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      mode={mode}
      options={finalOptions}
      {...inputProps}
    />
  );
};

export default AppSelect;

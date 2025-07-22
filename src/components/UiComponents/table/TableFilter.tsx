import React, { useEffect, useState } from "react";
import { Checkbox, Collapse, InputNumber } from "antd";
import { useForm } from "antd/es/form/Form";
import AppDrawer from "@/components/UiComponents/drawers/AppDrawer";
import AppForm from "@/components/UiComponents/forms/AppForm";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { ArrowUp } from "iconsax-reactjs";
import { useNavigate, useSearchParams } from "react-router-dom";

interface Props {
  openDrawer: boolean;
  setOpenDrawer: (value: boolean) => void;
  statusData?: { id: string; name: string }[];
  statusTitle?: string;
  dateTitle?: string;
  statusKey?: string;
  FilterByPrice?: boolean;
}

const TableFilter = ({
  openDrawer,
  setOpenDrawer,
  statusData,
  statusTitle,
  dateTitle,
  FilterByPrice,
  statusKey = "status",
}: Props) => {
  const [selectedType, setSelectedType] = useState<any>(null);
  const router = useNavigate();
  const [searchParams,setSearchParams] = useSearchParams();
  const [form] = useForm();
  const {t} = useTranslation();
  const [price, setPrice] = useState<{ min: number | null; max: number | null }>({
    min: null,
    max: null,
  });

  // Setup form fields
  const fields = [
    {
      type: "date",
      name: "from",
      label: t("Text.from"),
      placeholder: t("form.datePlaceholder"),
      span: 12,
    },
    {
      type: "date",
      name: "to",
      label: t("Text.to"),
      placeholder: t("form.datePlaceholder"),
      span: 12,
    },
  ];

  // Load initial values from URL
  useEffect(() => {
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const min_price = searchParams.get("min_price");
    const max_price = searchParams.get("max_price");
    const statusValue = searchParams.get(statusKey);

    form.setFieldsValue({
      from: from ? dayjs(from) : null,
      to: to ? dayjs(to) : null,
    });

    if (FilterByPrice) {
      setPrice({
        min: min_price ? Number(min_price) : null,
        max: max_price ? Number(max_price) : null,
      });
    }

    if (statusValue) {
      setSelectedType(statusValue);
    }
  }, []);

  const updateSearchParams = (params: any) => {
    const newSearchParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]: any) => {
      value ? newSearchParams.set(key, value) : newSearchParams.delete(key);
    });
    router(`?${newSearchParams.toString()}`);
  };

  const clearFilter = () => {
    updateSearchParams({ from: "", to: "", min_price: "", max_price: "" , [statusKey]:"" });
    form.resetFields();
    setSelectedType(null);
    setPrice({ min: null, max: null });
  };

  const handleTypeChange = (id: any) => {
    setSelectedType(id);
  };

  const applyFilter = () => {
    form.validateFields().then((values) => {
      const formattedValues = {
        ...values,
        from: values.from ? dayjs(values.from).format("YYYY-MM-DD") : undefined,
        to: values.to ? dayjs(values.to).format("YYYY-MM-DD") : undefined,
      };

      updateSearchParams({
        ...formattedValues,
        [statusKey]: selectedType,
        ...(FilterByPrice && {
          min_price: price.min,
          max_price: price.max,
        }),
      });

      setOpenDrawer(false);
    });
  };

  const items = [
    ...(statusData
      ? [
          {
            key: "1",
            label: (
              <h5 className="text-base font-semibold text-text">
                {/* {t(statusTitle)} */}
              </h5>
            ),
            children: (
              <div className="flex flex-col gap-3 border-b pb-5 border-b-greynormal">
                {statusData.map((item) => (
                  <Checkbox
                    key={`status_${item.id}`}
                    checked={selectedType == item.id}
                    onChange={() => handleTypeChange(item.id)}
                  >
                    {item.name}
                  </Checkbox>
                ))}
              </div>
            ),
          },
        ]
      : []),
    ...(FilterByPrice
      ? [
          {
            key: "2",
            label: (
              <h5 className="text-base font-semibold text-text">
                {t("Text.price")}
              </h5>
            ),
            children: (
              <div className="flex item-center gap-4">
                <div className="flex flex-col gap-3">
                  <span>{t("Text.from")}</span>
                  <InputNumber
                    controls={false}
                    placeholder="00"
                    value={price.min ?? undefined}
                    onChange={(val) => {
                      const newVal = Number(val) || 1;
                      const updated = { ...price, min: newVal };
                      setPrice(updated);
                    }}
                    suffix={t("Text.IQ")}
                    className="no-arrows !border-[#EEEEEE] !rounded-xl min-h-[52px] !w-full"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <span>{t("Text.to")}</span>
                  <InputNumber
                    controls={false}
                    placeholder="00"
                    value={price.max ?? undefined}
                    onChange={(val) => {
                      const newVal = Number(val) || 1;
                      const updated = { ...price, max: newVal };
                      setPrice(updated);
                    }}
                    suffix={t("Text.IQ")}
                    className="no-arrows !border-[#EEEEEE] !rounded-xl min-h-[52px] !w-full"
                  />
                </div>
              </div>
            ),
          },
        ]
      : []),
    {
      key: "3",
      label: (
        <h5 className="text-base font-semibold text-text">
          {/* {t(dateTitle)} */}
        </h5>
      ),
      children: (
        <AppForm
          formClass="!mt-0"
          fields={fields}
          loader={false}
          form={form}
          withOutBtn
        />
      ),
    },
  ];

  return (
    <AppDrawer
      open={openDrawer}
      title={t("Text.filter")}
      handleClose={() => setOpenDrawer(false)}
      placement="right"
      footer={
        <div className="flex items-center gap-2">
          <button className="app-btn outline-btn flex-1" onClick={clearFilter}>
            {t("buttons.delete")}
          </button>
          <button className="app-btn flex-1" onClick={applyFilter}>
            {t("Text.filter")}
          </button>
        </div>
      }
    >
      <div className="side-filter-wrapper">
        <Collapse
          items={items}
          defaultActiveKey={["1", "2", "3"]}
          expandIconPosition="end"
          expandIcon={() => <ArrowUp />}
        />
      </div>
    </AppDrawer>
  );
};

export default TableFilter;

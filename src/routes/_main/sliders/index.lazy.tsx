import { createLazyFileRoute, RouteTypes} from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import AppTable from "@/components/UiComponents/table/AppTable";
import { Edit, Home, Slider } from "iconsax-reactjs";
import TableImage from "@/components/UiComponents/table/TableImage";
import { useState } from "react";
import AppModal from "@/components/UiComponents/Modal/AppModal";
import AppForm from "@/components/UiComponents/forms/AppForm";
import toast from "react-hot-toast";
import { useMutate } from "@/hooks/UseMutate";
import { useForm } from "antd/es/form/Form";
import TableDeleteBtn from "@/components/UiComponents/table/TableDeleteBtn";
import MainPageWrapper, {
  breadcrumbItem,
} from "@/components/generalComponents/layout/MainPageWrapper";
import { FieldProp } from "@/types/AppFormTypes";

export const Route = createLazyFileRoute("/_main/sliders/")({
  component: Sliders,
});

export default function Sliders() {
  const endpoint = `sliders`;
  const { t } = useTranslation();
  const [formModal, setFormModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [form] = useForm();

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: "10",
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
      dataIndex: "text",
      key: "text",
      sorter: true,
    },
    {
      title: t("tables.actions"),
      key: "action",
      render: (_: any, record: any) => {
        return (
          <div className="flex items-center gap-2 justify-center">
            <button onClick={() => handleOpen(record)}>
              <Edit className="size-9 text-green-600 p-2 bg-green-100/80 rounded-full" />
            </button>
            <TableDeleteBtn item={record} endpoint={endpoint} />
          </div>
        );
      },
      align: "center",
    },
  ];
  const fields: FieldProp[] = [
    {
      type: "imgUploader",
      // uploadText: t("form.uploadImageText"),
      name: "image",
      inputProps: {
        model: "sliders",
        initialFileList: selectedItem
          ? [{ url: selectedItem?.image, uid: selectedItem.uid }]
          : [],
      },
      rules: [{ required: true, message: t("validation.required") }],
      maxCount: 1,
    },
    {
      type: "text",
      name: "name_ar",
      label: t("form.name_ar"),
      placeholder: t("form.namePlaceholder"),
      rules: [{ required: true, message: t("validation.nameRequired") }],
    },
    {
      type: "text",
      name: "name_en",
      label: t("form.name_en"),
      placeholder: t("form.namePlaceholder"),
      rules: [{ required: true, message: t("validation.nameRequired") }],
    },
  ];

  const { mutate, isLoading } = useMutate({
    mutationKey: [`sliders${selectedItem ? `/${selectedItem.id}` : ``}`],
    endpoint: `sliders${selectedItem ? `/${selectedItem.id}` : ``}`,
    onSuccess: (data: any) => {
      toast.success(
        t(`${selectedItem ? `isEditSuccessfully` : `isCreatedSuccessfully`}`, {
          name: t("pages.sliders"),
        })
      );
      closeModal();
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
    formData: true,
  });

  const handleSubmit = async (values: any) => {
    const finalOut: any = {
      "image[media]": values?.image,
      ar: {
        text: values?.name_ar,
      },
      en: {
        text: values?.name_en,
      },
    };
    mutate(finalOut);
  };

  const closeModal = () => {
    setFormModal(false);
    setSelectedItem(null);
    form.resetFields();
  };

  const handleOpen = (record: any) => {
    setFormModal(true);
    setSelectedItem({
      ...record,
      name_ar: record.ar.text,
      name_en: record.en.text,
    });
  };
  const breadcrumbItems: breadcrumbItem[] = [
    { label: t("pages.home"), to: "/", icon: <Home /> },
    { label: t("pages.sliders"), icon: <Slider /> },
  ];
  return (
    <MainPageWrapper breadcrumbItems={breadcrumbItems}>
      <AppTable
        columns={columns}
        endpoint={endpoint}
        headerModal={t("labels.add_slider")}
        handleHeaderModal={() => setFormModal(true)}
        currentSearchParams={Route.useSearch()}
      />
      <AppModal
        open={formModal}
        onCancel={closeModal}
        onOk={closeModal}
        title={t("labels.add_slider")}
        destroyOnHidden={true}
      >
        <AppForm
          form={form}
          fields={fields}
          onFinish={handleSubmit}
          loader={isLoading}
          initialValues={selectedItem}
        />
      </AppModal>
    </MainPageWrapper>
  );
}

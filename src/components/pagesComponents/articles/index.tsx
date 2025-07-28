import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-router";
import MainPageWrapper, {
  breadcrumbItem,
} from "@/components/generalComponents/layout/MainPageWrapper";
import { Home, Slider } from "iconsax-reactjs";
import AppForm from "@/components/UiComponents/forms/AppForm";
import { Form } from "antd";
import { generateFinalOut, generateInitialValues } from "@/utils/helpers";
import toast from "react-hot-toast";
import { useMutate } from "@/hooks/UseMutate";
import { FieldProp } from "@/types/AppFormTypes";

export default function ArticaleForm({ fetchData }: { fetchData?: any }) {
  const endpoint = `articals`;
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const breadcrumbItems: breadcrumbItem[] = [
    { label: t("pages.home"), to: "/", icon: <Home /> },
    { label: t("pages.articles"), to: "/articles", icon: <Slider /> },
    { label: fetchData ? t("actions.edit") : t("actions.add") },
  ];

  const { mutate, isLoading } = useMutate({
    mutationKey: [
      `${endpoint}${fetchData?.data?.id ? `/${fetchData?.data?.id}` : ""}`,
    ],
    endpoint: `${endpoint}${fetchData?.data?.id ? `/${fetchData?.data?.id}` : ""}`,
    onSuccess: (data: any) => {
      toast.success(
        t(`${fetchData ? "isEditSuccessfully" : "isCreatedSuccessfully"}`, {
          name: t("pages.articles"),
        })
      );
<<<<<<< HEAD
      navigate({ to: "/articles" , search:{page:'1'}});
=======
      navigate({ to: "/articles", search: { page: "1" } });
>>>>>>> main
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
    formData: true,
  });

  const fields: FieldProp[] = [
    {
      type: "imgUploader",
      // uploadText: t("form.uploadImageText"),
      name: "image",
      inputProps: {
        model: "sliders",
        initialFileList: fetchData ? [{ url: fetchData?.data?.image }] : [],
      },
      rules: [{ required: true, message: t("validation.required") }],
      maxCount: 1,
    },
    {
      type: "text",
      name: "title_ar",
      label: t("form.name_ar"),
      placeholder: t("form.namePlaceholder"),
      rules: [{ required: true, message: t("validation.nameRequired") }],
      span: 12,
    },
    {
      type: "text",
      name: "title_en",
      label: t("form.name_en"),
      placeholder: t("form.namePlaceholder"),
      rules: [{ required: true, message: t("validation.nameRequired") }],
      span: 12,
    },
    {
      type: "editor",
      name: "description_ar",
      label: t("form.desc_ar"),
      placeholder: t("form.namePlaceholder"),
      rules: [{ required: true, message: t("validation.descRequired") }],
      span: 12,
    },
    {
      type: "editor",
      name: "description_en",
      label: t("form.desc_en"),
      placeholder: t("form.namePlaceholder"),
      rules: [{ required: true, message: t("validation.descRequired") }],
      span: 12,
    },
    {
      type: "text",
      name: "link",
      label: t("form.link"),
      placeholder: t("form.namePlaceholder"),
      rules: [{ required: true, message: t("validation.required") }],
    },
  ];

  const handleSubmit = async (values: any) => {
    const finalOut: any = generateFinalOut(fetchData?.data, values);
    mutate(finalOut);
  };

  return (
    <MainPageWrapper breadcrumbItems={breadcrumbItems}>
      <AppForm
        form={form}
        initialValues={generateInitialValues(fetchData?.data)}
        fields={fields}
        loader={isLoading}
        onFinish={handleSubmit}
      />
    </MainPageWrapper>
  );
}

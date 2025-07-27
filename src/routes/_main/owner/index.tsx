import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Home, Profile2User } from "iconsax-reactjs";
import AppForm from "@/components/UiComponents/forms/AppForm";
import toast from "react-hot-toast";
import { useMutate } from "@/hooks/UseMutate";
import { useForm } from "antd/es/form/Form";
import { breadcrumbItem } from "@/components/generalComponents/layout/MainPageWrapper";
import MainPageWrapper from "@/components/generalComponents/layout/MainPageWrapper";
import { generateFinalOut, generateInitialValues } from "@/utils/helpers";
import axiosInstance from "@/services/instance";
import { RouterContext } from "@/main";
import { useSuspenseQuery } from "@tanstack/react-query";
import { FieldProp } from "@/types/AppFormTypes";
import { prefetchWithUseFetchConfig } from "@/utils/preFetcher";
import useFetch from "@/hooks/UseFetch";

export const Route = createFileRoute("/_main/owner/")({
  component: Owner,
  loader: async ({ context }) => {
    const { queryClient } = context as RouterContext;
    const endpoint = `owner`;
    await prefetchWithUseFetchConfig(queryClient, [endpoint], endpoint);
  },
});

function Owner() {
  const endpoint = `owner`;
  const { t } = useTranslation();
  const [form] = useForm();

  const breadcrumbItems: breadcrumbItem[] = [
    { label: t("pages.home"), to: "/", icon: <Home /> },
    { label: t("pages.owner"), icon: <Profile2User /> },
  ];
  const {
    data,
    isLoading: fetchLoading,
    refetch,
  } = useFetch({
    queryKey: [endpoint],
    endpoint,
    suspense: true,
  });
  const fields: FieldProp[] = [
    {
      type: "imgUploader",
      // uploadText: t("form.uploadImageText"),
      name: "image",
      inputProps: {
        model: "owner",
        initialFileList: data ? [{ url: data?.data?.image }] : [],
        maxCount: 1,
      },
      rules: [{ required: true, message: t("validation.required") }],
      skeletonClassName: "!size-[150px]",
    },
    {
      type: "text",
      name: "name_ar",
      label: t("form.name_ar"),
      placeholder: t("form.namePlaceholder"),
      rules: [{ required: true, message: t("validation.nameRequired") }],
      span: 12,
    },
    {
      type: "text",
      name: "name_en",
      label: t("form.name_en"),
      placeholder: t("form.namePlaceholder"),
      rules: [{ required: true, message: t("validation.nameRequired") }],
      span: 12,
    },
    {
      type: "editor",
      name: "text_ar",
      label: t("form.desc_ar"),
      placeholder: t("form.namePlaceholder"),
      rules: [{ required: true, message: t("validation.descRequired") }],
      span: 12,
      skeletonClassName: "!w-full !h-[200px]",
    },
    {
      type: "editor",
      name: "text_en",
      label: t("form.desc_en"),
      placeholder: t("form.namePlaceholder"),
      rules: [{ required: true, message: t("validation.descRequired") }],
      span: 12,
      skeletonClassName: "!w-full !h-[200px]",
    },
  ];

  const { mutate, isLoading } = useMutate({
    mutationKey: [endpoint],
    endpoint: endpoint,
    onSuccess: (data: any) => {
      toast.success(t(`isEditSuccessfully`, { name: t(`pages.owner`) }));
      refetch();
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
    formData: true,
  });

  const handleSubmit = async (values: any) => {
    const finalOut: any = generateFinalOut(data?.data, values);
    mutate(finalOut);
  };

  return (
    <MainPageWrapper breadcrumbItems={breadcrumbItems}>
      <AppForm
        form={form}
        fields={fields}
        onFinish={handleSubmit}
        loader={isLoading}
        initialValues={generateInitialValues(data.data)}
        fromBtn={t("buttons.save")}
      />
    </MainPageWrapper>
  );
}

import { useTranslation } from "react-i18next";
import useFetch from "@/hooks/UseFetch";
import AppForm from "@/components/UiComponents/forms/AppForm";
import { Form } from "antd";
import { generateFinalOut, generateInitialValues } from "@/utils/helpers";
import toast from "react-hot-toast";
import { useMutate } from "@/hooks/UseMutate";
import { FieldProp } from "@/types/AppFormTypes";

export default function ProfileForm() {
  const endpoint = ``;
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { data: fetchData, isLoading: fetchLoading } = useFetch<any>({
    endpoint: `${endpoint}`,
    queryKey: [`${endpoint}`],
  });

  const { mutate, isLoading } = useMutate({
    mutationKey: [`${endpoint}`],
    endpoint: `${endpoint}`,
    onSuccess: (data: any) => {
      toast.success(
        t(`isEditSuccessfully`, {
          name: t("pages.articles"),
        })
      );
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
        form:form,
        name:'image',
        initialFileList: fetchData
          ? [
              {
                url: fetchData?.data?.image,
                isUploading: false,
                name: "image",
                uid: "dfdsfsds",
              },
            ]
          : [],
          singleFile:true,
      },
      rules: [{ required: true, message: t("validation.required") }],
      maxCount: 1,
    },
    {
      type: "text",
      name: "name",
      label: t("form.name"),
      placeholder: t("form.namePlaceholder"),
      rules: [{ required: true, message: t("validation.nameRequired") }],
      span: 24,
    },
    {
      type: "text",
      name: "email",
      label: t("form.email"),
      placeholder: t("form.emailPlaceholder"),
      rules: [{ required: true,type:'email', message: t("validation.emailRequired") }],
      span: 24,
    },
    {
      type: "phone",
      name: "phone",
      label: t("form.phone"),
      placeholder: t("form.phonePlaceholder"),
      rules: [{ required: true, message: t("validation.phoneRequired") }],
      span: 24,
    },
  ];

  const handleSubmit = async (values: any) => {
    const finalOut: any = generateFinalOut(fetchData?.data, values);
    mutate(finalOut);
  };

  return (
    <AppForm
      form={form}
      /* initialValues={generateInitialValues(fetchData?.data)}
       */ fields={fields}
      loader={isLoading} 
      onFinish={handleSubmit}
      cancelBtn
    />
  );
}

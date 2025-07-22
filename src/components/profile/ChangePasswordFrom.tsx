import { useTranslation } from "react-i18next";
import AppForm from "@/components/UiComponents/forms/AppForm";
import { Form } from "antd";
import { generateFinalOut, generateInitialValues } from "@/utils/helpers";
import toast from "react-hot-toast";
import { useMutate } from "@/hooks/UseMutate";

export default function ChangePasswordFrom() {
  const endpoint = ``;
  const { t } = useTranslation();
  const [form] = Form.useForm();

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

  const fields = [
    {
      type: "password",
      name: "password",
      label: t("form.password"),
      placeholder: t("form.passwordPlaceholder"),
      rules: [{ required: true, message: t("validation.passwordRequired") }],
      span: 12,
    },
    {
      type: "password",
      name: "confirmedPassword",
      label: t("form.confirmPasswordLabel"),
      placeholder: t("form.confirmPasswordPlaceholder"),
      rules: [{ required: true, message: t("validation.confirmPasswordRequired") }],
      span: 12,
    }
  ];

  const handleSubmit = async (values: any) => {
    // const finalOut: any = generateFinalOut(.data, values);
    // mutate(finalOut);
  };

  return (
    <AppForm
      form={form}
/*       initialValues={generateInitialValues(fetchData?.data)}
*/       fields={fields}
      loader={isLoading} 
      onFinish={handleSubmit}
      cancelBtn
    />
  );
}

import { createFileRoute } from "@tanstack/react-router";
import AppForm from "@/components/UiComponents/forms/AppForm";
import { useIsRTL } from "@/hooks/useIsRTL";
import { AppDispatch } from "@/store";
import { toggleRTL } from "@/store/themeConfigSlice";
import { Form } from "antd";
import i18next from "i18next";
import { Global } from "iconsax-reactjs";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useMutate } from "@/hooks/UseMutate";
import { deleteAuthedUserData, setAuthedUserData } from "@/store/profile";
import { useNavigate } from "@tanstack/react-router";
import ThemeSwitch from "@/components/UiComponents/buttons/ThemeSwitch";
import ImageWithFallback from "@/components/UiComponents/ImageWithFallback";
import { FieldProp } from "@/types/AppFormTypes";

export const Route = createFileRoute("/auth/login")({
  component: Login,
});

function Login() {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const rtl = useIsRTL();
  const router = useNavigate();

  const fields: FieldProp[] = [
    {
      type: "text",
      name: "email",
      // label: t("form.emailLabel"),
      placeholder: t("form.emailPlaceholder"),
      rules: [{ required: true, message: t("validation.passwordRequired") }],
    },
    {
      type: "password",
      name: "password",
      // label: t("form.password"),
      placeholder: t("form.password"),
      rules: [{ required: true, message: t("validation.passwordRequired") }],
    },
  ];

  const handleChangeLang = () => {
    i18next.changeLanguage(rtl ? "en" : "ar");
    dispatch(toggleRTL(rtl ? "ltr" : "rtl"));
  };

  const { mutate, isLoading } = useMutate({
    mutationKey: ["login"],
    endpoint: `login`,
    onSuccess: async (response: any) => {
      const { data } = response;
      dispatch(setAuthedUserData(data));
      toast.success(t("loginSuccessfully"));
      router({ to: "/" });
    },
    onError: (err: any) => {
      if (err.response && err.response.status === 401) {
        dispatch(deleteAuthedUserData());
      }
      toast.error(err?.response?.data?.message);
    },
  });

  return (
    <section className=" bg-dark grid grid-cols-2">
      <div className="absolute top-5 rtl:left-5 ltr:right-5 flex items-center gap-2 z-10">
        <ThemeSwitch />
        <div className="header-action" onClick={handleChangeLang}>
          <Global />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className=" flex items-center justify-center bg-body flex-col p-8 min-w-[60%] min-h-[60vh] shadow-sm rounded-3xl border-double border-border border-[4px]">
          <h1
            className="text-3xl font-bold leading-[1.5] mb-10 text-center"
            dangerouslySetInnerHTML={{ __html: t("login.title") }}
          />
          <AppForm
            form={form}
            fields={fields}
            onFinish={(values) => mutate({ ...values })}
            btnClass="mt-6 [&_button]:w-full"
            fromBtn={t("buttons.login")}
            loader={isLoading}
          />
        </div>
      </div>
      <div className="bg-dark h-screen">
        <ImageWithFallback
          className="w-full h-full object-cover"
          src={"/assets/images/login.png"}
        />
      </div>
    </section>
  );
}

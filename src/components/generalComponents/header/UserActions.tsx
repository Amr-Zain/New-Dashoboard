import { MenuProps } from "antd";
import { useNavigate } from "@tanstack/react-router"; // Changed import
import AppDropdown from "@/components/UiComponents/dropdown/AppDropdown";
import { LogoutCurve, UserEdit } from "iconsax-reactjs";
import { useMutate } from "@/hooks/UseMutate";
import { deleteAuthedUserData } from "@/store/profile";
import { useDispatch, useSelector } from "react-redux";
import { showDynamicSwal } from "@/utils/helpers";
import { AppDispatch, RootState } from "@/store";
import { useTranslation } from "react-i18next";
import ImageWithFallback from "@/components/UiComponents/ImageWithFallback";
import { Global } from "iconsax-reactjs";
import i18next from "i18next";
import { useIsRTL } from "@/hooks/useIsRTL";
import { toggleRTL } from "@/store/themeConfigSlice";
import toast from "react-hot-toast";
import ThemeSwitch from "@/components/UiComponents/buttons/ThemeSwitch";

const UserActions = () => {
  const router = useNavigate(); // Hook remains the same name
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector((state: RootState) => state.ProfileConfig.user);
  const { t } = useTranslation();
  const rtl = useIsRTL();

  const { mutate } = useMutate({
    mutationKey: ["logout"],
    endpoint: `logout`,
    onSuccess: async (data: any) => {
      dispatch(deleteAuthedUserData());
      toast.success(t("logoutSuccessfully"));
      router({ to: "/auth/login" }); // Changed navigation call
    },
    onError: async (err: any) => {
      if (err.response && err.response.status === 401) {
        router({ to: "/auth/login" }); // Changed navigation call
        dispatch(deleteAuthedUserData());
      } else {
        toast.error(err?.response?.data?.message);
      }
    },
    formData: true,
  });

  const handleLogout = async () => {
    const result = await showDynamicSwal({
      title: t("Text.logoutTitle"),
      text: t("Text.logoutDesc"),
      customClass: {
        icon: "hidden-icon",
        title: "swal-title",
        confirmButton: "app-btn me-4",
        cancelButton: "app-btn outline-btn",
      },
      confirmButtonText: t("buttons.ok"),
      cancelButtonText: t("buttons.noKeepMe"),
    });
    if (result.isConfirmed) {
      mutate({});
    }
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: (
        <div className="flex items-center py-1.5">
          <ImageWithFallback
            className="rounded-md size-10 object-cover"
            src={userData?.image}
            alt="userProfile"
          />
          <div className="ltr:pl-4 rtl:pr-4">
            <h4 className="text-base line-clamp-1 truncate whitespace-nowrap">
              {userData?.full_name}
              <span className="text-xs bg-success-light rounded text-success px-1 ltr:ml-2 rtl:ml-2">
                {userData?.user_type}
              </span>
            </h4>
            <button className="line-clamp-1 truncate whitespace-nowrap">
              {userData?.email}
            </button>
          </div>
        </div>
      ),
    },
    {
      key: "edit-profile",
      label: (
        <div className="flex items-center gap-2 py-2">
          <UserEdit size="18" />
          {t("labels.edit_profile")}{" "}
        </div>
      ),
      onClick: () =>
        router({ to: "/profile", search: { tab: "edit-profile" } }),
    },
    {
      key: "logout",
      label: (
        <div className="flex items-center gap-2 py-2">
          <LogoutCurve size="18" />
          {t("buttons.sign_out")}{" "}
        </div>
      ),
      onClick: handleLogout,
    },
  ];

  return (
    <div className="flex items-center gap-2 ">
      <ThemeSwitch />
      <div className="header-action">
        <button
          className={`hover:text-primary  size-fit`}
          onClick={() => {
            i18next.changeLanguage(rtl ? "en" : "ar");
            dispatch(toggleRTL(rtl ? "ltr" : "rtl"));
          }}
        >
          <Global />
        </button>
      </div>
      <AppDropdown
        menu={{ items: menuItems }}
        rootClassName="header-"
        trigger={["click"]}
      >
        <div className="cursor-pointer">
          <ImageWithFallback
            key={userData?.image}
            className="rounded-md size-10 object-cover"
            src={userData?.image}
            alt="userProfile"
          />
        </div>
      </AppDropdown>
    </div>
  );
};

export default UserActions;

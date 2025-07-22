//@ts-nocheck
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState, RootState } from "@/store";
import { useTranslation } from "react-i18next";
import CalendarIcon from "@/components/generalComponents/atoms/icons/CalendarIcon";
import { AuthContext } from "@/components/generalComponents/Auth/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { useMutate } from "@/hooks/UseMutate";
import Swal from "sweetalert2";
import DropDownNotification from "@/components/sharedComponents/uiComponents/Notification";
import useFetch from "@/hooks/UseFetch";
import i18next from "i18next";
import { useIsRTL } from "@/hooks/useIsRTL";
import { toggleRTL, toggleSidebar } from "@/store/themeConfigSlice";
import { MdLogout } from "react-icons/md";
import ToggleSidebarButton from "@/components/UiComponents/buttons/ToggleSidebarButton";
import ImageWithFallback from "@/components/UiComponents/ImageWithFallback";
import { ReactComponent as ToggleSide } from "@/assets/icons/toggle-side.svg";
import UserActions from "../header/UserActions";
import { HamburgerMenu } from "iconsax-reactjs";
import SearchComponent from "../header/SearchComponent";
import { NotificationsDrawer } from "@/routes/_main/notifications";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { logout } = useContext(AuthContext);
  const themeConfig = useSelector((state: RootState) => state.themeConfig);
  const rtl = useIsRTL();

  const { t } = useTranslation();

  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === "rtl"
      ? true
      : false;

  return (
    <header
      className={`h-[75px] bg-body ${themeConfig.semidark && themeConfig.menu === "horizontal" ? "dark" : ""}`}
    >
      <div className="floating-height-c border-b border-b-border h-full">
        <div className="relative flex w-full items-center justify-end lg:justify-between pe-5  h-full">
          <button
            className={`collapse-icon !hidden lg:!block`}
            onClick={() => dispatch(toggleSidebar())}
          >
            <ToggleSide
              className={`transition-transform duration-300 ${themeConfig.sidebar ? "rotate-180" : ""}`}
            />
          </button>
          <div className="flex items-center">
            <SearchComponent />
            <NotificationsDrawer />
            <UserActions />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

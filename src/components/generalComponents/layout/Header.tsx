
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { toggleSidebar } from "@/store/themeConfigSlice";
import { ReactComponent as ToggleSide } from "@/assets/icons/toggle-side.svg";
import UserActions from "../header/UserActions";
import SearchComponent from "../header/SearchComponent";
import { NotificationsDrawer } from "@/routes/_main/notifications";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const themeConfig = useSelector((state: RootState) => state.themeConfig);

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

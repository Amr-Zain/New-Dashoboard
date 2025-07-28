import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { toggleTheme } from "@/store/themeConfigSlice";
import { RootState } from "@/store";
import LighThemeIcon from "@/assets/icons/LighThemeIcon";
import DarkThemeIcon from "@/assets/icons/DarkThemeIcon";
import { Monitor, PathTool2 } from "iconsax-reactjs";

type ThemeSwitchButton_TP = {
  action?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
};
const ThemeSwitchButton = ({ action, children }: ThemeSwitchButton_TP) => {
  return (
    <button onClick={action} className="flex items-center  ">
      {children}
    </button>
  );
};

const ThemeSwitch = () => {
  const themeConfig = useSelector((state: RootState) => state.themeConfig);
  const [, setTheme] = useState<any>();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <div className="header-action">
      {themeConfig.theme === "light" && (
        <ThemeSwitchButton
          action={() => {
            setTheme("dark");
            dispatch(toggleTheme("dark"));
          }}
        >
          <LighThemeIcon />
        </ThemeSwitchButton>
      )}
      {themeConfig.theme === "custom" && (
        <ThemeSwitchButton
          action={() => {
            setTheme("system");
            dispatch(toggleTheme("system"));
          }}
        >
          <Monitor />
        </ThemeSwitchButton>
      )}

      {themeConfig.theme === "dark" && (
        <ThemeSwitchButton
          action={() => {
            setTheme("light");
            dispatch(toggleTheme("light"));
          }}
        >
          <DarkThemeIcon />
        </ThemeSwitchButton>
      )}
    </div>
  );
};

export default ThemeSwitch;

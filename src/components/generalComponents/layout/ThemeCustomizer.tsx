import { useEffect, useState } from "react";
import { ColorPicker, Space } from "antd";
import { Lamp, Monitor, Moon, PathTool2, Setting2 } from "iconsax-reactjs";
import { useTranslation } from "react-i18next";
import AppDrawer from "@/components/UiComponents/drawers/AppDrawer";
import AppModal from "@/components/UiComponents/Modal/AppModal";
import { useDispatch } from "react-redux";
import { toggleTheme } from "@/store/themeConfigSlice";

const ThemeCustomize = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [theme, setTheme] = useState("light");
  const {t} = useTranslation();
  const dispatch = useDispatch();


  const [customColors, setCustomColors] = useState({
    primaryColor: "rgb(72, 127, 255)",
    lightPrimaryColor: "rgb(72, 127, 255)",
    bodyColor: "rgb(36, 43, 51)",
    darkColor:"rgb(29, 35, 41)",
    textColor:"rgb(170, 184, 197)",
  });

  useEffect(() => {
    // Load theme from localStorage or default to light
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    setCustomColors(prev => ({
      ...prev,
      bodyColor: savedTheme === "light" ? "rgb(255, 255, 255)" : "rgb(36, 43, 51)",
      darkColor: savedTheme === "light" ? "rgb(246, 247, 248)" : "rgb(29, 35, 41)",
      textColor: savedTheme === "light" ? "rgb(45, 35, 75)" : "rgb(170, 184, 197)",
    }));
  }, [theme]);

  // Update the CSS variables based on custom colors
  const updateThemeColors = () => {
    const root = document.documentElement;
    root.style.setProperty('--TW-primary-color', `${customColors.primaryColor}`);
    root.style.setProperty('--TW-light-primary-color', `${customColors.lightPrimaryColor}`);
    root.style.setProperty('--TW-body-color', `${customColors.bodyColor}`);
    root.style.setProperty('--TW-dark-color', `${customColors.darkColor}`);
    root.style.setProperty('--TW-text-color', `${customColors.textColor}`);
  };

  const handleDrawerClose = () => setDrawerVisible(false);

  const handleModalOpen = () => setModalVisible(true);

  const handleModalClose = () => setModalVisible(false);

  const handleColorChange = (field: string, color: any) => {
    setCustomColors((prevColors) => ({
      ...prevColors,
      [field]: color.toRgbString(), 
    }));
  };

  const handleChangeTheme = (newTheme: string) => {
    let updatedTheme = newTheme;
    if(newTheme === "system") {
      const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
      updatedTheme = prefersDarkScheme.matches ? "dark" : "light";
    }
    dispatch(toggleTheme(updatedTheme))
    handleDrawerClose();
  }


  return (
    <div>
        <button className="fixed bottom-10 ltr:right-4 rtl:left-4 z-50 app-btn btn-primary rounded-md" onClick={() => setDrawerVisible(true)}>
            <Setting2/>
            {t("settings.theme")}
        </button>

        <AppDrawer
            title="Theme Customize"
            placement="left"
            handleClose={handleDrawerClose}
            open={drawerVisible}
        >
            <div className="grid grid-cols-2 gap-5">
                <button className="theme-btn" onClick={() =>  handleChangeTheme("light")}>
                  <Lamp size={25} />
                    Light Mode
                </button>
                <button className="theme-btn" onClick={() => handleChangeTheme("dark")}>
                  <Moon size={25}/>
                  Dark Mode
                </button>
                <button className="theme-btn" onClick={() => handleChangeTheme("system")} >
                  <Monitor size={25}/>
                    Auto Mode
                </button>
                <button className="theme-btn" onClick={handleModalOpen}>
                  <PathTool2 size={25}/>
                    Customize Colors
                </button>
            </div>
        </AppDrawer>

        <AppModal
            title="Customize Theme Colors"
            open={modalVisible}
            onCancel={handleModalClose}
            onOk={handleModalClose}
        >
            <Space className="flex flex-col items-start">
            <div className="flex items-center gap-2">
                <ColorPicker
                key={`primaryColor-${customColors.primaryColor}`}
                format="rgb"
                  defaultValue={customColors.primaryColor}
                  onChange={(color) => handleColorChange("primaryColor", color)}
                />
                <label>Primary Color</label>
            </div>
            <div className="flex items-center gap-2">
                <ColorPicker
                key={`lightPrimaryColor-${customColors.lightPrimaryColor}`}
                format="rgb"
                defaultValue={`${customColors.lightPrimaryColor}`} 
                onChange={(color) => handleColorChange("lightPrimaryColor", color)}
                />
                <label>Light Primary Color</label>
            </div>
            <div className="flex items-center gap-2">
                <ColorPicker
                key={`bodyColor-${customColors.bodyColor}`}
                format="rgb"
                defaultValue={`${customColors.bodyColor}`} 
                onChange={(color) => handleColorChange("bodyColor", color)}
                />
                <label>Body Color</label>
            </div>
            <div className="flex items-center gap-2">
                <ColorPicker
                key={`darkColor-${customColors.darkColor}`}
                format="rgb"
                defaultValue={`${customColors.darkColor}`}
                onChange={(color) => handleColorChange("darkColor", color)}
                />
                <label>Dark Color</label>
            </div>
            <div className="flex items-center gap-2">
                <ColorPicker
                key={`textColor-${customColors.textColor}`}
                format="rgb"
                defaultValue={`${customColors.textColor}`}
                onChange={(color) => handleColorChange("textColor", color)}
                />
                <label>Text Color</label>
            </div>
            </Space>
            <button className=" app-btn btn-primary flex w-fit mt-4 ms-auto" onClick={updateThemeColors}>
                {t("settings.apply")}
            </button>
        </AppModal>
    </div>
  );
};

export default ThemeCustomize;

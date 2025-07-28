import React, { useState } from "react";
import { ColorPicker, Space } from "antd";
import { Lamp, Monitor, Moon, PathTool2, Setting2 } from "iconsax-reactjs";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import AppDrawer from "@/components/UiComponents/drawers/AppDrawer";
import AppModal from "@/components/UiComponents/Modal/AppModal";
import { toggleTheme } from "@/store/themeConfigSlice";
import { RootState } from "@/store";

type ColorField = "primaryColor" | "bodyColor" | "darkColor" | "textColor";
type CustomColors = Record<ColorField, string>;

const ThemeCustomize = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [openColorPickers, setOpenColorPickers] = useState<Partial<Record<ColorField, boolean>>>({});
  const [pendingColors, setPendingColors] = useState<Partial<CustomColors>>({});

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { customColors } = useSelector((state: RootState) => state.themeConfig);

  const toggleColorPicker = (field: ColorField, isOpen: boolean) => {
    setOpenColorPickers((prev) => ({ ...prev, [field]: isOpen }));
  };

  const handleColorChange = (field: ColorField, color: any) => {
    setPendingColors((prev) => ({
      ...prev,
      [field]: color.toRgbString(),
    }));
  };

  const handleChangeTheme = (newTheme: string) => {
    dispatch(toggleTheme(newTheme));
    setDrawerVisible(false);
  };

  const applyPendingCustomColors = () => {
    const newColors = { ...customColors, ...pendingColors };
    dispatch(toggleTheme({ type: "custom", customColors: newColors }));
    setPendingColors({});
    setModalVisible(false);
  };

  const renderColorPicker = (label: string, field: ColorField) => (
    <div key={field} className="flex items-center gap-2">
      <ColorPicker
        format="rgb"
        trigger="click"
        open={!!openColorPickers[field]}
        onOpenChange={(open) => toggleColorPicker(field, open)}
        value={pendingColors[field] || customColors[field]}
        onChange={(color) => handleColorChange(field, color)}
      />
      <label>{label}</label>
    </div>
  );

  return (
    <div>
      <button
        className="fixed bottom-10 ltr:right-4 rtl:left-4 z-50 app-btn btn-primary rounded-md"
        onClick={() => setDrawerVisible(true)}
      >
        <Setting2 />
        {t("settings.theme")}
      </button>

      <AppDrawer
        title={t("settings.theme")}
        placement="left"
        handleClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <div className="grid grid-cols-2 gap-5">
          <button className="theme-btn" onClick={() => handleChangeTheme("light")}>
            <Lamp size={25} /> Light Mode
          </button>
          <button className="theme-btn" onClick={() => handleChangeTheme("dark")}>
            <Moon size={25} /> Dark Mode
          </button>
          <button className="theme-btn" onClick={() => handleChangeTheme("system")}>
            <Monitor size={25} /> Auto Mode
          </button>
          <button className="theme-btn" onClick={() => setModalVisible(true)}>
            <PathTool2 size={25} /> Customize Colors
          </button>
        </div>
      </AppDrawer>

      <AppModal
        title={t("settings.customizeTheme")}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={applyPendingCustomColors}
      >
        <Space className="flex flex-col items-start">
          {renderColorPicker("Primary Color", "primaryColor")}
          {renderColorPicker("Body Color", "bodyColor")}
          {renderColorPicker("Dark Color", "darkColor")}
          {renderColorPicker("Text Color", "textColor")}
        </Space>

        <button
          className="app-btn btn-primary flex w-fit mt-4 ms-auto"
          onClick={applyPendingCustomColors}
        >
          {t("settings.apply")}
        </button>
      </AppModal>
    </div>
  );
};

export default ThemeCustomize;

import { Tabs } from "antd";
import type { TabsProps } from "antd";
import "@/styles/components/app-tabs.scss";
import { useNavigate } from "@tanstack/react-router";
export default function AppTabs({
  tabItems,
  active,
}: {
  tabItems: TabsProps["items"];
  active: string;
}) {
  const navigate = useNavigate();

  const onTabChange = (key: string) => {
    navigate({
      to:'.',
      search: (prev) => ({...prev,  tab:key }),
    });
  };

  return (
    <Tabs
      activeKey={active}
      items={tabItems}
      onChange={onTabChange}
      className="bg-body rounded-xl p-4"
    />
  );
}

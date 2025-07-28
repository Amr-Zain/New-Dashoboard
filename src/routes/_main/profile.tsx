import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import MainPageWrapper from "@/components/generalComponents/layout/MainPageWrapper";
import ProfileCard from "@/components/profile/ProfileCard";
import Tabs from "@/components/profile/AppTabs";
import ProfileForm from "@/components/profile/EditProfileForm";
import ChangePasswordFrom from "@/components/profile/ChangePasswordFrom";

export const Route = createFileRoute("/_main/profile")({
  component: Profile,
  validateSearch: (search) => {
    return { tab: (search.tab as string) || "edit-profile" };
  },
  loaderDeps: ({ search: { tab } }) => ({ tab }),
  loader: ({ deps: { tab } }) => {
    return tab;
  },
});

function Profile() {
  const { t } = useTranslation();
  const { tab } = Route.useSearch();
  const breadcrumbItems = [
    { label: t("pages.home"), to: "/" },
    { label: t("profile.title") },
  ];

  const tabsitems = [
    {
      label: t("tabs.editProfile"),
      key: "edit-profile",
      children: <ProfileForm />,
    },
    {
      label: t("tabs.changePassword"),
      key: "change-password",
      children: <ChangePasswordFrom />,
    },
    {
      label: t("tabs.notificationSettings"),
      key: "notification-settings",
      children: "Content of Tab Pane 3",
    },
  ];
  return (
    <MainPageWrapper breadcrumbItems={breadcrumbItems}>
      <div className="@container w-full">
        <div className="grid grid-cols-1 @[820px]:grid-cols-[320px_1fr] gap-4 ">
          <ProfileCard />
          <Tabs tabItems={tabsitems} active={tab}/>
        </div>
      </div>
    </MainPageWrapper>
  );
}

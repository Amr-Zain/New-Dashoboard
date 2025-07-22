import React from "react";
import { useTranslation } from "react-i18next";
import LoaderPage from "./Loader";
import AppLink from "@/components/UiComponents/buttons/AppLink";
import { ArrowLeft2 } from "iconsax-reactjs";

export interface breadcrumbItem {
  label:string,
  to?:string,
  icon?: React.ReactNode
}

interface Props {
  children: React.ReactNode;
  loading?: boolean;
  breadcrumbItems:breadcrumbItem[]
}


const MainPageWrapper = ({children,breadcrumbItems,loading}: Props) => {
  const { t } = useTranslation();

  if (loading) {
    return <LoaderPage />;
  }

  return (
    <section className="main-page-wrapper" data-aos="fade-up">
      <ul className="flex items-center gap-2 mb-4" >
        {breadcrumbItems?.map((item, index) => {
          const { to, label, icon } = item;
          const isLastItem = breadcrumbItems.length === index + 1;
          return (
            <li key={index} className="flex items-center gap" >
              {to ? (
                <AppLink to={to} className="page-title">
                  {icon && icon} {t(label)}
                </AppLink>
              ) : (
                <span className="page-title">
                  {icon && icon} {t(label)}
                </span>
              )}
              {!isLastItem && <ArrowLeft2 className="size-5" />}
            </li>
          );
        })}
      </ul>
      <div className="main-card main-page-content !rounded-e-none dark:!bg-dark !bg-primary/5 shadow-box">{children}</div>
    </section>
  );
};

export default MainPageWrapper;

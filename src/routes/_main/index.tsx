import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import useFetch from "../../hooks/UseFetch";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setPageTitle } from "../../store/themeConfigSlice";
import StatisticsCard from "@/components/pagesComponents/Statistics/StatisticsCard";
import MainPageWrapper, {
  breadcrumbItem,
} from "@/components/generalComponents/layout/MainPageWrapper";
import "@/styles/components/app-form.scss";
import { Home } from "iconsax-reactjs";

export const Route = createFileRoute("/_main/")({
  component: Index,
});

function Index() {
  const { t } = useTranslation();
  const { data: Charts, isLoading } = useFetch<any>({
    endpoint: "home",
    queryKey: ["home"],
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle(t("labels.all_statistics")));
  }, [dispatch, t]);

  const formatDataToArray = (dataObject: any) => {
    if (!dataObject) return [];
    return Object.entries(dataObject).map(([key, value]) => ({
      title: t(`labels.${key}`),
      count: value,
    }));
  };

  const statisticsArray = Charts?.data ? formatDataToArray(Charts.data) : [];

  const breadcrumbItems: breadcrumbItem[] = [
    { label: t("pages.all_statistics"), icon: <Home /> },
  ];

  return (
        <MainPageWrapper loading={isLoading} breadcrumbItems={breadcrumbItems}>
            <div className=" gap-6 py-10">
                <div className=" h-full">
                    <div className="relative rounded-lg">
                        <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
                            {statisticsArray.length > 0 ? renderStats(statisticsArray) : null}
                        </div>
                    </div>
                </div>
            </div>
        </MainPageWrapper>
  );
}

export default Index;
const renderStats = (data: any[]) => {
  return data.map((item: { count: number; title: string }, index: number) => (
    <StatisticsCard
      key={`Statistics_${index}`}
      title={item?.title}
      count={item?.count}
      index={index}
    />
  ));
};

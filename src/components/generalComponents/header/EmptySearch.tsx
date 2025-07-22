import { getSearchParamsObject } from "@/utils/helpers";
import { SearchNormal1 } from "iconsax-reactjs";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

const EmptySearch = ({text}:{text?:string}) => {
  const searchParamsUrl = useSearchParams();
  let searchParams: any = getSearchParamsObject(searchParamsUrl);
    const {t} = useTranslation();
  return (
    <section className="main-sec min-h-[300px] mb-10 flex flex-col justify-center items-center gap-6 ">
      <SearchNormal1 />
      <h2 className="text-2xl  font-bold">
        {t("emptySearch",{keyword:`“${text || searchParams?.keyword}“`})} 
      </h2>
    </section>
  );
};

export default EmptySearch;

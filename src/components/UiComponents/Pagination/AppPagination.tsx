"use client"
import { Pagination } from "antd";
import { useRouter, useSearchParams } from "next/navigation";

interface AppPagination {
  initialData:{
    total:number;
    per_page:number;
  };
}

const AppPagination = ({ initialData }:AppPagination) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = searchParams.get("page") || 1;
  const totalItems = initialData?.total;
  const pageSize = initialData?.per_page;

  const handlePageChange = (page:any) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    router.push(`?${params.toString()}`);
    // window.history.pushState(null, "", `?${newSearchParams.toString()}`);

  };

  return (
    +initialData?.total > +initialData?.per_page && 
      <Pagination
        current={+currentPage}
        total={totalItems}
        pageSize={pageSize}
        onChange={handlePageChange}
        showSizeChanger={false}
        showQuickJumper={false}
        />
  );
};



export default AppPagination;

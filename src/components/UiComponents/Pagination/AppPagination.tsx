"use client"
import { Pagination } from "antd";
import { useNavigate, useSearch } from "@tanstack/react-router";

interface AppPagination {
  initialData:{
    total:number;
    per_page:number;
  };
  path: any
}

const AppPagination = ({ initialData, path }:AppPagination) => {
  const navigate = useNavigate();
  const currentSearchParams = useSearch({from: path }); 

  const currentPage = currentSearchParams.page ? +currentSearchParams.page : 1;
  const totalItems = initialData?.total;
  const pageSize = initialData?.per_page;

  const handlePageChange = (page:number) => { 
    navigate({ search: { ...currentSearchParams, page: page.toString() } });
  };

  return (
    (initialData?.total && initialData?.per_page && +initialData.total > +initialData.per_page) ?
      <Pagination
        current={+currentPage}
        total={totalItems}
        pageSize={pageSize}
        onChange={handlePageChange}
        showSizeChanger={false}
        showQuickJumper={false}
        />
    : null 
  );
};

export default AppPagination;

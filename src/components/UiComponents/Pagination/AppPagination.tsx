"use client"
import { Pagination } from "antd";
import { useNavigate, useSearch } from "@tanstack/react-router";

interface AppPagination {
  initialData:{
    total:number;
    per_page:number;
  };
  currentPage: string;
}

const AppPagination = ({ initialData, currentPage }:AppPagination) => {
  const navigate = useNavigate();
  const totalItems = initialData?.total;
  const pageSize = initialData?.per_page;

  const handlePageChange = (page:number) => { 
    navigate({ search: (search)=>({ ...search, page: page.toString() }),to:'.' });
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

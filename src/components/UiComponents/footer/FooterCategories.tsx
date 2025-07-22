"use client"
import ClientStore from "@/components/layout/ClientStore";
import React from "react";
import LocalePath from "../LocalePath";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const CategoriesTemplate = () => {
  const { categories } = useSelector((state: RootState) => state.generalConfig);
  return (
    <div className="grid grid-cols-2 ">
      {categories.map((el: any, index: number) => (
        <li
          className="max-md:text-sm mb-3 md:mb-5 font-normal hover:text-primary transition-all  cursor-pointer"
          key={`footer_link_${el?.id}`}
        >
          <LocalePath href={`/categories/${el?.slug}`}>
            {el?.title || el?.name}
          </LocalePath>
        </li>
      ))}
    </div>
  );
};

const FooterCategories = () => (
  <ClientStore>
    <CategoriesTemplate />
  </ClientStore>
);
export default FooterCategories;

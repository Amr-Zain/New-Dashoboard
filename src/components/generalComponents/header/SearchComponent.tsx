"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { Dropdown, Input, MenuProps, Spin } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import AppLink from "@/components/UiComponents/buttons/AppLink";
import { useTranslation } from "react-i18next";
// import EmptySearch from "./EmptySearch";
import { SearchNormal1 } from "iconsax-reactjs";
// import Lottie from "lottie-react";
// import RecordingAnimation from "@/assets/ui-Icons/recording.json"

const SearchComponent = () => {
  const {t} = useTranslation();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [products, setProducts] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  // const [isRecording, setIsRecording] = useState(false);
  // const locale = useLocale();
  // const lang = locale == "ar" ? "ar" :"en-US";

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load history once on mount
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    setSearchHistory(storedHistory);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Debounce input changes: wait 500ms after last keystroke
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm.trim());
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Perform search whenever debounced term changes
  useEffect(() => {
    if (!debouncedTerm) {
      setProducts(null);
      return;
    }
    fetchSearchResults(debouncedTerm);
  }, [debouncedTerm]);

  // Your existing search API call wrapped for re-use
  const fetchSearchResults = async (keyword: string) => {
    setOpen(true);
    if (!keyword) return;
    try {
      setLoading(true);
      const data = null;
      if (data) {
        setProducts(data);
        // Update and persist history (limit to 5)
        const updatedHistory = [keyword, ...searchHistory.filter((item) => item !== keyword)].slice(0, 5);
        setSearchHistory(updatedHistory);
        localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleHistoryClick = (item: string) => {
    setSearchTerm(item);
    fetchSearchResults(item);
  };

  const handleRemoveItem = (item: string) => {
    const updatedHistory = searchHistory.filter((i) => i !== item);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const handleClearAll = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  const handleClose = () => {
    setOpen(false);
    setSearchTerm("");
    setProducts(null);
  };


  const items: MenuProps["items"] = loading
    ? [
        {
          key: "loading",
          label: (
            <div className="h-[350px] flex-center-content">
              <Spin spinning={loading} />
            </div>
          ),
        },
      ]
    : products && products.length > 0
    ? [
        {
          key: "products_list",
          className: "products_list",
          label: (
            <div className="space-y-5">
              {products.map((item: any) => (
                <AppLink
                  key={`product_card_${item?.id}`}
                  onClick={handleClose}
                  to={`/products/${item?.slug}`}
                  className={"text-text"}
                >
                  {item}
                </AppLink>
              ))}
            </div>
          ),
        },
      ]
    : products !== null && products.length === 0
    ? [
        {
          key: "empty_products",
          label: (
            <div className="flex items-center justify-center">
              {/* <EmptySearch text={searchTerm} /> */}
            </div>
          ),
        },
      ]
    : searchHistory.length > 0
    ? [
        {
          label: (
            <div className="flex justify-between items-center mb-5">
              <span className="font-bold ">{t("LABELS.search_history")}</span>
              <span onClick={handleClearAll} className="text-[#C21D20] text-sm cursor-pointer">
                {t("LABELS.clear_all")}
              </span>
            </div>
          ),
          key: "header",
          disabled: true,
        },
        ...searchHistory.map((item) => ({
          key: `search_history_${item}`,
          label: (
            <div className="flex items-center justify-between py-2.5">
              <div
                className="flex items-center gap-2 cursor-pointer w-full"
                onClick={() => handleHistoryClick(item)}
              >
                <SearchNormal1 />
                {item}
              </div>
              <CloseOutlined
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveItem(item);
                }}
                className="text-text cursor-pointer"
              />
            </div>
          ),
        })),
      ]
    : [
        {
          label: <span className="text-text py-2 block">{t("labels.no_history")}</span>,
          key: "empty",
          disabled: true,
        },
      ];

  return (
    <div className=" search-container relative hidden lg:block" ref={containerRef}>
      <div className="relative lg:me-4 ">
        <Dropdown
          trigger={["click"]}
          open={open}
          menu={{ items }}
          rootClassName="search-products-dropdown"
          popupRender={(menu) => <div ref={dropdownRef}>{menu}</div>}
        >
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={() => setOpen(true)}
            allowClear
            onClear={() => {
              setProducts(null);
              setSearchTerm("");
            }}
            prefix={
              <IoSearch
                onClick={() => fetchSearchResults(searchTerm.trim())}
                className="cursor-pointer size-4 text-text z-[1]"
              />
            }
            // suffix={<div className="z-10 cursor-pointer bg-secColor rounded-full p-1.5">{isRecording ? <Lottie onClick={stopRecording} className="size-8" animationData={RecordingAnimation} /> : <MicIcon onClick={handleVoiceSearch} className="size-6"/>}</div>}
            onKeyDown={(e) => e.key === "Enter" && fetchSearchResults(searchTerm.trim())}
            className="min-w-[280px] flex-1 font-bold min-h-[42px] border-border !bg-body !text-text *:placeholder:!text-text"
            placeholder={t("labels.searchOn")}
          />
        </Dropdown>
      </div>
    </div>
  );
};

export default SearchComponent;

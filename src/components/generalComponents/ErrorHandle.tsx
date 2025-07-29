"use client";

import { useRouter } from "@tanstack/react-router";
import { isAxiosError } from "axios";
import { HomeIcon, RefreshCwIcon } from "lucide-react";
import AppButton from "../UiComponents/buttons/AppButton";
import serverDownJson from "@/assets/icons/animated/Livechatbot.json";
import offlineJson from "@/assets/icons/animated/NoInternet.json";
interface ErrorProps {
  error: Error;
  reset?: () => void;
}

export default function AppError({
  error,
  reset,
}: ErrorProps) {
  const router = useRouter();

  const isOnline = useOnlineStatus();
  const { t } = useTranslation(); 
const [message, setMessage] = useState(t("server_error_page.default_error_message"));

  useEffect(() => {
    const storedMessage = localStorage.getItem("serverErrorMessage");
    if (storedMessage) {
      setMessage(storedMessage);
    }
  }, [t]);
    if (!isOnline) {
      return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6 bg-white">
      <Lottie animationData={offlineJson} loop className="w-72 h-72 mb-6" />

      <h1 className="text-3xl font-bold mb-4">
        {isOnline
          ? t("connection_error_page.server_error_title")
          : t("connection_error_page.no_internet_title")}
      </h1>

      <p className="text-gray-600 mb-6">
        {isOnline
          ? t("connection_error_page.server_error_message")
          : t("connection_error_page.no_internet_message")}
      </p>

      <button
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        onClick={() => reset?reset():router.invalidate()}
      >
        {t("connection_error_page.retry_button")}
      </button>
    </div>
  );
    }

  return( <div className="flex flex-col items-center justify-center h-screen p-6 text-center bg-white">
      <Lottie animationData={serverDownJson} loop className="w-72 h-72 mb-6" />
      <h1 className="text-3xl font-bold mb-4 text-red-600">
        {t("server_error_page.title")}
      </h1>
      <p className="text-gray-700 mb-6">{message}</p>
      <button
        onClick={() => window.location.replace('/')}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
      >
        {t("server_error_page.back_to_home_button")}
      </button>
    </div>)
}
import { useState, useEffect } from "react";import Lottie from "lottie-react";
import { useTranslation } from "react-i18next";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";


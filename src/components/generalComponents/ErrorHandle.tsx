"use client";

import { useRouter } from "@tanstack/react-router";
import { isAxiosError } from "axios";
import { HomeIcon, RefreshCwIcon } from "lucide-react";
import AppButton from "../UiComponents/buttons/AppButton";

interface ErrorProps {
  error: Error;
  reset?: () => void;
  title?: string;
  description?: string;
}

export default function AppError({
  error,
  reset,
  title = "Something Went Wrong",
  description,
}: ErrorProps) {
  const router = useRouter();
  const getErrorDetails = () => {
    let statusCode = 500;
    let message = error.message;

    if (isAxiosError(error)) {
      statusCode = error.response?.status || 500;
      message = error.response?.data?.message || error.message;
    } else if ("status" in error) {
      statusCode = (error.status as number) || 500;
    }

    if (!description) {
      switch (statusCode) {
        case 400:
          return "Your request contains invalid data. Please check and try again.";
        case 401:
          return "You need to be authenticated to access this resource.";
        case 403:
          return "You don't have permission to access this resource.";
        case 404:
          return "The requested resource was not found.";
        case 500:
          return "Our servers encountered an unexpected error. Please try again later.";
        default:
          return "An unexpected error occurred. Please try again.";
      }
    }

    return description;
  };
  
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);
  const errorDetails = getErrorDetails();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-danger mb-2">
          {isOnline ? title : "Connection Lost"}
        </h1>
        <p className="text-lg text-bodyText text-secondary mb-6">
          {isOnline ? errorDetails : "Please Check your internet connection"}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {reset && (
            <AppButton
              type="button"
              onClick={reset}
              className="btn-outline-primary"
              icon={<RefreshCwIcon size={16} />}
            >
              Try Again
            </AppButton>
          )}

          <AppButton
            type="button"
            onClick={() => router.navigate({ to: "/" })}
            className="btn-secondary"
            icon={<HomeIcon size={16} />}
          >
            Return Home
          </AppButton>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="mt-8 p-4 bg-body/50 rounded-lg text-left">
            <h3 className="font-medium mb-2">
              Error Details (Development Only):
            </h3>
            <pre className="text-sm text-danger overflow-auto">
              {error.stack || error.message}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
import { useState, useEffect } from "react";

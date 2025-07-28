import axiosInstance from "@/services/instance";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import Cookies from "js-cookie";

const ResendCode = () => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isCounting, setIsCounting] = useState(true); // Start counting on mount
  let userData: any = Cookies.get("userPhone");
  userData = typeof userData === "string" ? JSON.parse(userData) : userData;

  useEffect(() => {
    if (!isCounting) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setIsCounting(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isCounting]);

  const resendCode = async () => {
    try {
      const data = new FormData();
      data.append("phone", userData.number);
      data.append("country_id", userData.country_id || "1");

      const response = await axiosInstance.post("resend_code", data);
      if (response.status === 200) {
        toast.success("Resend code successfully");
      } else {
        toast.error("Failed to resend code");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
    }finally{
      setIsCounting(true);
      setTimeLeft(60);
    }

  };

  return (
    <div className="flex items-center gap-2 text-start text-sm font-semibold  mt-4 mb-5">
      <button
        type="button"
        onClick={resendCode}
        disabled={isCounting}
        className={`${isCounting ? "text-gray-600 cursor-not-allowed" : "text-primary underline"}`}
      >
        إعادة ارسال الكود
      </button>
      
      {isCounting && <span className="text-primary underline">00:{timeLeft}</span>}
    </div>
  );
};

export default ResendCode;

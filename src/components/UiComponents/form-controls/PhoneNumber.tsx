import { CountryPhoneCodes } from "@/utils/country-phone-code";
import { formatPhoneNumber } from "@/utils/helpers";
import { FormInstance } from "antd";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import AppSkeleton from "../Loader/AppSkeleton";
import axiosInstance from "@/services/axiosGeneral";
import { useDispatch, useSelector } from "react-redux";

interface PhoneNumberProps {
  name?: string;
  country?: string;
  placeholder?: string;
  form: FormInstance;
  onChange?: (value: string, data?: any) => void;
  disabled?: boolean;
}

const PhoneNumber: React.FC<PhoneNumberProps> = ({
  name = "phone",
  country = "iq",
  placeholder = "Enter phone number",
  form,
  onChange,
  disabled
}) => {
  // const { countries } = useSelector((state: RootState) => state.generalConfig);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countriesData, setCountriesData] = useState<{ name: string; shortName: string; dialCode: string }[]>([]);
  const [loading, setLoading] = useState(false);
  // const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // if (countries.length === 0) { // Only fetch countries if they are not already in the store
      const fetchCountries = async () => {
        try {
          setLoading(true);
          const { data } = await axiosInstance.get('/countries');

          const filteredCountries = data.data.filter((country: any) =>
            CountryPhoneCodes.some((item) => item.dial_code.replace("+", "") === String(country.phone_code))
          );

          const formattedCountries = filteredCountries.map((country: any) => {
            const matched = CountryPhoneCodes.find((item) => item.dial_code.replace("+", "") === String(country.phone_code));
            return {
              name: country.name,
              shortName: matched?.code.toLowerCase() || country.short_name,
              dialCode: country.phone_code,
            };
          });
          setCountriesData(formattedCountries);
          // dispatch(setCountries(formattedCountries)); // Store countries in Redux
        } catch (error) {
          console.error("Error fetching countries:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCountries();
    // }
  }, []); 

  useEffect(() => {
    const initPhone = form.getFieldValue(name);
    if (form) {
      const initPhoneCode = form.getFieldValue("phone_code");

      if (initPhone && initPhoneCode) {
        const fullPhone = `${initPhoneCode}${initPhone}`;
        setPhoneNumber(fullPhone.replace(/\s/g, ""));
      }
    }
  }, [form.getFieldValue(name)]);

  const handleChange = (value: string, data: any) => {
    setPhoneNumber(value);
    if (onChange) {
      onChange(value, data);
    }
  };
  const onlyCountries = countriesData?.map((c: any) => c.shortName.toLowerCase()).filter(Boolean);

  return (
    <div>
      <div className="reactive" dir="ltr">
        {loading ? (
          <AppSkeleton width="100%" height="52px" className="w-full h-16 rounded-[12px]" />
        ) : (
          <PhoneInput
            disabled={disabled}
            country={country}
            onlyCountries={onlyCountries.length > 0 ? onlyCountries : ["iq"]}
            value={phoneNumber}
            onChange={handleChange}
            placeholder={placeholder}
            buttonClass="hover:bg-[green]"
            containerStyle={{
              borderRadius: "12px",
            }}
            inputStyle={{
              borderColor: "#E7E7E7",
              width: "100%",
              borderRadius: "12px",
              height: "52px",
              paddingLeft: "60px",
            }}
            buttonStyle={{
              marginLeft: "10px",
              height: "40px",
              width: "40px",
              marginTop: "4px",
              borderRadius: "50%",
              border: "none",
              background: "transparent",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PhoneNumber;

// components/form-controls/MultiLangField.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Form, FormInstance, FormProps } from "antd";
// import AppEditor from "./AppEditor";
import Input from "antd/es/input/Input";
import { useTranslation } from "react-i18next";
import TiptapEditorWithToolbar from "./TiptapEditor";

export interface MultiLangFieldProps {
  form: FormInstance;
  name: string;
  type?: "input" | "editor";
  label?: string;
  rules?: any;
  placeholder?: string;
}

const MultiLangField = ({
  form,
  name,
  type = "input",
  label,
  rules,
  placeholder,
}: MultiLangFieldProps) => {
  const { t } = useTranslation();
  const [currentLang, setCurrentLang] = useState<0 | 1>(0);

  const langs = [
    { key: "ar", label: t(`form.${name}_ar`) },
    { key: "en", label: t(`form.${name}_en`) },
  ];

  useEffect(()=>{
    
  },[form])

  const renderField = (langKey: string) => {
    if (type === "editor") {
      return (
        <TiptapEditorWithToolbar
          form={form}
          name={`${name}_${langKey}`}
          placeholder={placeholder || label}
        />
      );
    } else {
      return <Input placeholder={placeholder || label} />;
    }
  };

  return (
    <div className="name-inputs-wrapper">
      <div className="btns-wrapper">
        {langs.map((lang, idx) => (
          <span key={`lang_btn_${lang.key}`}  onClick={() => setCurrentLang(idx as 0 | 1)}
            className={`${currentLang === idx? "bg-primary/50 text-primary": "text-gray-500"}`}
          >
            {lang.label}
          </span>
        ))}
      </div>
      {langs.map((lang, idx) => (
        <Form.Item
          key={lang.key}
          name={`${name}_${lang.key}`}
          label={lang.label}
          rules={rules}
          className={`${currentLang === idx ? "" : "!hidden"}`}
        >
          {renderField(lang.key)}
        </Form.Item>
      ))}
    </div>
  );
};

export default MultiLangField;

import { useEffect } from "react";
import {
  Form,
  Input,
  Select,
  Col,
  Row,
  Checkbox,
  DatePicker,
  Rate,
  Radio,
} from "antd";
import PhoneNumber from "../form-controls/PhoneNumber";
import AppUploader from "../form-controls/AppUploader";
import { ReactComponent as DateIcon } from "@/assets/icons/dateIcon.svg";
import AppEditor from "../form-controls/AppEditor";
import { useTranslation } from "react-i18next";

import "react-phone-input-2/lib/style.css";
import "@/styles/components/app-form.scss";
import MultiLangField from "../form-controls/MultiLangField";
import { cn } from "@/utils/helpers";
import AppSkeleton from "../Loader/AppSkeleton";
import { AppFormProps, FieldProp } from "@/types/AppFormTypes";

const AppForm = <T extends object = Record<string, any>>({
  fields,
  onFinish,
  onValuesChange,
  handleErrorFailed,
  initialValues = {} as T,
  formClass,
  loader = false,
  withOutBtn = false,
  form,
  children,
  btnClass,
  fromBtn,
  cancelBtn,
}: AppFormProps<T>) => {
  const { t } = useTranslation();
  useEffect(() => {
    if (initialValues && form) {
      form.setFieldsValue({
        ...initialValues,
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const onFinishFailed = (errorInfo: any) => {
    console.error("Form submission failed:", errorInfo);
  };

  const renderField = (field: FieldProp) => {
    let inputElement;

    const fieldSkeletonClass = field.skeletonClassName
      ? field.skeletonClassName
      : "!w-full !h-[52px]";

    switch (field.type) {
      case "text":
        inputElement = (
          <Input
            placeholder={field.placeholder || field.name}
            {...field.inputProps}
          />
        );
        break;
      case "password":
        inputElement = (
          <Input.Password
            placeholder={field.placeholder || field.name}
            {...field.inputProps}
          />
        );
        break;
      case "number":
        inputElement = (
          <Input
            type="number"
            placeholder={field.placeholder || field.name}
            stringMode={false}
            {...field.inputProps}
          />
        );
        break;
      case "date":
        inputElement = (
          <DatePicker
            suffixIcon={<DateIcon />}
            placeholder={field.placeholder || field.name}
            {...field.inputProps}
          />
        );
        break;
      case "textarea":
        inputElement = (
          <Input.TextArea
            rows={3}
            placeholder={field.placeholder || field.name}
            {...field.inputProps}
          />
        );
        break;
      case "phone":
        inputElement = (
          <>
            <PhoneNumber form={form} country="iq" {...field.inputProps} />
          </>
        );
        break;
      case "rate":
        inputElement = (
          <Rate style={{ fontSize: "40px" }} {...field.inputProps} />
        );
        break;
      case "select":
        inputElement = (
          <Select
        
            placeholder={field.placeholder || field.name}
            mode={field.multiple ? "multiple" : undefined}
            {...field.inputProps}
          >
            {field.options?.map((option) => (
              <Select.Option key={String(option.value)} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        );
        break;
      case "radio":
        inputElement = (
          <Radio.Group
            // placeholder is not a valid prop for Ant Design's Radio.Group component.
            // If you need to convey information, use labels on individual Radio.Button.
            // placeholder={field.placeholder}
            {...field.inputProps}
          >
            {field.options?.map((option) => (
              <Radio.Button key={String(option.value)} value={option.value}>
                {option.label}
              </Radio.Button>
            ))}
          </Radio.Group>
        );
        break;
      case "checkbox":
        inputElement = (
          <Checkbox {...field.inputProps}>
            {field.placeholder || field.name}
          </Checkbox>
        );
        break;
      case "imgUploader":
        inputElement = (
          <AppUploader
            form={form}
            type_file="image"
            maxCount={field.maxCount}
            name={field.name}
            {...field.inputProps}
          />
        );
        break;
      case "mediaUploader":
        inputElement = (
          <AppUploader
            name={field.name}
            type_file="media"
            form={form}
            maxCount={field.maxCount}
            {...field.inputProps}
          />
        );
        break;
      case "fileUpload":
        inputElement = (
          <AppUploader
            name={field.name}
            type_file="document"
            maxCount={field.maxCount}
            form={form}
            {...field.inputProps}
          />
        );
        break;
      case "otp":
        inputElement = (
          <Input.OTP
            length={6}
            // placeholder is not a valid prop for Ant Design's Input.OTP component.
            // The individual input fields within the OTP component might display a default placeholder.
            // placeholder={field.placeholder || "Enter OTP"}
            {...field.inputProps}
            dir="ltr"
          />
        );
        break;
      case "editor":
        inputElement = (
          <AppEditor
            form={form}
            name={field.name}
            {...field.inputProps}
          />
        );
        break;
      case "multiLangField":
        inputElement = (
          <MultiLangField
            form={form}
            name={field.name}
            label={(field.label as string) || field.name}
            rules={field.rules}
            type={field.inputProps?.type || "editor"}
            placeholder={field.placeholder}
          />
        );
        break;
      default:
        inputElement = null;
    }

    return (
      <Col
        key={`form_item_${String(field.name)}`}
        span={24}
        lg={field.span || 24}
      >
        {loader ? (
          <div className="w-full flex items-center justify-center">
            <AppSkeleton className={cn(fieldSkeletonClass, "mb-4")} />
          </div>
        ) : field?.customItem ? (
          field?.customItem
        ) : (
          <Form.Item
            className="relative"
            name={field.name}
            label={field?.label}
            rules={field.rules}
            {...field.itemProps}
          >
            {inputElement}
          </Form.Item>
        )}
        {field.subContent && field.subContent}
      </Col>
    );
  };

  return (
    <Form<T>
      layout="vertical"
      form={form}
      onFinish={onFinish}
      onFinishFailed={handleErrorFailed ? handleErrorFailed : onFinishFailed}
      initialValues={initialValues}
      className={`app-form ${formClass || ""}`}
      onValuesChange={onValuesChange}
    >
      {children}
      <Row gutter={16}>{fields?.map((field) => renderField(field))}</Row>
      <div className="flex gap-4">
        {!withOutBtn && (
          <div className={`flex items-center gap-4 ${btnClass || ""}`}>
            {loader ? (
              <AppSkeleton width={"200px"} height={"50px"} />
            ) : (
              <button type="submit" className="app-btn btn-primary">
                {fromBtn
                  ? fromBtn
                  : initialValues && Object.keys(initialValues).length
                    ? t("buttons.edit")
                    : t("buttons.add")}
              </button>
            )}
          </div>
        )}
        {cancelBtn /* &&!!Object.keys(initialValues)?.length */ && (
          <div className={`flex items-center gap-4`}>
            {loader ? (
              <AppSkeleton width={"200px"} height={"50px"} />
            ) : (
              <button
                type="button"
                className="app-btn alert-btn"
                onClick={() => {
                  if (Object.keys(initialValues).length) {
                    form.setFieldsValue(initialValues);
                  } else {
                    form.resetFields();
                  }
                }}
              >
                {t("buttons.cancel")}
              </button>
            )}
          </div>
        )}
      </div>
    </Form>
  );
};

export default AppForm;

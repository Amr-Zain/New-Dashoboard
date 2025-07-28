import { FormInstance } from "antd";
import { Rule } from "antd/lib/form";

import { InputProps, InputRef } from 'antd/lib/input';
import { TextAreaProps } from 'antd/lib/input/TextArea';
import { PasswordProps } from 'antd/lib/input/Password';
import { SelectProps } from 'antd/lib/select';
import { DatePickerProps } from 'antd/lib/date-picker';
import { CheckboxProps } from 'antd/lib/checkbox';
import { RateProps } from 'antd/lib/rate';
import { RadioGroupProps } from 'antd/lib/radio';
import type { OTPProps } from 'antd/lib/input/OTP';
 import { PhoneNumberProps } from "@/components/UiComponents/form-controls/PhoneNumber";
// import { EditorProps } from "@/components/UiComponents/form-controls/AppEditor";
import { MultiLangFieldProps } from "@/components/UiComponents/form-controls/MultiLangField";
import { AppLoaderProps } from "./ApploaderTypes";
import { EditorProps } from "@/components/UiComponents/form-controls/TiptapEditor";

interface CommenProps {
  name:string;
  label?: string | React.ReactNode;
  customItem?: React.ReactNode;
  subContent?: string | React.ReactNode;
  rules?: Rule[];
  span?: number;
  placeholder?: string;
  itemProps?: any;
  inputProps?: any;
  onchange?: (value: any) => void;
  skeletonClassName?: string;
}
interface TextInputProps extends InputProps { }
interface PasswordInputProps extends PasswordProps { }
interface NumberInputProps extends InputProps { }
interface DateInputProps extends DatePickerProps { }
interface TextAreaInputProps extends TextAreaProps { }
interface PhoneInputProps extends PhoneNumberProps { }
interface RateInputProps extends RateProps { }
interface SelectInputProps extends SelectProps { }
interface RadioInputProps extends RadioGroupProps { }
interface CheckboxInputProps extends CheckboxProps { }
interface OTPInputProps extends OTPProps { }
interface MultiLangFieldInputProps extends MultiLangFieldProps { }

// Update FieldProp to be a discriminated union
type Field =
  | { type: "text"; inputProps?: TextInputProps; }
  | { type: "textarea"; inputProps?: TextAreaInputProps; }
  | { type: "number"; inputProps?: NumberInputProps; }
  | { type: "select"; inputProps?: SelectInputProps; options?: { value: string | number; label: string | React.ReactNode }[]; multiple?: boolean; }
  | { type: "phone"; inputProps?: PhoneInputProps; }
  | { type: "custom"; customItem?: React.ReactNode; }
  | { type: "password"; inputProps?: PasswordInputProps; }
  | { type: "imgUploader"; inputProps?: AppLoaderProps; maxCount?: number; }
  | { type: "mediaUploader"; inputProps?: AppLoaderProps; maxCount?: number; }
  | { type: "fileUpload"; inputProps?: AppLoaderProps; maxCount?: number; }
  | { type: "otp"; inputProps?: OTPInputProps; }
  | { type: "radio"; inputProps?: RadioInputProps; options?: { value: string | number; label: string | React.ReactNode }[]; }
  | { type: "editor"; inputProps?: EditorProps; }
  | { type: "date"; inputProps?: DateInputProps; }
  | { type: "checkbox"; inputProps?: CheckboxInputProps; }
  | { type: "rate"; inputProps?: RateInputProps; }
  | { type: "multiLangField"; inputProps?: MultiLangFieldInputProps; };

export type FieldProp = Field & CommenProps;

export interface AppFormProps<T extends object = Record<string, any>> {
  fields?: FieldProp[];
  onFinish?: (values: T) => void;
  onValuesChange?: (changedValues: Partial<T>, allValues: T) => void;
  handleErrorFailed?: (errorInfo: {
    values: T;
    errorFields: any[];
    outOfDate: boolean;
  }) => void;
  initialValues?: T;
  formClass?: string;
  withOutBtn?: boolean;
  form: FormInstance<T>;
  children?: React.ReactNode;
  btnClass?: string;
  fromBtn?: string | React.ReactNode;
  loader?: boolean;
  cancelBtn?: boolean;
}
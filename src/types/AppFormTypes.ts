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
import { GoogleMapProps, Position } from "@/components/UiComponents/form-controls/AppMap";
// export interface Position {
//   lat: number;
//   lng: number;
// }

// export interface GoogleMapProps {
//   onMarkerPositionChange?: (position: Position) => void;
//   defaultMarkerPosition?: Position | null;
//   className?: string;
//   height?: number;
//   locations?: Position[];
//   zoom?: number;
//   mapContainerStyle?: React.CSSProperties;
// }
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
interface TextInputProps extends InputProps, Record<string, unknown> {}
interface PasswordInputProps extends PasswordProps, Record<string, unknown> {}
interface NumberInputProps extends InputProps, Record<string, unknown> {}
interface DateInputProps extends DatePickerProps, Record<string, unknown> {}
interface TextAreaInputProps extends TextAreaProps, Record<string, unknown> {}
interface PhoneInputProps extends PhoneNumberProps, Record<string, unknown> {}
interface RateInputProps extends RateProps, Record<string, unknown> {}
interface SelectInputProps extends SelectProps, Record<string, unknown> {}
interface RadioInputProps extends RadioGroupProps, Record<string, unknown> {}
interface CheckboxInputProps extends CheckboxProps, Record<string, unknown> {}
interface OTPInputProps extends OTPProps, Record<string, unknown> {}
interface MultiLangFieldInputProps extends MultiLangFieldProps, Record<string, unknown> {}

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
  | { type: "multiLangField"; inputProps?: MultiLangFieldInputProps; }
| { 
      type: "map"; 
      inputProps?: GoogleMapProps;
      // Add any additional map-specific props you need
      onPositionChange?: (position: Position) => void;
    };
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
  // lat?: number;
  // lng?: number;
    // map: { lat: number; lng: number };

}
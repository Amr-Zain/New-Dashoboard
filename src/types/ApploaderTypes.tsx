import { FormInstance } from 'antd';
import { NamePath } from 'antd/es/form/interface';

type FileType = File;

export interface UploadFile {
  uid: string;
  name: NamePath;
  isUploading: boolean;
  url?: string;
  preview?: string;
  originFileObj?: FileType;
  type?: string;
  size?: number;
  response?: { data: { id: string; url: string; [key: string]: any } }; 
}

export interface AppLoaderProps<T extends object = Record<string, any>> {
  initialFileList?: UploadFile[];
  onChange?: (fileList: UploadFile[] | { id: string; url: string; [key: string]: any }) => void; 
  onRemove?: (fileList: UploadFile[]) => void;
  maxCount?: number;
  disabled?: boolean;
  hideTitle?: boolean;
  singleFile?: boolean;
  form: FormInstance<T>; 
  shapeType?: "picture-card" | "list";
  type_file?: "image" | "document" | "media";
  name: NamePath;
  model?: string; 
  accept?: string;
  baseUrl?: string;
  maxSize?: number;
  showPreview?: boolean;
  draggable?: boolean;
  apiEndpoint?: string;
  uploadText?:string;
}
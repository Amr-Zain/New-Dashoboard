import { Loader2, Plus } from "lucide-react";
import { useDropzone } from "react-dropzone";
import CardPreview from "../previews/CardPreview";
import { getAcceptTypes } from "@/utils/helpers";
import { UploadFile } from "@/types/ApploaderTypes";

export default function UploadedPreview({
  fileList,
  showPreview,
  handlePreview,
  handleRemove,
  shapeType,
  onDrop,
  type_file,
  maxCount,
  accept,
  singleFile,
  draggable,
  disabled = false,
  loading,
}: {
  fileList: UploadFile[];
  showPreview: boolean;
  loading: boolean;
  shapeType: "picture-card" | "list";
  handlePreview: (value: UploadFile) => void;
  handleRemove: (file: UploadFile) => void;
  onDrop: any;
  type_file?: "image" | "document" | "media";
  maxCount?: number;
  accept?: string;
  singleFile?: boolean;
  draggable?: boolean;
  disabled?: boolean;
}) {
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: getAcceptTypes(accept, type_file)
      .split(",")
      .reduce((acc, type) => {
        acc[type.trim()] = [];
        return acc;
      }, {} as any),
    maxFiles: singleFile ? 1 : maxCount,
    disabled: disabled || (!draggable && false),
    noClick: true,
    noDrag: !draggable,
    multiple: !singleFile,
  });

  return (
      <div
        className={
          shapeType === "picture-card"
            ? singleFile || maxCount ===1
              ? "max-w-44 mx-auto"
              : "grid gap-2 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
            : "space-y-2"
        }
      >
        {fileList.map((file) => (
          <CardPreview
            key={file.uid}
            file={file}
            handlePreview={handlePreview}
            showPreview={showPreview}
            handleRemove={handleRemove}
            shapeType={shapeType}
          />
        ))}
        {fileList.length < (maxCount || 1) && (
          <div
            {...getRootProps()}
            className={`p-4 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
              isDragActive && draggable
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <input {...getInputProps()} />
            <button
              type="button"
              className="bg-transparent border-none flex flex-col items-center justify-center h-full w-full relative"
              onClick={() => !disabled && open()}
            >
              <div className="flex flex-col justify-center items-center gap-2 text-gray-500">
                <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <span className="text-sm text-center">
                  {draggable
                    ? "Click or drag files here to upload"
                    : "Click to upload"}
                </span>
              </div>
            </button>
          </div>
        )}
      </div>
  );
}

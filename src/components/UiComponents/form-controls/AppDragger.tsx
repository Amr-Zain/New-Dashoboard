import React, { useState } from "react";
import type { UploadProps } from "antd";
import { message, Upload, Progress } from "antd";
// import { DraggerIcon } from "../../../assets/svgs/Icons";
import { CloseOutlined } from "@ant-design/icons";
import { FaDragon } from "react-icons/fa";

const { Dragger } = Upload;

interface AppDraggerProps {
  uploadText?: string;
  type?: "image" | "file" | "both";
  multiple?: boolean;
  maxCount?: number;
}

const AppDragger: React.FC<AppDraggerProps> = ({ uploadText, type = "both", multiple = true, maxCount }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false);

  const getAcceptedTypes = () => {
    switch (type) {
      case "image":
        return "image/*";
      case "file":
        return ".pdf,.doc,.docx,.xls,.xlsx,.txt";
      case "both":
      default:
        return "image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt";
    }
  };

  const handleDelete = () => {
    setUploading(false);
    setProgress(0);
    setFileName("");
    setFileUploaded(false);
  };

  const props: UploadProps = {
    name: "file",
    multiple,
    maxCount,
    // itemRender: ()=><div></div>,
    accept: getAcceptedTypes(),
    // action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange(info) {
      const { status, percent, name } = info.file;
      if (status === "uploading") {
        setUploading(true);
        setProgress(percent || 0);
        setFileName(name);
      }
      if (status === "done") {
        message.success(`${info.file.name} uploaded successfully.`);
        setUploading(false);
        setFileUploaded(true);
      } else if (status === "error") {
        message.error(`${info.file.name} upload failed.`);
        setUploading(false);
      }
    },
  };

  return (
    <>
      {!multiple && (fileUploaded ) ? (
        <div className="p-4 bg-body/50 rounded-xl">
            <div className="flex items-center justify-between my-3 gap-4">
                <p className="text-sm text-gray-600">{fileName}</p>
                {fileUploaded && (
                    <CloseOutlined className="text-gray-500 cursor-pointer" onClick={handleDelete} />
                )}
            </div>
            <Progress percent={progress} status={progress < 100 ? "active" : "success"} />
        </div>
      ) : (
        <Dragger {...props}>
          <p className="flex-center-content">
            <FaDragon />
          </p>
          <p className="text-gray-200 font-semibold text-sm">{uploadText}</p>
        </Dragger>
      )}
    </>
  );
};

export default AppDragger;
import axiosInstance from "@/services/axiosGeneral";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import UploadedPreview from "./UploadedPreview";
import AppModal from "../Modal/AppModal";
import { Image } from "antd";
import { useTranslation } from "react-i18next";
import { AppLoaderProps, UploadFile } from "@/types/ApploaderTypes";
type FileType = File;

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const AppUploader = <T extends object = Record<string, any>>({
  initialFileList = [],
  onChange,
  onRemove,
  maxCount = 1,
  disabled = false,
  hideTitle = false,
  singleFile = false,
  form,
  shapeType = "picture-card",
  type_file = "image",
  name = "image",
  model,
  accept,
  baseUrl,
  maxSize = 5,
  showPreview = true,
  draggable = true,
  apiEndpoint = "/attachments",
}: AppLoaderProps<T>) => {
  const [fileList, setFileList] = useState<UploadFile[]>(initialFileList);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState<string>("");
  const [previewType, setPreviewType] = useState<
    "image" | "video" | "document" | ""
  >("");
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Only update if initialFileList is different from current fileList to prevent infinite loops
    if (
      initialFileList &&
      initialFileList.length > 0 &&
      JSON.stringify(initialFileList) !== JSON.stringify(fileList)
    ) {
      setFileList(initialFileList);
    }
  }, [initialFileList]);

  const fileListRef = useRef(fileList);
  fileListRef.current = fileList;

  useEffect(() => {
    return () => {
      fileListRef.current.forEach((file) => {
        if (file.url?.startsWith("blob:")) {
          URL.revokeObjectURL(file.url);
        }
      });
    };
  }, []);

  const validateFile = (file: FileType): string | null => {
    if (type_file === "document") {
      const allowedTypes = ["application/pdf"];
      if (!allowedTypes.includes(file.type)) {
        return t("Messages.onlyPdfAllowed") || "Only PDF files are allowed";
      }
    }

    if (maxSize && file.size && file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`;
    }
    return null;
  };

  const handlePreview = async (file: UploadFile) => {
    if (!showPreview) return;

    if (type_file === "document") {
      setPreviewType("document");
      setPreviewContent(file.url || (file.preview as string));
    } else if (type_file === "media") {
      const isVideo = file.type?.startsWith("video");
      setPreviewType(isVideo ? "video" : "image");
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as FileType);
      }
      setPreviewContent(file.url || (file.preview as string));
    } else {
      setPreviewType("image");
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as FileType);
      }
      setPreviewContent(file.url || (file.preview as string));
    }
    setPreviewOpen(true);
  };

  const uploadToServer = async (
    file: FileType
  ): Promise<{ data: { id: string; url: string; [key: string]: any } }> => {
    let attachmentType = "";
    if (file.type.startsWith("image/")) {
      attachmentType = "image";
    } else if (file.type.startsWith("video/")) {
      attachmentType = "video";
    } else {
      attachmentType = "file";
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("attachment_type", attachmentType);
    formData.append("model", model || "applications");

    const { data } = await axiosInstance({
      method: "POST",
      baseURL: baseUrl || axiosInstance.defaults.baseURL + apiEndpoint,
      data: formData,
    });

    return data;
  };

  const handleFileUpload = async (files: FileType[]) => {
    try {
      setLoading(true);
      const newFiles: UploadFile[] = [];

      for (let file of files) {
        if (fileList.some((f) => f.name === file.name)) {
          continue;
        }

        const validationError = validateFile(file);
        if (validationError) {
          toast.error(validationError);
          continue;
        }

        const uploadFile: UploadFile = {
          uid: crypto.randomUUID(),
          name: file.name,
          isUploading: true,
          originFileObj: file,
          type: file.type,
          size: file.size,
        };

        newFiles.push(uploadFile);
      }

      if (newFiles.length === 0) return;

      const updatedList = singleFile ? newFiles : [...fileList, ...newFiles];
      if (maxCount && updatedList.length > maxCount) {
        toast.error(`Maximum ${maxCount} files allowed`);
        return;
      }

      setFileList(updatedList);

      for (let file of newFiles) {
        try {
          const response = await uploadToServer(file.originFileObj!);

          const updatedFile: UploadFile = {
            ...file,
            isUploading: false,
            response: response,
            url: URL.createObjectURL(file.originFileObj!),
          };
          setFileList((prev) =>
            prev.map((f) => (f.uid === file.uid ? updatedFile : f))
          );

          if (onChange) {
            onChange(response.data); // Pass the response data directly
          } else {
            form.setFieldValue(name, response.data); // Pass the response data directly
          }
        } catch (error: any) {
          console.error("Upload error:", error);
          toast.error(error?.response?.data?.message || "Upload failed");

          setFileList((prev) => prev.filter((f) => f.uid !== file.uid));
        }
      }
    } catch (error: any) {
      console.log("upload error:", error);
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (file: UploadFile) => {
    try {
      if (file.uid && !file?.url?.startsWith("blob:")) {
        // Assuming file.response.data.id is the ID for existing files
        await axiosInstance.delete(
          `${apiEndpoint}/${file.response?.data?.id || file.uid}`
        );
      }
      const updatedFiles = fileList.filter((item) => item.uid !== file.uid);
      setFileList(updatedFiles);
      if (onRemove) onRemove(updatedFiles);
      else form.setFieldValue(name, updatedFiles);

      if (file.url && file.url.startsWith("blob:")) {
        URL.revokeObjectURL(file.url);
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Failed to delete file");
    } finally {
      setLoading(false);
    }
  };
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      handleFileUpload(acceptedFiles);
    }
  };
  return (
    <div className="w-full">
      {!hideTitle && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text">
            {type_file === "image"
              ? "Image Upload"
              : type_file === "document"
                ? "Document Upload"
                : "Media Upload"}
          </h3>
          <span className="text-sm text-secondary">
            {fileList.length}
            {maxCount ? `/${maxCount}` : ""} files
          </span>
        </div>
      )}
      <UploadedPreview
        fileList={fileList}
        showPreview={showPreview}
        shapeType={shapeType}
        loading={loading}
        handlePreview={handlePreview}
        handleRemove={handleRemove}
        onDrop={onDrop}
        type_file={type_file}
        maxCount={maxCount}
        accept={accept}
        singleFile={singleFile}
        draggable={draggable}
        disabled={disabled}
      />
      {previewOpen && previewType === "image" ? (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewContent(""),
          }}
          src={previewContent}
        />
      ) : (
        <AppModal
          open={previewOpen}
          width={previewType === "document" ? "80%" : "fit-content"}
          getContainer={"html"}
          onCancel={() => setPreviewOpen(false)}
          centered
          key={`app-Preview-modal`}
          wrapClassName={`${previewType === "document" ? "file-modal" : ""}`}
        >
          {previewType === "video" ? (
            <video controls style={{ width: "100%" }}>
              <source src={previewContent} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <iframe
              src={previewContent || ""}
              style={{ width: "100%", height: "500px", border: "none" }}
            />
          )}
        </AppModal>
      )}
    </div>
  );
};

export default AppUploader;

import { Eye } from "iconsax-reactjs";
import { File, FileText, Image as ImageIcon, Loader2, Video, X } from "lucide-react";
import { UploadFile } from "../form-controls/AppUploader";
import { formatFileSize } from "@/utils/helpers";
import { Image } from "antd";
import ImageWithFallback from "../ImageWithFallback";

type FilePreviewProps = {
  file: UploadFile;
  showPreview: boolean;
  handlePreview: (value: UploadFile) => void;
  handleRemove: (file: UploadFile) => void;
  shapeType?: "list" | "picture-card";
};

const getFileIcon = (file: UploadFile) => {
  if (file.type?.startsWith("image/"))
    return <ImageIcon className="w-8 h-8 text-primary" />;
  if (file.type?.startsWith("video/"))
    return <Video className="w-8 h-8 text-info" />;
  if (file.type?.includes("pdf"))
    return <FileText className="w-8 h-8 text-danger" />;
  return <File className="w-8 h-8 text-secondary" />;
};

const renderFilePreview = (file: UploadFile) => {
  if (file.isUploading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if ((file.url || file.preview)) {
    return (
      <ImageWithFallback
        src={file.url || file.preview}
        alt={file.name}
        className="w-full h-full object-cover rounded-lg"
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {getFileIcon(file)}
      <span className="text-xs text-secondary mt-1 text-center truncate max-w-full">
        {file.name}
      </span>
    </div>
  );
};

function FilePreview({
  file,
  showPreview,
  handlePreview,
  handleRemove,
  shapeType = "list",
}: FilePreviewProps) {
  if (shapeType === "picture-card") {
    return (
      <div key={file.uid} className="relative group bg-dark p-2 rounded-lg">
        <div className="aspect-square bg-body border-2 border-border rounded-lg overflow-hidden hover:border-primary transition-colors">
          {renderFilePreview(file)}
        </div>

        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            {showPreview && !file.isUploading && (
              <button
              type="button"
                onClick={() => handlePreview(file)}
                className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors text-text"
              >
                <Eye className="w-4 h-4" />
              </button>
            )}

            <button
            type="button"
              onClick={() => handleRemove(file)}
              className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors text-danger"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-2">
          <p className="text-sm font-medium text-text truncate">{file.name}</p>
          {file.size && (
            <p className="text-xs text-secondary">
              {formatFileSize(file.size)}
            </p>
          )}
        </div>
      </div>
    );
  }
  return (
    <div key={file.uid} className="flex items-center p-3 bg-dark rounded-lg">
      <div className="flex-shrink-0 mr-3">{getFileIcon(file)}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text truncate">{file.name}</p>
        {file.size && (
          <p className="text-xs text-secondary">{formatFileSize(file.size)}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        {file.isUploading && (
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
        )}
        {showPreview && !file.isUploading && (
          <button
            onClick={() => handlePreview(file)}
            className="p-1 hover:bg-primary/10 rounded text-text"
          >
            <Eye className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={() => handleRemove(file)}
          className="p-1 hover:bg-danger/10 rounded text-danger"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default FilePreview;

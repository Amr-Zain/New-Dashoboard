import { Image } from "antd";
import fallbackSrc from "@/assets/icons/placeholder.svg";
import { useState } from "react";

interface Props {
  imgSrc: string;
  alt: string;
  height?: number;
  width?: number;
}

const TableImage = ({ imgSrc, alt,height = 80, width = 80 }: Props) => {
    const [imageSrc, setImageSrc] = useState(imgSrc);

  return (
    <Image
      width={width}
      height={height}
      src={imageSrc}
      alt={alt}
      wrapperClassName="size-16 rounded-3xl overflow-hidden bg-body/50"
      className="object-cover"
      onError={()=>setImageSrc(fallbackSrc)}
      placeholder={
        <Image
          preview={false}
          src={fallbackSrc}
          wrapperClassName="size-16 rounded-3xl overflow-hidden bg-body/50"
          className="object-cover"
          width={width}
          height={height}
        />
      }
    />
  );
};

export default TableImage;

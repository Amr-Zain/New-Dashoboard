import { JSX, ReactNode } from "react";
import { Button } from "antd";

interface MessageProps {
  children?: ReactNode | ReactNode[] | string;
  htmlType?: "submit" | "reset" | "button" | undefined;
  type?:any;
  onClick?: any;
  className?: string;
  icon?: ReactNode | ReactNode[];
  loading?: boolean;
  disabled?: boolean | undefined;
  block?: boolean;
  style?: React.CSSProperties;
  href?:string
}

const AppButton = ({
  children,
  htmlType,
  onClick,
  className,
  icon,
  loading,
  disabled,
  block,
  style,
  href,
  type
}: MessageProps): JSX.Element => {
  const buttonProps = {
    block,
    disabled,
    icon,
    className: className ? `app-btn ${className}` : "app-btn",
    onClick,
    loading,
    htmlType: htmlType || "button",
    style,
    type,
    ...(href ? { href } : {}),
  };
  return (
    <Button {...buttonProps}>
      {children}
    </Button>
  );
};

export default AppButton;

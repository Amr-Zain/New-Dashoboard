import { Drawer } from "antd";
import "@/styles/components/app-drawer.scss";

interface Props {
  open: boolean;
  loading?: boolean;
  handleClose: any;
  title: string | React.ReactNode;
  children: React.ReactNode;
  placement: "top" | "bottom" | "left" | "right";
  className?: string;
  rootClassName?: string;
  footer?: React.ReactNode;
}

const AppDrawer = ({
  open,
  loading,
  handleClose,
  title,
  placement,
  children,
  rootClassName,
  footer,
  className,
}: Props) => {
  return (
    <Drawer
      closable
      destroyOnHidden
      title={title}
      placement={placement}
      open={open}
      loading={loading}
      onClose={handleClose}
      footer={footer}
      rootClassName={`app-drawer ${rootClassName ? rootClassName : ""}`}
      className={`app-drawer-content ${className ? className : ""}`}
      getContainer="html"
    >
      {children}
    </Drawer>
  );
};

export default AppDrawer;

import React from "react";
import { Modal, ModalProps } from "antd";
import "@/styles/components/app-modal.scss";

interface AppModalProps extends ModalProps {
  children: React.ReactNode;
  className?: string;
  getContainer?: any;
  footer?: any;
}

const AppModal = ({
  children,
  className,
  getContainer = false,
  footer = false,
  ...props
}: AppModalProps) => {
  return (
    <>
      <Modal
        zIndex={9999}
        className={className ? `createApp-Modal ${className}` : "createApp-Modal"}
        getContainer={getContainer}
        footer={footer}
        centered
        {...props}
      >
        {children}
      </Modal>
    </>
  );
};

export default AppModal;

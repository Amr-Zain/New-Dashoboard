import { createFileRoute } from "@tanstack/react-router";
import AppDropdown from "@/components/UiComponents/dropdown/AppDropdown";
import {
  Notification as NotificationIcon,
  NotificationBing,
} from "iconsax-reactjs";
import { Badge, Typography, Button, Divider } from "antd";
import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/_main/notifications/")({
  component: NotificationsDrawer,
});

const { Text, Title } = Typography;

export function NotificationsDrawer() {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState<any>([
    // Uncomment below to test with data
    {
      id: 1,
      title: "New Order Received",
      message: "You have received a new order #12345",
      time: "2 minutes ago",
      isRead: false,
      type: "order",
    },
    {
      id: 2,
      title: "Payment Confirmed",
      message: "Payment for order #12344 has been confirmed",
      time: "1 hour ago",
      isRead: true,
      type: "payment",
    },
  ]);

  const unreadCount = notifications.filter(
    (notification: any) => !notification.isRead
  ).length;

  const markAsRead = useCallback((id: any) => {
    setNotifications((prev: any) =>
      prev.map((notification: any) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev: any) =>
      prev.map((notification: any) => ({ ...notification, isRead: true }))
    );
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const handleMenuClick = ({ key }: any) => {
    if (key === "mark-all-read") {
      markAllAsRead();
    } else if (key === "clear-all") {
      clearAll();
    } else if (key.startsWith("notification-")) {
      const notificationId = parseInt(key.replace("notification-", ""));
      markAsRead(notificationId);
    }
  };

  const getMenuItems = () => {
    const items = [];

    // Header item
    items.push({
      key: "header",
      label: (
        <div className="flex items-center justify-between bg-body m-3 p-3 rounded-xl">
          <h3 className="mb-0 text-text py-2 font-bold text-lg">
            {t("labels.notifications")}
          </h3>
          {notifications.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="bg-dark size-10 text-lg rounded-full flex items-center justify-center">
                {unreadCount}{" "}
              </span>
            </div>
          )}
        </div>
      ),
    });

    if (notifications.length === 0) {
      // Empty state item
      items.push({
        key: "empty",
        label: (
          <div className="p-6 text-center text-text min-h-[300px] flex flex-col items-center justify-center">
            <div className="flex justify-center mb-4">
              <NotificationBing size={48} className="" />
            </div>
            <div>
              <h5 className="block mb-2 font-medium">
                {t("notifications.not_notifications_yet")}
              </h5>
              <p className="text-sm">
                {t("notifications.not_notifications_desc")}
              </p>
            </div>
          </div>
        ),
        disabled: true,
      });
    } else {
      // Notification items
      notifications.forEach((notification: any) => {
        items.push({
          key: `notification-${notification.id}`,
          label: (
            <div
              className={`text-text w-full ${!notification.isRead ? "bg-body" : ""}`}
            >
              <div className="flex items-center gap-3 py-5 px-3">
                <span
                  className={`min-w-12 size-12 rounded-full flex items-center justify-center ${!notification.isRead ? "bg-dark " : " bg-body"} border-double border-border`}
                >
                  <NotificationIcon />
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2 ">
                    <h5 className="block ">{notification.title}</h5>
                    <span className="text-xs block mt-1">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-sm block mt-1 line-clamp-1 truncate max-w-[90%]">
                    {notification.message}
                  </p>
                </div>
              </div>
            </div>
          ),
        });
      });

      items.push({
        key: "view-all",
        label: (
          <div className="text-center py-3 bg-body">
            <Button
              type="link"
              size="small"
              className="text-primary font-medium"
            >
              {t("notifications.show_all")}
            </Button>
          </div>
        ),
        disabled: true,
      });
    }
    return items;
  };

  return (
    <AppDropdown
      menu={{
        items: getMenuItems(),
        onClick: handleMenuClick,
      }}
      rootClassName="notifications-dropdown"
      trigger={["click"]}
      placement="bottomRight"
    >
      <div className="header-action me-2 relative">
        <NotificationIcon size={20} />
      </div>
    </AppDropdown>
  );
}

export default NotificationsDrawer;

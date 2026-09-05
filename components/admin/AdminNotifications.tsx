"use client";

import { useState } from "react";
import {
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "@/app/dashboard/admin/notifications/actions";

type Notification = {
  id: string;
  user_id: string;
  title: string;
  message: string | null;
  is_read: boolean;
  created_at: string;
};

type Props = {
  initialNotifications: Notification[];
  userId: string;
};

export default function AdminNotifications({
  initialNotifications,
  userId,
}: Props) {
  const [notifications, setNotifications] =
    useState(initialNotifications);

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read
  ).length;

  async function handleMarkAsRead(
    notification: Notification
  ) {
    if (notification.is_read) return;

    const formData = new FormData();

    formData.append("id", notification.id);

    try {
      await markNotificationAsRead(formData);

      setNotifications((current) =>
        current.map((item) =>
          item.id === notification.id
            ? {
                ...item,
                is_read: true,
              }
            : item
        )
      );
    } catch (error) {
      console.error(error);
      alert("تعذر تحديث الإشعار.");
    }
  }

  async function handleMarkAllAsRead() {
    if (unreadCount === 0) return;

    setLoading(true);

    try {
      await markAllNotificationsAsRead(userId);

      setNotifications((current) =>
        current.map((item) => ({
          ...item,
          is_read: true,
        }))
      );
    } catch (error) {
      console.error(error);
      alert("تعذر تحديث الإشعارات.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(
    notificationId: string
  ) {
    const confirmed = window.confirm(
      "هل أنت متأكد من رغبتك في حذف هذا الإشعار؟\n\nلا يمكن التراجع عن هذه العملية."
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(notificationId);

    const formData = new FormData();

    formData.append("id", notificationId);

    try {
      await deleteNotification(formData);

      setNotifications((current) =>
        current.filter(
          (item) => item.id !== notificationId
        )
      );
    } catch (error) {
      console.error(error);
      alert("تعذر حذف الإشعار.");
    } finally {
      setDeletingId(null);
    }
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleString(
      "ar-EG",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  }

  return (
    <div className="relative">
      {/* زر الإشعارات */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="relative rounded-xl bg-white p-3 shadow hover:bg-slate-50"
        aria-label="الإشعارات"
      >
        <span className="text-2xl">
          🔔
        </span>

        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white">
            {unreadCount > 99
              ? "99+"
              : unreadCount}
          </span>
        )}
      </button>

      {/* قائمة الإشعارات */}
      {open && (
        <>
          {/* خلفية شفافة لإغلاق القائمة */}
          <button
            type="button"
            aria-label="إغلاق الإشعارات"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />

          <div className="absolute left-0 top-14 z-50 w-[360px] max-w-[90vw] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
            {/* رأس القائمة */}
            <div className="flex items-center justify-between border-b p-4">
              <div>
                <h2 className="font-bold text-slate-800">
                  الإشعارات
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  {unreadCount > 0
                    ? `لديك ${unreadCount} إشعار غير مقروء`
                    : "لا توجد إشعارات جديدة"}
                </p>
              </div>

              {unreadCount > 0 && (
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleMarkAllAsRead}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-800 disabled:opacity-50"
                >
                  {loading
                    ? "جاري التحديث..."
                    : "تحديد الكل كمقروء"}
                </button>
              )}
            </div>

            {/* المحتوى */}
            <div className="max-h-[420px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="mb-3 text-4xl">
                    🔕
                  </div>

                  <p className="text-gray-500">
                    لا توجد إشعارات.
                  </p>
                </div>
              ) : (
                notifications.map(
                  (notification) => (
                    <div
                      key={notification.id}
                      className={`border-b p-4 transition ${
                        notification.is_read
                          ? "bg-white"
                          : "bg-blue-50"
                      }`}
                    >
                      <div className="flex gap-3">
                        {/* الأيقونة */}
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xl">
                          🔔
                        </div>

                        {/* المحتوى */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3
                              className={`font-semibold ${
                                notification.is_read
                                  ? "text-slate-700"
                                  : "text-blue-800"
                              }`}
                            >
                              {notification.title}
                            </h3>

                            {!notification.is_read && (
                              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                            )}
                          </div>

                          {notification.message && (
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                              {notification.message}
                            </p>
                          )}

                          <p className="mt-2 text-xs text-gray-400">
                            {formatDate(
                              notification.created_at
                            )}
                          </p>

                          {/* الإجراءات */}
                          <div className="mt-3 flex gap-3">
                            {!notification.is_read && (
                              <button
                                type="button"
                                disabled={
                                  deletingId ===
                                  notification.id
                                }
                                onClick={() =>
                                  handleMarkAsRead(
                                    notification
                                  )
                                }
                                className="text-xs font-semibold text-blue-600 hover:text-blue-800 disabled:opacity-50"
                              >
                                ✓ تحديد كمقروء
                              </button>
                            )}

                            <button
                              type="button"
                              disabled={
                                deletingId ===
                                notification.id
                              }
                              onClick={() =>
                                handleDelete(
                                  notification.id
                                )
                              }
                              className="text-xs font-semibold text-red-600 hover:text-red-800 disabled:opacity-50"
                            >
                              {deletingId ===
                              notification.id
                                ? "جاري الحذف..."
                                : "🗑️ حذف"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

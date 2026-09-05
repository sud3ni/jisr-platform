"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase-client";

type Notification = {
  id: string;
  user_id: string;
  title: string;
  message: string | null;
  type?: string | null;
  is_read: boolean;
  created_at: string;
};

export default function NotificationsBell() {
  const [notifications, setNotifications] = useState<
    Notification[]
  >([]);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();

    const channel = supabase
      .channel("notifications-bell")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
        },
        async (payload) => {
          const {
            data: { user },
          } = await supabase.auth.getUser();

          if (!user) return;

          if (
            payload.new &&
            payload.new.user_id === user.id
          ) {
            setNotifications((current) => [
              payload.new as Notification,
              ...current,
            ]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function loadNotifications() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      })
      .limit(20);

    if (!error) {
      setNotifications(data || []);
    }

    setLoading(false);
  }

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read
  ).length;

  async function markAsRead(id: string) {
    const { error } = await supabase
      .from("notifications")
      .update({
        is_read: true,
      })
      .eq("id", id);

    if (error) {
      console.error(
        "Mark notification as read error:",
        error
      );
      return;
    }

    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              is_read: true,
            }
          : notification
      )
    );
  }

  async function markAllAsRead() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || unreadCount === 0) return;

    const { error } = await supabase
      .from("notifications")
      .update({
        is_read: true,
      })
      .eq("user_id", user.id)
      .eq("is_read", false);

    if (error) {
      console.error(
        "Mark all notifications error:",
        error
      );
      return;
    }

    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        is_read: true,
      }))
    );
  }

  function notificationIcon(
    type?: string | null
  ) {
    switch (type) {
      case "application":
        return "📋";

      case "institution":
        return "🏢";

      case "opportunity":
        return "💼";

      case "user":
        return "👤";

      default:
        return "🔔";
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
      {/* زر الجرس */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="relative rounded-xl bg-white p-3 shadow transition hover:bg-slate-50"
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

      {/* القائمة */}
      {open && (
        <>
          {/* الخلفية */}
          <button
            type="button"
            aria-label="إغلاق القائمة"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />

          <div className="absolute left-0 top-14 z-50 w-[380px] max-w-[90vw] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
            {/* الرأس */}
            <div className="flex items-center justify-between border-b p-4">
              <div>
                <h2 className="font-bold text-slate-800">
                  🔔 الإشعارات
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  {loading
                    ? "جاري التحميل..."
                    : unreadCount > 0
                    ? `لديك ${unreadCount} إشعار غير مقروء`
                    : "لا توجد إشعارات جديدة"}
                </p>
              </div>

              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllAsRead}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800"
                >
                  تحديد الكل كمقروء
                </button>
              )}
            </div>

            {/* الإشعارات */}
            <div className="max-h-[420px] overflow-y-auto">
              {!loading &&
              notifications.length === 0 ? (
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
                        <div className="text-xl">
                          {notificationIcon(
                            notification.type
                          )}
                        </div>

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

                          {!notification.is_read && (
                            <button
                              type="button"
                              onClick={() =>
                                markAsRead(
                                  notification.id
                                )
                              }
                              className="mt-2 text-xs font-semibold text-blue-600 hover:text-blue-800"
                            >
                              ✓ تحديد كمقروء
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                )
              )}
            </div>

            {/* رابط جميع الإشعارات */}
            <div className="border-t bg-slate-50 p-3 text-center">
              <Link
                href="/dashboard/institution/notifications"
                onClick={() => setOpen(false)}
                className="text-sm font-semibold text-blue-700 hover:underline"
              >
                عرض جميع الإشعارات
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

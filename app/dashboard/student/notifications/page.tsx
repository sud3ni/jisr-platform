"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase-client";

type Notification = {
  id: string;
  user_id: string;
  title: string;
  message: string | null;
  is_read: boolean | null;
  created_at: string | null;
};

export default function StudentNotificationsPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  const [loading, setLoading] = useState(true);
  const [markingAll, setMarkingAll] = useState(false);
  const [markingId, setMarkingId] = useState<string | null>(
    null
  );

  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
    setLoading(true);
    setError("");

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        setError("يجب تسجيل الدخول أولاً.");
        return;
      }

      const {
        data,
        error: notificationsError,
      } = await supabase
        .from("notifications")
        .select(
          "id,user_id,title,message,is_read,created_at"
        )
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (notificationsError) {
        console.error(
          "Notifications error:",
          notificationsError
        );

        setError(
          "تعذر تحميل الإشعارات."
        );

        return;
      }

      setNotifications(data || []);
    } catch (err) {
      console.error(
        "Load notifications error:",
        err
      );

      setError(
        "حدث خطأ أثناء تحميل الإشعارات."
      );
    } finally {
      setLoading(false);
    }
  }

  const unreadCount = useMemo(() => {
    return notifications.filter(
      (notification) =>
        notification.is_read !== true
    ).length;
  }, [notifications]);

  const readCount = useMemo(() => {
    return notifications.filter(
      (notification) =>
        notification.is_read === true
    ).length;
  }, [notifications]);

  const filteredNotifications = useMemo(() => {
    if (filter === "unread") {
      return notifications.filter(
        (notification) =>
          notification.is_read !== true
      );
    }

    if (filter === "read") {
      return notifications.filter(
        (notification) =>
          notification.is_read === true
      );
    }

    return notifications;
  }, [notifications, filter]);

  function formatDate(
    date?: string | null
  ) {
    if (!date) {
      return "غير متوفر";
    }

    try {
      return new Intl.DateTimeFormat(
        "ar-SD",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      ).format(new Date(date));
    } catch {
      return date;
    }
  }

  function notificationTime(
    date?: string | null
  ) {
    if (!date) {
      return "";
    }

    try {
      return new Intl.DateTimeFormat(
        "ar-SD",
        {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        }
      ).format(new Date(date));
    } catch {
      return "";
    }
  }

  async function markAsRead(
    notificationId: string
  ) {
    if (markingId) return;

    setMarkingId(notificationId);
    setError("");

    try {
      const { error: updateError } =
        await supabase
          .from("notifications")
          .update({
            is_read: true,
          })
          .eq("id", notificationId);

      if (updateError) {
        console.error(
          "Mark notification read error:",
          updateError
        );

        setError(
          "تعذر تحديث حالة الإشعار."
        );

        return;
      }

      setNotifications((current) =>
        current.map((notification) =>
          notification.id === notificationId
            ? {
                ...notification,
                is_read: true,
              }
            : notification
        )
      );
    } catch (err) {
      console.error(
        "Mark notification error:",
        err
      );

      setError(
        "حدث خطأ أثناء تحديث الإشعار."
      );
    } finally {
      setMarkingId(null);
    }
  }

  async function markAllAsRead() {
    if (markingAll || unreadCount === 0) {
      return;
    }

    setMarkingAll(true);
    setError("");

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        setError(
          "انتهت جلسة تسجيل الدخول."
        );
        return;
      }

      const { error: updateError } =
        await supabase
          .from("notifications")
          .update({
            is_read: true,
          })
          .eq("user_id", user.id)
          .eq("is_read", false);

      if (updateError) {
        console.error(
          "Mark all notifications read error:",
          updateError
        );

        setError(
          "تعذر تحديد الإشعارات كمقروءة."
        );

        return;
      }

      setNotifications((current) =>
        current.map((notification) => ({
          ...notification,
          is_read: true,
        }))
      );
    } catch (err) {
      console.error(
        "Mark all notifications error:",
        err
      );

      setError(
        "حدث خطأ أثناء تحديث الإشعارات."
      );
    } finally {
      setMarkingAll(false);
    }
  }

  if (loading) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-slate-100"
      >
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="text-center">
            <div className="mx-auto h-11 w-11 animate-spin rounded-full border-4 border-blue-100 border-t-blue-700" />

            <p className="mt-5 font-bold text-slate-600">
              جاري تحميل الإشعارات...
            </p>

            <p className="mt-1 text-sm text-slate-400">
              يرجى الانتظار قليلاً
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error && notifications.length === 0) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-slate-100 px-6"
      >
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl ring-1 ring-slate-200">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <svg
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
              <path d="M10.3 3.6 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0Z" />
            </svg>
          </div>

          <h1 className="mt-5 text-2xl font-extrabold text-slate-900">
            تعذر تحميل الإشعارات
          </h1>

          <p className="mt-3 leading-7 text-slate-600">
            {error}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={loadNotifications}
              className="rounded-xl bg-blue-700 px-6 py-3 font-bold text-white transition hover:bg-blue-800"
            >
              المحاولة مرة أخرى
            </button>

            <Link
              href="/dashboard/student"
              className="rounded-xl border border-slate-200 px-6 py-3 font-bold text-slate-700 transition hover:bg-slate-50"
            >
              لوحة الطالب
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-100"
    >
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-blue-700 text-white shadow-md">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                <path d="M10 21h4" />
              </svg>

              {unreadCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-extrabold text-white ring-2 ring-white">
                  {unreadCount > 99
                    ? "99+"
                    : unreadCount}
                </span>
              )}
            </div>

            <div>
              <p className="text-xs font-bold text-blue-700">
                منصة جسر
              </p>

              <h1 className="text-xl font-extrabold text-slate-900">
                الإشعارات
              </h1>
            </div>
          </div>

          <Link
            href="/dashboard/student"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>

            لوحة الطالب
          </Link>
        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="overflow-hidden rounded-3xl bg-gradient-to-l from-blue-900 via-blue-800 to-indigo-700 p-6 text-white shadow-xl sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-bold text-blue-100">
                مركز التنبيهات
              </p>

              <h2 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">
                ابقَ على اطلاع
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
                ستجد هنا آخر التحديثات المتعلقة بطلبات
                التقديم والفرص وحسابك على منصة جسر.
              </p>
            </div>

            <div className="shrink-0 rounded-2xl bg-white/10 p-5 ring-1 ring-white/10">
              <p className="text-sm font-semibold text-blue-100">
                غير المقروءة
              </p>

              <p className="mt-1 text-4xl font-extrabold">
                {unreadCount}
              </p>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="mt-8 grid gap-5 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-bold text-slate-500">
              إجمالي الإشعارات
            </p>

            <p className="mt-2 text-3xl font-extrabold text-blue-700">
              {notifications.length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-bold text-slate-500">
              غير المقروءة
            </p>

            <p className="mt-2 text-3xl font-extrabold text-amber-600">
              {unreadCount}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-bold text-slate-500">
              المقروءة
            </p>

            <p className="mt-2 text-3xl font-extrabold text-emerald-600">
              {readCount}
            </p>
          </div>
        </section>

        {/* Controls */}
        <section className="mt-8 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                  filter === "all"
                    ? "bg-blue-700 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                الكل
              </button>

              <button
                type="button"
                onClick={() =>
                  setFilter("unread")
                }
                className={`rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                  filter === "unread"
                    ? "bg-amber-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-700"
                }`}
              >
                غير المقروءة
              </button>

              <button
                type="button"
                onClick={() =>
                  setFilter("read")
                }
                className={`rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                  filter === "read"
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
              >
                المقروءة
              </button>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={loadNotifications}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M20 11a8 8 0 0 0-14.8-4" />
                  <path d="M4 4v5h5" />
                  <path d="M4 13a8 8 0 0 0 14.8 4" />
                  <path d="M20 20v-5h-5" />
                </svg>

                تحديث
              </button>

              <button
                type="button"
                onClick={markAllAsRead}
                disabled={
                  markingAll ||
                  unreadCount === 0
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="m5 12 4 4L19 6" />
                </svg>

                {markingAll
                  ? "جاري التحديث..."
                  : "تحديد الكل كمقروء"}
              </button>
            </div>
          </div>
        </section>

        {/* Error */}
        {error && (
          <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 font-semibold text-red-700">
            {error}
          </div>
        )}

        {/* Notifications */}
        <section className="mt-8">
          <div className="mb-5">
            <h2 className="text-2xl font-extrabold text-slate-900">
              إشعاراتك
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              آخر التنبيهات والتحديثات الخاصة بحسابك.
            </p>
          </div>

          {filteredNotifications.length ===
          0 ? (
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                <svg
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                  <path d="M10 21h4" />
                </svg>
              </div>

              <h3 className="mt-5 text-xl font-extrabold text-slate-800">
                لا توجد إشعارات
              </h3>

              <p className="mx-auto mt-2 max-w-md leading-7 text-slate-500">
                لا توجد إشعارات ضمن التصنيف المحدد حاليًا.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map(
                (notification) => {
                  const isUnread =
                    notification.is_read !== true;

                  return (
                    <article
                      key={notification.id}
                      className={`relative overflow-hidden rounded-3xl bg-white shadow-sm ring-1 transition ${
                        isUnread
                          ? "ring-blue-200 shadow-blue-100/50"
                          : "ring-slate-200"
                      }`}
                    >
                      {isUnread && (
                        <div className="absolute right-0 top-0 h-full w-1.5 bg-blue-700" />
                      )}

                      <div className="p-5 sm:p-6">
                        <div className="flex gap-4">
                          {/* Icon */}
                          <div
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                              isUnread
                                ? "bg-blue-50 text-blue-700"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            <svg
                              className="h-6 w-6"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                            >
                              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                              <path d="M10 21h4" />
                            </svg>
                          </div>

                          {/* Content */}
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                              <div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <h3
                                    className={`text-lg font-extrabold ${
                                      isUnread
                                        ? "text-slate-900"
                                        : "text-slate-700"
                                    }`}
                                  >
                                    {
                                      notification.title
                                    }
                                  </h3>

                                  {isUnread && (
                                    <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-extrabold text-blue-700">
                                      جديد
                                    </span>
                                  )}
                                </div>

                                <p className="mt-1 text-xs font-semibold text-slate-400">
                                  {notificationTime(
                                    notification.created_at
                                  )}
                                </p>
                              </div>

                              {isUnread && (
                                <div className="hidden h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600 sm:block" />
                              )}
                            </div>

                            {notification.message && (
                              <p className="mt-4 whitespace-pre-line leading-7 text-slate-600">
                                {
                                  notification.message
                                }
                              </p>
                            )}

                            <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                              <p className="text-xs text-slate-400">
                                {formatDate(
                                  notification.created_at
                                )}
                              </p>

                              {isUnread && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    markAsRead(
                                      notification.id
                                    )
                                  }
                                  disabled={
                                    markingId ===
                                    notification.id
                                  }
                                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  <svg
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                  >
                                    <path d="m5 12 4 4L19 6" />
                                  </svg>

                                  {markingId ===
                                  notification.id
                                    ? "جاري التحديث..."
                                    : "تحديد كمقروء"}
                                </button>
                              )}

                              {!isUnread && (
                                <span className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600">
                                  <svg
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                  >
                                    <path d="m5 12 4 4L19 6" />
                                  </svg>

                                  تمت القراءة
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                }
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

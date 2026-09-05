"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";

type Notification = {
  id: string;
  title: string | null;
  message: string | null;
  is_read: boolean | null;
  created_at: string | null;
};

function Icon({
  type,
  className = "h-5 w-5",
}: {
  type:
    | "dashboard"
    | "applications"
    | "opportunities"
    | "notifications"
    | "arrow"
    | "bell"
    | "check";
  className?: string;
}) {
  if (type === "dashboard") {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    );
  }

  if (type === "applications") {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 8h8" />
        <path d="M8 12h8" />
        <path d="M8 16h5" />
      </svg>
    );
  }

  if (type === "opportunities") {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="4" y="6" width="16" height="14" rx="2" />
        <path d="M8 6V4h8v2" />
        <path d="M8 11h8" />
        <path d="M8 15h5" />
      </svg>
    );
  }

  if (type === "notifications" || type === "bell") {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </svg>
    );
  }

  if (type === "check") {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="m5 12 4 4L19 6" />
      </svg>
    );
  }

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export default function GraduateNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadNotifications = useCallback(async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("Get current user error:", userError);

        setErrorMessage(
          "تعذر التحقق من حسابك. يرجى تسجيل الدخول مرة أخرى."
        );

        return;
      }

      if (!user) {
        setErrorMessage(
          "يجب تسجيل الدخول للوصول إلى الإشعارات."
        );

        return;
      }

      const { data, error } = await supabase
        .from("notifications")
        .select(
          "id, title, message, is_read, created_at"
        )
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error(
          "Graduate notifications error:",
          error
        );

        setErrorMessage(
          "تعذر تحميل الإشعارات حاليًا. يرجى المحاولة مرة أخرى."
        );

        return;
      }

      const loadedNotifications =
        (data ?? []) as Notification[];

      setNotifications(loadedNotifications);

      /*
       * نحاول تحويل الإشعارات غير المقروءة
       * إلى مقروءة بعد عرضها.
       *
       * إذا فشل التحديث في قاعدة البيانات،
       * لا نمنع المستخدم من رؤية الإشعارات.
       */
      const unreadIds = loadedNotifications
        .filter(
          (notification) =>
            notification.is_read === false
        )
        .map(
          (notification) =>
            notification.id
        );

      if (unreadIds.length > 0) {
        const { error: readError } = await supabase
          .from("notifications")
          .update({
            is_read: true,
          })
          .in("id", unreadIds)
          .eq("user_id", user.id);

        if (readError) {
          console.error(
            "Mark notifications as read error:",
            readError
          );
        } else {
          setNotifications((current) =>
            current.map((notification) =>
              unreadIds.includes(
                notification.id
              )
                ? {
                    ...notification,
                    is_read: true,
                  }
                : notification
            )
          );
        }
      }
    } catch (error) {
      console.error(
        "Load graduate notifications error:",
        error
      );

      setErrorMessage(
        "حدث خطأ غير متوقع أثناء تحميل الإشعارات."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  function formatDate(date: string | null) {
    if (!date) return "";

    try {
      return new Date(date).toLocaleString(
        "ar-SD",
        {
          dateStyle: "medium",
          timeStyle: "short",
        }
      );
    } catch {
      return "";
    }
  }

  const totalNotifications =
    notifications.length;

  /*
   * ملاحظة:
   * بما أننا نحول الإشعارات إلى مقروءة
   * بعد تحميلها، ستكون القيمة غالبًا 0
   * بعد نجاح العملية.
   */
  const unreadNotifications =
    notifications.filter(
      (notification) =>
        notification.is_read === false
    ).length;

  if (loading) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-slate-100"
      >
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg ring-1 ring-slate-200">
              <div className="h-7 w-7 animate-spin rounded-full border-4 border-blue-100 border-t-blue-700" />
            </div>

            <p className="mt-5 font-bold text-slate-600">
              جاري تحميل الإشعارات...
            </p>

            <p className="mt-1 text-sm text-slate-400">
              يرجى الانتظار قليلًا
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (errorMessage) {
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
              <path d="M10.3 3.6 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7 0 0 0 0-1.7-3L13.7 3.6a2 2 0 0 0-3.4 0Z" />
            </svg>
          </div>

          <h1 className="mt-5 text-2xl font-extrabold text-slate-900">
            تعذر فتح الإشعارات
          </h1>

          <p className="mt-3 leading-7 text-slate-600">
            {errorMessage}
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={loadNotifications}
              className="rounded-xl bg-blue-700 px-6 py-3 font-bold text-white transition hover:bg-blue-800"
            >
              المحاولة مرة أخرى
            </button>

            <Link
              href="/dashboard/graduate"
              className="rounded-xl border border-slate-200 px-6 py-3 font-bold text-slate-700 transition hover:bg-slate-50"
            >
              العودة إلى لوحة التحكم
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
          {/* Brand */}
          <Link
            href="/dashboard/graduate"
            className="flex items-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-700 text-white shadow-md">
              <svg
                viewBox="0 0 64 64"
                className="h-7 w-7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 43C18 23 46 23 56 43"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                <path
                  d="M8 43H56"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                <path
                  d="M18 43V34M32 43V29M46 43V34"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div>
              <h1 className="text-xl font-extrabold text-slate-900">
                جسر
              </h1>

              <p className="text-xs text-slate-500">
                لوحة الخريج
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/graduate"
              title="لوحة التحكم"
              className="rounded-xl border border-slate-200 bg-white p-3 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              <Icon type="dashboard" />
            </Link>

            <Link
              href="/dashboard/graduate/applications"
              title="طلبات التقديم"
              className="rounded-xl border border-slate-200 bg-white p-3 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              <Icon type="applications" />
            </Link>

            <Link
              href="/opportunities"
              className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:flex"
            >
              <Icon type="opportunities" />
              استعراض الفرص
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-l from-blue-800 via-blue-700 to-indigo-700 p-6 text-white shadow-xl sm:p-8">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10" />

          <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-white/5" />

          <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
                  <Icon
                    type="notifications"
                    className="h-6 w-6"
                  />
                </div>

                <span className="text-sm font-semibold text-blue-100">
                  لوحة الخريج
                </span>
              </div>

              <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl">
                الإشعارات
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
                تابع آخر التحديثات المتعلقة بطلبات
                التقديم والفرص التي تهمك على منصة جسر.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3 rounded-2xl bg-white/10 px-5 py-4 ring-1 ring-white/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-blue-700">
                <Icon type="bell" />
              </div>

              <div>
                <p className="text-xs text-blue-100">
                  إجمالي الإشعارات
                </p>

                <p className="mt-1 text-2xl font-extrabold">
                  {totalNotifications}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-8 grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  إجمالي الإشعارات
                </p>

                <p className="mt-2 text-3xl font-extrabold text-slate-900">
                  {totalNotifications}
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                <Icon type="notifications" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  غير المقروءة
                </p>

                <p className="mt-2 text-3xl font-extrabold text-slate-900">
                  {unreadNotifications}
                </p>
              </div>

              <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                <Icon type="bell" />
              </div>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="border-b border-slate-100 p-6 sm:p-7">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  آخر الإشعارات
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  جميع التنبيهات والتحديثات المرتبطة بحسابك.
                </p>
              </div>

              <Link
                href="/dashboard/graduate/applications"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                طلبات التقديم
                <Icon type="arrow" />
              </Link>
            </div>
          </div>

          {notifications.length === 0 ? (
            <div className="p-10 text-center sm:p-14">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-700">
                <Icon
                  type="notifications"
                  className="h-9 w-9"
                />
              </div>

              <h3 className="mt-6 text-xl font-extrabold text-slate-900">
                لا توجد إشعارات حاليًا
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
                ستظهر هنا التحديثات المتعلقة بطلبات
                التقديم والفرص الجديدة وأي معلومات مهمة
                تخص حسابك.
              </p>

              <Link
                href="/opportunities"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3 font-bold text-white shadow-md transition hover:bg-blue-800"
              >
                <Icon type="opportunities" />
                استعراض الفرص
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {notifications.map(
                (notification) => {
                  const isUnread =
                    notification.is_read === false;

                  return (
                    <article
                      key={notification.id}
                      className={`p-5 transition sm:p-6 ${
                        isUnread
                          ? "bg-blue-50/40"
                          : "bg-white hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div
                          className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                            isUnread
                              ? "bg-blue-700 text-white shadow-md"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          <Icon
                            type="notifications"
                            className="h-6 w-6"
                          />

                          {isUnread && (
                            <span className="absolute -left-1 -top-1 h-3 w-3 rounded-full bg-blue-600 ring-2 ring-white" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-extrabold text-slate-900">
                                {notification.title ||
                                  "إشعار جديد"}
                              </h3>

                              {isUnread && (
                                <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-bold text-blue-700">
                                  جديد
                                </span>
                              )}
                            </div>

                            <time className="shrink-0 text-xs text-slate-400">
                              {formatDate(
                                notification.created_at
                              )}
                            </time>
                          </div>

                          <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
                            {notification.message ||
                              "لديك إشعار جديد من منصة جسر."}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                }
              )}
            </div>
          )}
        </section>

        {/* Quick Links */}
        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          <Link
            href="/dashboard/graduate"
            className="group flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:bg-blue-50 hover:ring-blue-100"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-700 transition group-hover:bg-white">
                <Icon type="dashboard" />
              </div>

              <div>
                <p className="font-bold text-slate-800">
                  لوحة التحكم
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  الصفحة الرئيسية
                </p>
              </div>
            </div>

            <Icon
              type="arrow"
              className="h-4 w-4 text-slate-400 transition group-hover:text-blue-700"
            />
          </Link>

          <Link
            href="/dashboard/graduate/applications"
            className="group flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:bg-blue-50 hover:ring-blue-100"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-indigo-50 p-3 text-indigo-700 transition group-hover:bg-white">
                <Icon type="applications" />
              </div>

              <div>
                <p className="font-bold text-slate-800">
                  طلبات التقديم
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  متابعة طلباتك
                </p>
              </div>
            </div>

            <Icon
              type="arrow"
              className="h-4 w-4 text-slate-400 transition group-hover:text-blue-700"
            />
          </Link>

          <Link
            href="/opportunities"
            className="group flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:bg-blue-50 hover:ring-blue-100"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-sky-50 p-3 text-sky-700 transition group-hover:bg-white">
                <Icon type="opportunities" />
              </div>

              <div>
                <p className="font-bold text-slate-800">
                  استعراض الفرص
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  اكتشف فرصًا جديدة
                </p>
              </div>
            </div>

            <Icon
              type="arrow"
              className="h-4 w-4 text-slate-400 transition group-hover:text-blue-700"
            />
          </Link>
        </section>
      </div>
    </main>
  );
}

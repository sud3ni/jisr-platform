"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";

type Notification = {
  id: string;
  user_id: string;
  title: string;
  message?: string | null;
  is_read: boolean;
  created_at: string;
};

type Institution = {
  id: string;
  name?: string | null;
};

function getNotificationType(title: string) {
  if (
    title.includes("طلب") ||
    title.includes("تقديم") ||
    title.includes("متقدم")
  ) {
    return {
      label: "طلبات التقديم",
      className: "bg-indigo-50 text-indigo-700",
    };
  }

  if (title.includes("فرصة")) {
    return {
      label: "الفرص",
      className: "bg-blue-50 text-blue-700",
    };
  }

  return {
    label: "تنبيه",
    className: "bg-slate-100 text-slate-700",
  };
}

function formatDate(date: string) {
  return new Date(date).toLocaleString("ar-EG", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function NotificationIcon() {
  return (
    <svg
      className="h-6 w-6"
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

function ArrowIcon() {
  return (
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
  );
}

function ClockIcon() {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export default function InstitutionNotificationsPage() {
  const [notifications, setNotifications] = useState<
    Notification[]
  >([]);

  const [institution, setInstitution] =
    useState<Institution | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
    setLoading(true);
    setError("");

    /*
     * الحصول على المستخدم من جلسة Supabase
     * الموجودة في المتصفح.
     */

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setError("انتهت جلسة تسجيل الدخول. يرجى تسجيل الدخول مرة أخرى.");
      setLoading(false);
      return;
    }

    /*
     * التأكد من أن الحساب مؤسسة.
     */

    const {
      data: institutionData,
      error: institutionError,
    } = await supabase
      .from("institutions")
      .select("id,name")
      .eq("id", user.id)
      .maybeSingle();

    if (institutionError) {
      console.error(
        "Institution error:",
        institutionError
      );

      setError("تعذر تحميل بيانات المؤسسة.");
      setLoading(false);
      return;
    }

    if (!institutionData) {
      setError(
        "لا يوجد حساب مؤسسة مرتبط بهذا المستخدم."
      );
      setLoading(false);
      return;
    }

    setInstitution(institutionData);

    /*
     * =====================================================
     * جلب إشعارات المؤسسة الحالية فقط
     * =====================================================
     *
     * الشرط المهم:
     *
     * .eq("user_id", user.id)
     *
     * لذلك لن يتم جلب إشعارات:
     * - الإدارة
     * - الخريجين
     * - الطلاب
     * - أي مستخدم آخر
     */

    const {
      data: notificationData,
      error: notificationError,
    } = await supabase
      .from("notifications")
      .select(
        "id,user_id,title,message,is_read,created_at"
      )
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      });

    if (notificationError) {
      console.error(
        "Notifications error:",
        notificationError
      );

      setError(
        "تعذر تحميل إشعارات المؤسسة."
      );

      setLoading(false);
      return;
    }

    const list =
      (notificationData || []) as Notification[];

    setNotifications(list);

    /*
     * تعليم إشعارات المؤسسة فقط كمقروءة.
     */

    const unreadIds = list
      .filter(
        (notification) =>
          !notification.is_read
      )
      .map(
        (notification) =>
          notification.id
      );

    if (unreadIds.length > 0) {
      const { error: updateError } =
        await supabase
          .from("notifications")
          .update({
            is_read: true,
          })
          .in("id", unreadIds)
          .eq("user_id", user.id);

      if (updateError) {
        console.error(
          "Notification update error:",
          updateError
        );
      } else {
        /*
         * تحديث الحالة محليًا حتى تظهر
         * الإشعارات كمقروءة مباشرة.
         */

        setNotifications((current) =>
          current.map((notification) => ({
            ...notification,
            is_read: true,
          }))
        );
      }
    }

    setLoading(false);
  }

  /*
   * -----------------------------------------------------
   * Loading
   * -----------------------------------------------------
   */

  if (loading) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-slate-100"
      >
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="text-center">
            <div className="mx-auto h-11 w-11 animate-spin rounded-full border-4 border-blue-100 border-t-blue-700" />

            <p className="mt-5 font-semibold text-slate-600">
              جاري تحميل الإشعارات...
            </p>
          </div>
        </div>
      </main>
    );
  }

  /*
   * -----------------------------------------------------
   * Error
   * -----------------------------------------------------
   */

  if (error) {
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
            تعذر فتح الإشعارات
          </h1>

          <p className="mt-3 leading-7 text-slate-600">
            {error}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/dashboard/institution"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-50"
            >
              العودة للوحة التحكم
            </Link>

            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-xl bg-blue-700 px-5 py-3 font-bold text-white transition hover:bg-blue-800"
            >
              تسجيل الدخول
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const unreadCount = notifications.filter(
    (notification) =>
      !notification.is_read
  ).length;

  /*
   * -----------------------------------------------------
   * Main UI
   * -----------------------------------------------------
   */

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-100"
    >
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-700 text-white shadow-md">
              <NotificationIcon />
            </div>

            <div>
              <p className="text-xs font-bold text-blue-700">
                جسر
              </p>

              <h1 className="text-xl font-extrabold text-slate-900">
                الإشعارات
              </h1>
            </div>
          </div>

          <Link
            href="/dashboard/institution"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            <ArrowIcon />
            العودة للوحة التحكم
          </Link>
        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-l from-blue-800 via-blue-700 to-indigo-700 p-6 text-white shadow-xl sm:p-8">
          <p className="text-sm font-semibold text-blue-100">
            مركز التنبيهات
          </p>

          <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
            {institution?.name || "مؤسستك"}
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-blue-100">
            تابع آخر التنبيهات والتحديثات المتعلقة بحساب
            المؤسسة والفرص وطلبات التقديم.
          </p>
        </section>

        {/* Statistics */}
        <section className="mb-8 grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  إجمالي الإشعارات
                </p>

                <p className="mt-2 text-3xl font-extrabold text-slate-900">
                  {notifications.length}
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                <NotificationIcon />
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  غير المقروءة
                </p>

                <p className="mt-2 text-3xl font-extrabold text-slate-900">
                  {unreadCount}
                </p>
              </div>

              <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                <ClockIcon />
              </div>
            </div>
          </div>
        </section>

        {/* Empty state */}
        {notifications.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-200">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
              <NotificationIcon />
            </div>

            <h2 className="mt-5 text-xl font-extrabold text-slate-900">
              لا توجد إشعارات حاليًا
            </h2>

            <p className="mx-auto mt-2 max-w-md leading-7 text-slate-500">
              ستظهر هنا الإشعارات المتعلقة بحساب مؤسستك.
            </p>

            <Link
              href="/dashboard/institution"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-bold text-white transition hover:bg-blue-800"
            >
              العودة للوحة التحكم
              <ArrowIcon />
            </Link>
          </div>
        ) : (
          /* Notifications list */
          <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
            {notifications.map(
              (notification, index) => {
                const type =
                  getNotificationType(
                    notification.title
                  );

                return (
                  <article
                    key={notification.id}
                    className={`p-6 transition hover:bg-slate-50 ${
                      index !==
                      notifications.length - 1
                        ? "border-b border-slate-100"
                        : ""
                    }`}
                  >
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                        <NotificationIcon />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h2 className="text-lg font-extrabold text-slate-900">
                                {notification.title}
                              </h2>

                              <span
                                className={`rounded-full px-3 py-1 text-xs font-bold ${type.className}`}
                              >
                                {type.label}
                              </span>
                            </div>

                            {notification.message && (
                              <p className="mt-3 leading-7 text-slate-600">
                                {notification.message}
                              </p>
                            )}
                          </div>

                          <time className="shrink-0 text-sm text-slate-400">
                            {formatDate(
                              notification.created_at
                            )}
                          </time>
                        </div>

                        <div className="mt-4">
                          <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
                            تمت القراءة
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              }
            )}
          </div>
        )}
      </div>
    </main>
  );
}

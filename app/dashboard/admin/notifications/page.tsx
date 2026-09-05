import Link from "next/link";
import { supabaseServer } from "@/lib/supabase-server";
import { createSupabaseServerClient } from "@/lib/supabase-server-auth";

function BellIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function ClipboardIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4V3h6v1" />
      <path d="M9 10h6" />
      <path d="M9 14h6" />
    </svg>
  );
}

function BuildingIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16" />
      <path d="M2 21h20" />
      <path d="M8 7h2" />
      <path d="M14 7h2" />
      <path d="M8 11h2" />
      <path d="M14 11h2" />
      <path d="M8 15h2" />
      <path d="M14 15h2" />
      <path d="M10 21v-3h4v3" />
    </svg>
  );
}

function BriefcaseIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
      <path d="M10 12v2h4v-2" />
    </svg>
  );
}

function CheckIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function ArrowIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function LockIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function AlertIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.3 3.8 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function getNotificationType(type: string | null) {
  switch (type) {
    case "application":
      return {
        label: "طلب تقديم",
        icon: ClipboardIcon,
        iconClass: "bg-blue-50 text-blue-600",
        badgeClass: "bg-blue-50 text-blue-700",
      };

    case "institution":
      return {
        label: "مؤسسة",
        icon: BuildingIcon,
        iconClass: "bg-violet-50 text-violet-600",
        badgeClass: "bg-violet-50 text-violet-700",
      };

    case "opportunity":
      return {
        label: "فرصة",
        icon: BriefcaseIcon,
        iconClass: "bg-emerald-50 text-emerald-600",
        badgeClass: "bg-emerald-50 text-emerald-700",
      };

    default:
      return {
        label: "إشعار",
        icon: BellIcon,
        iconClass: "bg-slate-100 text-slate-600",
        badgeClass: "bg-slate-100 text-slate-700",
      };
  }
}

function formatDate(date: string | null) {
  if (!date) {
    return "-";
  }

  return new Date(date).toLocaleString("ar-EG", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function AdminNotificationsPage() {
  const authSupabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await authSupabase.auth.getUser();

  if (!user) {
    return (
      <main
        dir="rtl"
        className="flex min-h-[70vh] items-center justify-center p-6"
      >
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <LockIcon className="h-8 w-8" />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-slate-900">
            تسجيل الدخول مطلوب
          </h1>

          <p className="mt-3 leading-7 text-slate-500">
            يجب تسجيل الدخول للوصول إلى إشعارات لوحة الإدارة.
          </p>

          <Link
            href="/login"
            className="mt-7 inline-flex w-full items-center justify-center rounded-xl bg-blue-700 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-800"
          >
            تسجيل الدخول
          </Link>
        </div>
      </main>
    );
  }

  const { data: notifications, error } = await supabaseServer
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  const totalCount = notifications?.length || 0;

  const unreadCount =
    notifications?.filter(
      (notification: any) => !notification.is_read
    ).length || 0;

  const readCount = totalCount - unreadCount;

  return (
    <main
      dir="rtl"
      className="min-h-screen space-y-7 bg-slate-50/60"
    >
      {/* رأس الصفحة */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <BellIcon className="h-7 w-7" />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                الإشعارات
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                متابعة آخر التنبيهات والمستجدات في منصة جسر.
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/admin"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            <ArrowIcon className="h-4 w-4 rotate-180" />
            لوحة الإدارة
          </Link>
        </div>
      </section>

      {/* الإحصائيات */}
      <section className="grid gap-5 md:grid-cols-3">

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                إجمالي الإشعارات
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {totalCount}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <BellIcon />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                غير المقروءة
              </p>

              <p className="mt-2 text-3xl font-bold text-blue-700">
                {unreadCount}
              </p>
            </div>

            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <BellIcon />

              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-blue-600" />
              )}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                المقروءة
              </p>

              <p className="mt-2 text-3xl font-bold text-emerald-600">
                {readCount}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckIcon className="h-6 w-6" />
            </div>
          </div>
        </div>

      </section>

      {/* إشعارات جديدة */}
      {unreadCount > 0 && (
        <section className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
              <BellIcon className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-bold text-blue-900">
                لديك إشعارات جديدة
              </h2>

              <p className="mt-1 text-sm leading-6 text-blue-700">
                لديك حاليًا{" "}
                <strong>{unreadCount}</strong>{" "}
                إشعار غير مقروء يحتاج إلى المراجعة.
              </p>
            </div>

          </div>
        </section>
      )}

      {/* الخطأ */}
      {error && (
        <section className="rounded-2xl border border-red-200 bg-red-50 p-5">
          <div className="flex items-start gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <AlertIcon />
            </div>

            <div>
              <h2 className="font-bold text-red-800">
                تعذر تحميل الإشعارات
              </h2>

              <p className="mt-1 text-sm text-red-700">
                حدث خطأ أثناء الاتصال بقاعدة البيانات.
              </p>

              <p className="mt-2 break-all text-xs text-red-600">
                {error.message}
              </p>
            </div>

          </div>
        </section>
      )}

      {/* قائمة الإشعارات */}
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-6 py-5 md:px-8">
          <div className="flex items-center justify-between gap-4">

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                آخر الإشعارات
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                جميع الإشعارات الخاصة بحساب المدير.
              </p>
            </div>

            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
              {totalCount} إشعار
            </span>

          </div>
        </div>

        {!notifications?.length ? (
          <div className="px-6 py-16 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <BellIcon className="h-8 w-8" />
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-800">
              لا توجد إشعارات
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500">
              لا توجد إشعارات مسجلة حاليًا. ستظهر التنبيهات الجديدة هنا
              عند حدوث نشاط يحتاج إلى انتباه المدير.
            </p>

          </div>
        ) : (
          <div>
            {notifications.map((notification: any) => {
              const type = getNotificationType(
                notification.type
              );

              const Icon = type.icon;

              return (
                <article
                  key={notification.id}
                  className={`border-b border-slate-100 px-6 py-6 transition last:border-b-0 md:px-8 ${
                    notification.is_read
                      ? "bg-white hover:bg-slate-50"
                      : "bg-blue-50/40 hover:bg-blue-50"
                  }`}
                >
                  <div className="flex gap-4">

                    {/* أيقونة الإشعار */}
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${type.iconClass}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <div className="min-w-0 flex-1">

                      {/* العنوان والتاريخ */}
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                        <div className="flex flex-wrap items-center gap-2">

                          <h3 className="text-base font-bold text-slate-900 md:text-lg">
                            {notification.title ||
                              "إشعار جديد"}
                          </h3>

                          {!notification.is_read && (
                            <span className="rounded-full bg-blue-600 px-2.5 py-1 text-[11px] font-bold text-white">
                              جديد
                            </span>
                          )}

                        </div>

                        <time className="shrink-0 text-xs text-slate-400 md:text-sm">
                          {formatDate(
                            notification.created_at
                          )}
                        </time>

                      </div>

                      {/* النوع */}
                      <div className="mt-3">
                        <span
                          className={`inline-flex rounded-lg px-3 py-1 text-xs font-semibold ${type.badgeClass}`}
                        >
                          {type.label}
                        </span>
                      </div>

                      {/* الرسالة */}
                      {notification.message && (
                        <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600 md:text-base">
                          {notification.message}
                        </p>
                      )}

                      {/* حالة القراءة */}
                      <div className="mt-4 flex items-center gap-2 text-xs">

                        {notification.is_read ? (
                          <>
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                              <CheckIcon className="h-3.5 w-3.5" />
                            </span>

                            <span className="font-medium text-emerald-700">
                              تمت القراءة
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="h-2 w-2 rounded-full bg-blue-600" />

                            <span className="font-medium text-blue-700">
                              غير مقروء
                            </span>
                          </>
                        )}

                      </div>

                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </section>
    </main>
  );
}

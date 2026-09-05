import Link from "next/link";
import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAuthServer } from "@/lib/supabase-auth-server";

function BridgeLogo({
  className = "h-9 w-9",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
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
        d="M18 43V34"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="M32 43V29"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="M46 43V34"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
      <path d="M10 12v2h4v-2" />
    </svg>
  );
}

function GraduationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-5 9 5-9 5-9-5Z" />
      <path d="M7 11.5V16c2.8 2 7.2 2 10 0v-4.5" />
      <path d="M21 10v6" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.2 2.7-5 6-5s6 1.8 6 5" />
      <path d="M16 5.5a3 3 0 0 1 0 5.8" />
      <path d="M18 15c1.8.6 3 2 3 4" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17" />
      <path d="M16 9h3a1 1 0 0 1 1 1v11" />
      <path d="M8 7h4M8 11h4M8 15h4" />
      <path d="M9 21v-3h2v3" />
      <path d="M3 21h18" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M16 2v4M8 2v4M3 9h18" />
    </svg>
  );
}

function MoneyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M15 8.5c-.7-.7-1.7-1-3-1-1.7 0-3 .8-3 2s1.1 1.8 3 2c1.9.2 3 .9 3 2.1s-1.3 2-3 2c-1.3 0-2.4-.4-3.1-1.1" />
      <path d="M12 6v12" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 12H5" />
      <path d="m11 18-6-6 6-6" />
    </svg>
  );
}

function OpportunityIcon({
  type,
}: {
  type?: string | null;
}) {
  if (type === "training") {
    return <GraduationIcon />;
  }

  if (type === "volunteer") {
    return <UsersIcon />;
  }

  if (type === "cooperation") {
    return <BuildingIcon />;
  }

  return <BriefcaseIcon />;
}

function opportunityTypeLabel(
  type?: string | null
) {
  if (type === "training") return "تدريب";
  if (type === "job") return "وظيفة";
  if (type === "volunteer") return "تطوع";
  if (type === "cooperation") return "فرصة تعاون";

  return type || "فرصة";
}

function formatDate(value?: string | null) {
  if (!value) return "غير محدد";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("ar-SD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function getDashboardPath(
  role?: string | null
) {
  if (role === "admin") {
    return "/dashboard/admin";
  }

  if (role === "institution") {
    return "/dashboard/institution";
  }

  if (role === "graduate") {
    return "/dashboard/graduate";
  }

  if (role === "student") {
    return "/dashboard/student";
  }

  return "/dashboard";
}

export default async function OpportunityDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  /*
   * ================================
   * قراءة جلسة المستخدم
   * ================================
   */

  const supabaseAuth =
    await supabaseAuthServer();

  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  let userRole: string | null = null;

  if (user) {
    const { data: profile } =
      await supabaseServer
        .from("users")
        .select("role,status")
        .eq("id", user.id)
        .maybeSingle();

    if (
      profile &&
      profile.status === "active"
    ) {
      userRole = profile.role;
    }
  }

  const { data: opportunity, error } =
    await supabaseServer
      .from("opportunities")
      .select("*")
      .eq("id", id)
      .single();

  if (error || !opportunity) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-10"
      >
        <div className="mx-auto flex min-h-[80vh] max-w-4xl items-center justify-center">
          <div className="w-full rounded-3xl bg-white p-8 text-center shadow-2xl sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <BriefcaseIcon />
            </div>

            <h1 className="mt-6 text-3xl font-extrabold text-slate-900">
              الفرصة غير موجودة
            </h1>

            <p className="mt-3 leading-7 text-slate-500">
              لم نتمكن من العثور على الفرصة المطلوبة.
              ربما تم حذفها أو لم تعد متاحة.
            </p>

            <Link
              href="/opportunities"
              className="mt-8 inline-flex items-center gap-3 rounded-xl bg-blue-700 px-6 py-3.5 font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
            >
              <BackIcon />
              العودة إلى صفحة الفرص
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const opportunityType =
    opportunityTypeLabel(
      opportunity.opportunity_type
    );

  const dashboardPath =
    getDashboardPath(userRole);

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900"
    >
      {/* ================= HEADER ================= */}

      <header className="border-b border-slate-200/70 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-lg shadow-blue-700/20">
              <BridgeLogo className="h-7 w-7" />
            </div>

            <div>
              <h1 className="text-xl font-extrabold text-slate-900">
                جسر
              </h1>

              <p className="text-xs text-slate-500">
                منصة الفرص
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className="font-semibold text-slate-600 transition hover:text-blue-700"
            >
              الرئيسية
            </Link>

            <Link
              href="/opportunities"
              className="font-semibold text-blue-700"
            >
              الفرص
            </Link>

            {userRole ? (
              <>
                <Link
                  href={dashboardPath}
                  className="font-semibold text-slate-600 transition hover:text-blue-700"
                >
                  لوحة التحكم
                </Link>

                <Link
                  href="/login"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-bold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  تسجيل الخروج
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="font-semibold text-slate-600 transition hover:text-blue-700"
                >
                  تسجيل الدخول
                </Link>

                <Link
                  href="/register"
                  className="rounded-xl bg-blue-700 px-4 py-2.5 font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
                >
                  إنشاء حساب
                </Link>
              </>
            )}
          </nav>

          <div className="md:hidden">
            <Link
              href={userRole ? dashboardPath : "/login"}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-700"
            >
              {userRole ? (
                "لوحة التحكم"
              ) : (
                <>
                  <BackIcon />
                  تسجيل الدخول
                </>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />

        <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-white/5" />

        <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">

          <Link
            href="/opportunities"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-100 transition hover:text-white"
          >
            <BackIcon />
            العودة إلى جميع الفرص
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-center">

            <div>
              <div className="flex flex-wrap items-center gap-3">

                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold text-white backdrop-blur">
                  <OpportunityIcon
                    type={
                      opportunity.opportunity_type
                    }
                  />

                  {opportunityType}
                </span>

                {opportunity.status && (
                  <span className="rounded-full bg-emerald-400/15 px-4 py-2 text-sm font-bold text-emerald-100">
                    فرصة متاحة
                  </span>
                )}

              </div>

              <h1 className="mt-6 max-w-4xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                {opportunity.title}
              </h1>

              {opportunity.institution_name && (
                <p className="mt-5 text-lg text-blue-100">
                  مقدمة من{" "}
                  <span className="font-bold text-white">
                    {opportunity.institution_name}
                  </span>
                </p>
              )}
            </div>

            <div className="hidden rounded-3xl border border-white/15 bg-white/10 p-6 text-center backdrop-blur-xl lg:block">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-blue-700 shadow-xl">
                <OpportunityIcon
                  type={
                    opportunity.opportunity_type
                  }
                />
              </div>

              <p className="mt-5 text-sm font-semibold text-blue-100">
                نوع الفرصة
              </p>

              <p className="mt-1 text-xl font-extrabold">
                {opportunityType}
              </p>

            </div>

          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">

        <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start">

          {/* ================= MAIN ================= */}

          <div className="space-y-8">

            {/* معلومات الفرصة */}

            <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-100 sm:p-8">

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <BriefcaseIcon />
                </div>

                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    معلومات الفرصة
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    أهم التفاصيل المتعلقة بهذه الفرصة
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                  <div className="flex items-center gap-3 text-blue-700">
                    <LocationIcon />

                    <span className="text-sm font-bold">
                      الموقع
                    </span>
                  </div>

                  <p className="mt-3 font-semibold text-slate-800">
                    {[
                      opportunity.city,
                      opportunity.state,
                    ]
                      .filter(Boolean)
                      .join("، ") ||
                      "غير محدد"}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                  <div className="flex items-center gap-3 text-blue-700">
                    <ClockIcon />

                    <span className="text-sm font-bold">
                      مدة الفرصة
                    </span>
                  </div>

                  <p className="mt-3 font-semibold text-slate-800">
                    {opportunity.duration ||
                      "غير محدد"}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                  <div className="flex items-center gap-3 text-blue-700">
                    <MoneyIcon />

                    <span className="text-sm font-bold">
                      الراتب / المقابل
                    </span>
                  </div>

                  <p className="mt-3 font-semibold text-slate-800">
                    {opportunity.salary ||
                      "غير محدد"}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                  <div className="flex items-center gap-3 text-blue-700">
                    <CalendarIcon />

                    <span className="text-sm font-bold">
                      آخر موعد للتقديم
                    </span>
                  </div>

                  <p className="mt-3 font-semibold text-slate-800">
                    {formatDate(
                      opportunity.deadline
                    )}
                  </p>
                </div>

              </div>
            </div>

            {/* الوصف */}

            <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-100 sm:p-8">

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <BriefcaseIcon />
                </div>

                <h2 className="text-2xl font-extrabold text-slate-900">
                  وصف الفرصة
                </h2>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-6">
                <p className="whitespace-pre-line leading-8 text-slate-600">
                  {opportunity.description ||
                    "لا يوجد وصف متاح لهذه الفرصة."}
                </p>
              </div>

            </div>

            {/* المتطلبات */}

            <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-100 sm:p-8">

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <GraduationIcon />
                </div>

                <h2 className="text-2xl font-extrabold text-slate-900">
                  المتطلبات
                </h2>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-6">
                <p className="whitespace-pre-line leading-8 text-slate-600">
                  {opportunity.requirements ||
                    "لا توجد متطلبات محددة لهذه الفرصة."}
                </p>
              </div>

            </div>

          </div>

          {/* ================= SIDEBAR ================= */}

          <aside className="lg:sticky lg:top-24">

            <div className="rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-100">

              <div className="text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <OpportunityIcon
                    type={
                      opportunity.opportunity_type
                    }
                  />
                </div>

                <h2 className="mt-5 text-xl font-extrabold text-slate-900">
                  هل هذه الفرصة مناسبة لك؟
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  إذا كانت الفرصة مناسبة لمهاراتك
                  وتخصصك، يمكنك التقديم عليها الآن.
                </p>

              </div>

              <Link
                href={`/apply/${opportunity.id}`}
                className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-blue-700 px-6 py-4 font-bold text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800"
              >
                التقديم الآن
                <ArrowIcon />
              </Link>

              <Link
                href="/opportunities"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-bold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                <BackIcon />
                استعراض فرص أخرى
              </Link>

              <div className="mt-7 border-t border-slate-100 pt-6">

                <div className="flex items-start gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                    <BuildingIcon />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-400">
                      الجهة المقدمة
                    </p>

                    <p className="mt-1 font-bold text-slate-800">
                      {opportunity.institution_name ||
                        "غير محدد"}
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* بطاقة آخر موعد */}

            <div className="mt-5 rounded-3xl bg-gradient-to-br from-blue-700 to-indigo-900 p-6 text-white shadow-xl">

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                  <CalendarIcon />
                </div>

                <div>
                  <p className="text-xs font-semibold text-blue-200">
                    آخر موعد للتقديم
                  </p>

                  <p className="mt-1 font-bold">
                    {formatDate(
                      opportunity.deadline
                    )}
                  </p>
                </div>
              </div>

            </div>

          </aside>

        </div>
      </section>

      {/* ================= FOOTER ================= */}

      <footer className="bg-slate-950 text-white">

        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

          <div className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-right">

            <Link
              href="/"
              className="flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-700">
                <BridgeLogo className="h-6 w-6" />
              </div>

              <div>
                <p className="font-extrabold">
                  جسر
                </p>

                <p className="text-xs text-slate-400">
                  منصة الفرص
                </p>
              </div>
            </Link>

            <div className="text-sm text-slate-500">
              © {new Date().getFullYear()} منصة جسر. جميع الحقوق محفوظة.
            </div>

          </div>

        </div>

      </footer>
    </main>
  );
}

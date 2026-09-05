import Link from "next/link";
import { supabaseServer } from "@/lib/supabase-server";
import ApplyForm from "./ApplyForm";

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

function OpportunityIcon({
  type,
}: {
  type?: string | null;
}) {
  if (type === "training") {
    return <GraduationIcon />;
  }

  return <BriefcaseIcon />;
}

function opportunityTypeLabel(
  type?: string | null
) {
  if (type === "training") return "تدريب";
  if (type === "job") return "وظيفة";
  if (type === "volunteer") return "تطوع";
  if (type === "cooperation") return "تعاون";

  return type || "فرصة";
}

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: opportunity, error } = await supabaseServer
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

            <h1 className="mt-6 text-3xl font-extrabold text-red-600">
              الفرصة غير موجودة
            </h1>

            <p className="mt-3 text-slate-500">
              عذرًا، لم نتمكن من العثور على هذه الفرصة.
            </p>

            <Link
              href="/opportunities"
              className="mt-7 inline-flex rounded-xl bg-blue-700 px-6 py-3.5 font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
            >
              العودة إلى صفحة الفرص
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-10"
    >
      <div className="mx-auto flex min-h-[85vh] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">

          {/* ================= الجانب التعريفي ================= */}

          <section className="relative hidden overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 p-10 text-white md:flex md:flex-col md:justify-between">

            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />

            <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-white/5" />

            <div className="absolute right-1/3 top-1/3 h-40 w-40 rounded-full bg-blue-400/10 blur-3xl" />

            <div className="relative z-10">

              {/* الشعار */}

              <div className="mb-10 flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-lg">
                  <BridgeLogo className="h-9 w-9" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold">
                    جسر
                  </h2>

                  <p className="text-sm text-blue-100">
                    منصة الفرص
                  </p>
                </div>

              </div>

              <h1 className="text-4xl font-extrabold leading-tight">
                ابدأ طريقك نحو
                <br />
                فرصتك القادمة
              </h1>

              <p className="mt-6 max-w-md text-lg leading-8 text-blue-100">
                قدم على الفرص المناسبة لك بسهولة،
                وابدأ رحلتك المهنية عبر منصة جسر.
              </p>

            </div>

            {/* معلومات الفرصة */}

            <div className="relative z-10">

              <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">

                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
                    <OpportunityIcon
                      type={opportunity.opportunity_type}
                    />
                  </div>

                  <div className="min-w-0">

                    <span className="text-xs font-semibold text-blue-200">
                      أنت تتقدم إلى
                    </span>

                    <h3 className="mt-1 line-clamp-2 text-lg font-bold">
                      {opportunity.title}
                    </h3>

                    {opportunity.institution_name && (
                      <p className="mt-2 text-sm text-blue-100">
                        {opportunity.institution_name}
                      </p>
                    )}

                  </div>

                </div>

              </div>

              <div className="mt-6 space-y-4">

                <div>
                  <h3 className="font-bold">
                    للطلاب والخريجين
                  </h3>

                  <p className="mt-1 text-sm text-blue-100">
                    قدم على الفرص التي تناسب مهاراتك وتخصصك.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold">
                    طلب تقديم بسيط
                  </h3>

                  <p className="mt-1 text-sm text-blue-100">
                    أرسل بياناتك وسيرتك الذاتية بسهولة.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold">
                    جسر بين المواهب والفرص
                  </h3>

                  <p className="mt-1 text-sm text-blue-100">
                    نساعدك على الوصول إلى الفرصة المناسبة.
                  </p>
                </div>

              </div>

            </div>

          </section>

          {/* ================= نموذج التقديم ================= */}

          <section className="p-6 sm:p-10 md:p-12">

            <div className="mx-auto max-w-xl">

              {/* شعار الهاتف */}

              <div className="mb-8 flex items-center justify-center md:hidden">

                <Link
                  href="/"
                  className="flex items-center gap-3"
                >

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-700 text-white shadow-lg shadow-blue-700/20">
                    <BridgeLogo className="h-7 w-7" />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      جسر
                    </h2>

                    <p className="text-xs text-slate-500">
                      منصة الفرص
                    </p>
                  </div>

                </Link>

              </div>

              {/* العودة */}

              <Link
                href={`/opportunities/${id}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition hover:text-blue-800 hover:underline"
              >
                ← العودة إلى تفاصيل الفرصة
              </Link>

              {/* العنوان */}

              <div className="mt-7">

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <OpportunityIcon
                      type={opportunity.opportunity_type}
                    />
                  </div>

                  <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                    {opportunityTypeLabel(
                      opportunity.opportunity_type
                    )}
                  </span>

                </div>

                <h1 className="mt-6 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                  التقديم على الفرصة
                </h1>

                <p className="mt-3 text-lg font-bold text-slate-700">
                  {opportunity.title}
                </p>

                {opportunity.institution_name && (
                  <p className="mt-1 text-sm text-slate-500">
                    {opportunity.institution_name}
                  </p>
                )}

              </div>

              {/* فاصل */}

              <div className="my-8 border-t border-slate-200" />

              {/* معلومات مختصرة */}

              <div className="mb-8 rounded-2xl border border-blue-100 bg-blue-50/60 p-5">

                <div className="flex items-start gap-3">

                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-700 text-white">
                    <BriefcaseIcon />
                  </div>

                  <div>

                    <h2 className="font-bold text-slate-900">
                      قبل إرسال الطلب
                    </h2>

                    <p className="mt-1 text-sm leading-7 text-slate-600">
                      تأكد من صحة بياناتك، وأرفق السيرة الذاتية
                      والمعلومات المطلوبة قبل إرسال طلب التقديم.
                    </p>

                  </div>

                </div>

              </div>

              {/* نموذج التقديم الحالي */}

              <ApplyForm opportunityId={id} />

              {/* العودة */}

              <div className="mt-8 border-t border-slate-200 pt-6 text-center">

                <Link
                  href={`/opportunities/${id}`}
                  className="text-sm font-semibold text-slate-500 transition hover:text-blue-700"
                >
                  العودة إلى تفاصيل الفرصة
                </Link>

              </div>

            </div>

          </section>

        </div>
      </div>
    </main>
  );
}

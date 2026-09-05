"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";

type OpportunityType =
  | "training"
  | "job"
  | "volunteer"
  | "cooperation";

type IconType =
  | "briefcase"
  | "arrow"
  | "plus"
  | "info"
  | "location"
  | "calendar"
  | "clock"
  | "money"
  | "document"
  | "check"
  | "alert";

function Icon({ type }: { type: IconType }) {
  const common = "h-5 w-5";

  if (type === "briefcase") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="3" y="6" width="18" height="14" rx="2" />
        <path d="M8 6V4.5A1.5 1.5 0 0 1 9.5 3h5A1.5 1.5 0 0 1 16 4.5V6" />
        <path d="M3 11h18" />
        <path d="M10 11v2h4v-2" />
      </svg>
    );
  }

  if (type === "arrow") {
    return (
      <svg
        className={common}
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

  if (type === "plus") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </svg>
    );
  }

  if (type === "info") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 10v6" />
        <path d="M12 7h.01" />
      </svg>
    );
  }

  if (type === "location") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    );
  }

  if (type === "calendar") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </svg>
    );
  }

  if (type === "clock") {
    return (
      <svg
        className={common}
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

  if (type === "money") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="12" cy="12" r="3" />
        <path d="M7 9h.01M17 15h.01" />
      </svg>
    );
  }

  if (type === "document") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M6 3h9l4 4v14H6z" />
        <path d="M14 3v5h5M9 13h6M9 17h6M9 9h2" />
      </svg>
    );
  }

  if (type === "check") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="m5 12 4 4L19 6" />
      </svg>
    );
  }

  if (type === "alert") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M12 3 2.8 19a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L12 3Z" />
        <path d="M12 9v4M12 17h.01" />
      </svg>
    );
  }

  return null;
}

function getToday() {
  return new Date().toISOString().split("T")[0];
}

export default function NewOpportunityPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [opportunityType, setOpportunityType] =
    useState<OpportunityType>("training");

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [duration, setDuration] = useState("");
  const [salary, setSalary] = useState("");
  const [deadline, setDeadline] = useState("");
  const [requirements, setRequirements] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (loading) return;

    setErrorMessage("");
    setSuccessMessage("");

    const cleanTitle = title.trim();
    const cleanDescription = description.trim();
    const cleanCity = city.trim();
    const cleanState = state.trim();
    const cleanDuration = duration.trim();
    const cleanSalary = salary.trim();
    const cleanRequirements = requirements.trim();

    if (cleanTitle.length < 5) {
      setErrorMessage(
        "يرجى إدخال عنوان واضح للفرصة لا يقل عن 5 أحرف."
      );
      return;
    }

    if (cleanDescription.length < 20) {
      setErrorMessage(
        "يرجى كتابة وصف واضح للفرصة لا يقل عن 20 حرفًا."
      );
      return;
    }

    if (!cleanState) {
      setErrorMessage("يرجى تحديد الولاية.");
      return;
    }

    if (!cleanCity) {
      setErrorMessage("يرجى تحديد المدينة.");
      return;
    }

    if (!cleanDuration) {
      setErrorMessage("يرجى تحديد مدة الفرصة.");
      return;
    }

    if (!deadline) {
      setErrorMessage(
        "يرجى تحديد الموعد النهائي للتقديم."
      );
      return;
    }

    if (deadline < getToday()) {
      setErrorMessage(
        "لا يمكن أن يكون الموعد النهائي في الماضي."
      );
      return;
    }

    if (!cleanRequirements) {
      setErrorMessage(
        "يرجى كتابة متطلبات الفرصة."
      );
      return;
    }

    setLoading(true);

    try {
      /*
       * ==========================================
       * 1. المستخدم الحالي
       * ==========================================
       */

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error(
          "GET CURRENT USER ERROR:",
          userError
        );

        setErrorMessage(
          "تعذر التحقق من حساب المستخدم."
        );

        return;
      }

      if (!user) {
        setErrorMessage(
          "انتهت جلسة تسجيل الدخول. يرجى تسجيل الدخول مرة أخرى."
        );

        return;
      }

      /*
       * ==========================================
       * 2. جلب المؤسسة المرتبطة بالمستخدم
       * ==========================================
       */

      const {
        data: institution,
        error: institutionError,
      } = await supabase
        .from("institutions")
        .select("id,name")
        .eq("id", user.id)
        .maybeSingle();

      if (institutionError) {
        console.error(
          "INSTITUTION ERROR:",
          institutionError
        );

        setErrorMessage(
          "تعذر تحميل بيانات المؤسسة."
        );

        return;
      }

      if (!institution) {
        setErrorMessage(
          "لا يوجد حساب مؤسسة مرتبط بهذا المستخدم."
        );

        return;
      }

      /*
       * ==========================================
       * 3. إنشاء الفرصة
       * ==========================================
       *
       * مهم:
       * لا ننشئ الإشعار من المتصفح.
       *
       * قاعدة البيانات ستنشئ إشعارات المديرين
       * تلقائيًا عن طريق Trigger عند إنشاء فرصة.
       */

      const {
        data: opportunity,
        error: opportunityError,
      } = await supabase
        .from("opportunities")
        .insert({
          institution_id: institution.id,
          institution_name: institution.name,
          title: cleanTitle,
          description: cleanDescription,
          opportunity_type: opportunityType,
          city: cleanCity,
          state: cleanState,
          duration: cleanDuration,
          salary: cleanSalary || null,
          deadline,
          requirements: cleanRequirements,
          status: "pending",
        })
        .select("id,title")
        .single();

      if (opportunityError) {
        console.error(
          "OPPORTUNITY ERROR:",
          opportunityError
        );

        setErrorMessage(
          "تعذر إنشاء الفرصة: " +
            opportunityError.message
        );

        return;
      }

      if (!opportunity) {
        setErrorMessage(
          "تم إنشاء الفرصة ولكن تعذر الحصول على بياناتها."
        );

        return;
      }

      /*
       * ==========================================
       * 4. نجاح إنشاء الفرصة
       * ==========================================
       *
       * الإشعارات لا يتم إدخالها هنا.
       *
       * Trigger الموجود في Supabase يقوم تلقائيًا
       * بإنشاء إشعار لكل مستخدم role = admin.
       */

      console.log(
        "OPPORTUNITY CREATED:",
        opportunity
      );

      setSuccessMessage(
        "تم إرسال الفرصة بنجاح إلى الإدارة للمراجعة، وسيتم إشعار المديرين تلقائيًا."
      );

      /*
       * تنظيف النموذج
       */

      setTitle("");
      setDescription("");
      setOpportunityType("training");
      setCity("");
      setState("");
      setDuration("");
      setSalary("");
      setDeadline("");
      setRequirements("");

      /*
       * الانتقال إلى لوحة المؤسسة
       * بعد عرض رسالة النجاح.
       */

      setTimeout(() => {
        router.push(
          "/dashboard/institution"
        );
      }, 1500);
    } catch (error) {
      console.error(
        "CREATE OPPORTUNITY ERROR:",
        error
      );

      setErrorMessage(
        "حدث خطأ غير متوقع أثناء إنشاء الفرصة."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-100"
    >
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-700 text-white shadow-md">
              <Icon type="briefcase" />
            </div>

            <div>
              <p className="text-xs font-bold text-blue-700">
                جسر
              </p>

              <h1 className="text-lg font-extrabold text-slate-900 sm:text-xl">
                نشر فرصة جديدة
              </h1>
            </div>
          </div>

          <Link
            href="/dashboard/institution"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            <Icon type="arrow" />

            <span className="hidden sm:inline">
              العودة للوحة التحكم
            </span>

            <span className="sm:hidden">
              العودة
            </span>
          </Link>
        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Intro */}
        <section className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-l from-blue-800 via-blue-700 to-indigo-700 p-6 text-white shadow-xl sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-100">
                إدارة الفرص
              </p>

              <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                أنشئ فرصة جديدة
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
                أضف تفاصيل الفرصة بدقة حتى يتمكن الخريجون
                من فهمها والتقديم عليها بسهولة.
              </p>
            </div>

            <div className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-white/10 sm:flex">
              <Icon type="plus" />
            </div>
          </div>
        </section>

        {/* Error */}
        {errorMessage && (
          <div className="mb-6 flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
            <div className="shrink-0">
              <Icon type="alert" />
            </div>

            <div>
              <p className="font-bold">
                تعذر نشر الفرصة
              </p>

              <p className="mt-1 text-sm leading-6">
                {errorMessage}
              </p>
            </div>
          </div>
        )}

        {/* Success */}
        {successMessage && (
          <div className="mb-6 flex gap-3 rounded-2xl border border-green-200 bg-green-50 p-5 text-green-700">
            <div className="shrink-0">
              <Icon type="check" />
            </div>

            <div>
              <p className="font-bold">
                تم بنجاح
              </p>

              <p className="mt-1 text-sm leading-6">
                {successMessage}
              </p>
            </div>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Basic information */}
          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <div className="mb-6 flex items-start gap-4 border-b border-slate-100 pb-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <Icon type="info" />
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  المعلومات الأساسية
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  المعلومات الرئيسية التي ستظهر للمتقدمين.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Title */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  عنوان الفرصة
                  <span className="mr-1 text-red-500">
                    *
                  </span>
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="مثال: مطور برمجيات متدرب"
                  maxLength={150}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

                <p className="mt-2 text-xs text-slate-400">
                  اجعل العنوان مختصرًا وواضحًا.
                </p>
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  وصف الفرصة
                  <span className="mr-1 text-red-500">
                    *
                  </span>
                </label>

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(
                      e.target.value
                    )
                  }
                  placeholder="اكتب وصفًا واضحًا للفرصة، المهام، طبيعة العمل أو التدريب..."
                  rows={6}
                  maxLength={3000}
                  className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3.5 leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

                <div className="mt-2 flex justify-between text-xs text-slate-400">
                  <span>
                    يفضل تقديم أكبر قدر ممكن من المعلومات.
                  </span>

                  <span>
                    {description.length}/3000
                  </span>
                </div>
              </div>

              {/* Type */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  نوع الفرصة
                </label>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    {
                      value: "training",
                      title: "تدريب",
                      description:
                        "فرصة تدريبية",
                    },
                    {
                      value: "job",
                      title: "وظيفة",
                      description:
                        "فرصة عمل",
                    },
                    {
                      value: "volunteer",
                      title: "تطوع",
                      description:
                        "فرصة تطوعية",
                    },
                    {
                      value: "cooperation",
                      title: "تعاون",
                      description:
                        "فرصة تعاون",
                    },
                  ].map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() =>
                        setOpportunityType(
                          item.value as OpportunityType
                        )
                      }
                      className={`rounded-xl border p-4 text-right transition ${
                        opportunityType ===
                        item.value
                          ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                          : "border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50"
                      }`}
                    >
                      <p
                        className={`font-bold ${
                          opportunityType ===
                          item.value
                            ? "text-blue-700"
                            : "text-slate-800"
                        }`}
                      >
                        {item.title}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {item.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Location */}
          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <div className="mb-6 flex items-start gap-4 border-b border-slate-100 pb-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                <Icon type="location" />
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  الموقع
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  حدد مكان تنفيذ الفرصة.
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* State */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  الولاية
                  <span className="mr-1 text-red-500">
                    *
                  </span>
                </label>

                <input
                  type="text"
                  value={state}
                  onChange={(e) =>
                    setState(e.target.value)
                  }
                  placeholder="مثال: ولاية الجزيرة"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* City */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  المدينة
                  <span className="mr-1 text-red-500">
                    *
                  </span>
                </label>

                <input
                  type="text"
                  value={city}
                  onChange={(e) =>
                    setCity(e.target.value)
                  }
                  placeholder="مثال: ود مدني"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>
          </section>

          {/* Details */}
          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <div className="mb-6 flex items-start gap-4 border-b border-slate-100 pb-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Icon type="clock" />
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  تفاصيل الفرصة
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  المدة والمقابل والموعد النهائي للتقديم.
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Duration */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  مدة الفرصة
                  <span className="mr-1 text-red-500">
                    *
                  </span>
                </label>

                <div className="relative">
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Icon type="clock" />
                  </div>

                  <input
                    type="text"
                    value={duration}
                    onChange={(e) =>
                      setDuration(
                        e.target.value
                      )
                    }
                    placeholder="مثال: 3 أشهر"
                    className="w-full rounded-xl border border-slate-200 py-3.5 pr-12 pl-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Salary */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  المقابل
                </label>

                <div className="relative">
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Icon type="money" />
                  </div>

                  <input
                    type="text"
                    value={salary}
                    onChange={(e) =>
                      setSalary(
                        e.target.value
                      )
                    }
                    placeholder="مثال: مدفوعة / غير مدفوعة / 150,000 جنيه"
                    className="w-full rounded-xl border border-slate-200 py-3.5 pr-12 pl-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Deadline */}
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  الموعد النهائي للتقديم
                  <span className="mr-1 text-red-500">
                    *
                  </span>
                </label>

                <div className="relative">
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Icon type="calendar" />
                  </div>

                  <input
                    type="date"
                    value={deadline}
                    min={getToday()}
                    onChange={(e) =>
                      setDeadline(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 py-3.5 pr-12 pl-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Requirements */}
          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <div className="mb-6 flex items-start gap-4 border-b border-slate-100 pb-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                <Icon type="document" />
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  متطلبات التقديم
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  اذكر المؤهلات والمهارات المطلوبة من المتقدمين.
                </p>
              </div>
            </div>

            <textarea
              value={requirements}
              onChange={(e) =>
                setRequirements(
                  e.target.value
                )
              }
              placeholder={`مثال:
- بكالوريوس في نظم المعلومات أو علوم الحاسوب
- معرفة جيدة بـ JavaScript
- مهارات التواصل والعمل الجماعي
- القدرة على الالتزام بمدة التدريب`}
              rows={7}
              maxLength={3000}
              className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3.5 leading-7 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

            <div className="mt-2 text-left text-xs text-slate-400">
              {requirements.length}/3000
            </div>
          </section>

          {/* Notice */}
          <div className="flex gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-blue-800">
            <div className="shrink-0 text-blue-700">
              <Icon type="info" />
            </div>

            <div>
              <p className="font-bold">
                ملاحظة مهمة
              </p>

              <p className="mt-1 text-sm leading-6 text-blue-700">
                بعد إرسال الفرصة، ستتم مراجعتها من إدارة
                منصة جسر قبل نشرها للمتقدمين، وسيتم إشعار
                المديرين تلقائيًا.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/dashboard/institution"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-bold text-slate-700 transition hover:bg-slate-50"
            >
              إلغاء
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-8 py-3.5 font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  جاري إرسال الفرصة...
                </>
              ) : (
                <>
                  <Icon type="plus" />
                  إرسال الفرصة للمراجعة
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

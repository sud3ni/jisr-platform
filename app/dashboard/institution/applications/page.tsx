"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { createNotification } from "../notifications/actions";

type ApplicationStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | string;

type Opportunity = {
  id: string;
  title: string;
  city?: string | null;
  state?: string | null;
  opportunity_type?: string | null;
};

type Application = {
  id: string;
  opportunity_id: string;
  graduate_id?: string | null;
  student_id?: string | null;
  status: ApplicationStatus;
  applicant_name?: string | null;
  applicant_email?: string | null;
  applicant_phone?: string | null;
  applicant_cv?: string | null;
  cover_letter?: string | null;
  created_at: string;
  opportunity?: Opportunity | null;
};

type UserProfile = {
  id: string;
  full_name?: string | null;
  email?: string | null;
  role?: string | null;
};

function formatDate(date: string) {
  try {
    return new Date(date).toLocaleString("ar-EG", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return date;
  }
}

function opportunityTypeLabel(type?: string | null) {
  if (type === "training") return "تدريب";
  if (type === "job") return "وظيفة";
  if (type === "volunteer") return "تطوع";
  if (type === "cooperation") return "تعاون";

  return type || "فرصة";
}

function StatusBadge({
  status,
}: {
  status: ApplicationStatus;
}) {
  if (status === "accepted") {
    return (
      <span className="inline-flex items-center rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700 ring-1 ring-emerald-100">
        🟢 تم القبول
      </span>
    );
  }

  if (status === "rejected") {
    return (
      <span className="inline-flex items-center rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-red-700 ring-1 ring-red-100">
        🔴 تم الرفض
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full bg-amber-50 px-4 py-2 text-sm font-bold text-amber-700 ring-1 ring-amber-100">
      🟡 قيد المراجعة
    </span>
  );
}

export default function InstitutionApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [profiles, setProfiles] = useState<Record<string, UserProfile>>({});

  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [filter, setFilter] = useState<
    "all" | "pending" | "accepted" | "rejected"
  >("all");

  const [message, setMessage] = useState("");

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    setLoading(true);
    setMessage("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setMessage("يجب تسجيل الدخول أولاً.");
        return;
      }

      /*
       * جلب الفرص التابعة للمؤسسة الحالية.
       */
      const {
        data: opportunities,
        error: opportunitiesError,
      } = await supabase
        .from("opportunities")
        .select(
          "id,title,city,state,opportunity_type"
        )
        .eq("institution_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (opportunitiesError) {
        console.error(
          "Load opportunities error:",
          opportunitiesError
        );

        setMessage(
          "حدث خطأ أثناء تحميل فرص المؤسسة."
        );

        return;
      }

      const opportunityList =
        opportunities || [];

      /*
       * إذا لم توجد فرص للمؤسسة،
       * فلا توجد طلبات مرتبطة بها.
       */
      if (opportunityList.length === 0) {
        setApplications([]);
        setProfiles({});
        return;
      }

      const opportunityIds =
        opportunityList.map(
          (opportunity) => opportunity.id
        );

      /*
       * جلب طلبات التقديم الخاصة بفرص المؤسسة.
       */
      const {
        data: applicationData,
        error: applicationsError,
      } = await supabase
        .from("applications")
        .select(
          `
            id,
            opportunity_id,
            graduate_id,
            student_id,
            status,
            applicant_name,
            applicant_email,
            applicant_phone,
            applicant_cv,
            cover_letter,
            created_at
          `
        )
        .in(
          "opportunity_id",
          opportunityIds
        )
        .order("created_at", {
          ascending: false,
        });

      if (applicationsError) {
        console.error(
          "Load applications error:",
          applicationsError
        );

        setMessage(
          "حدث خطأ أثناء تحميل طلبات التقديم."
        );

        return;
      }

      const opportunityMap: Record<
        string,
        Opportunity
      > = {};

      for (const opportunity of opportunityList) {
        opportunityMap[opportunity.id] =
          opportunity;
      }

      const applicationList: Application[] =
        (applicationData || []).map(
          (application: any) => ({
            ...application,
            opportunity:
              opportunityMap[
                application.opportunity_id
              ] || null,
          })
        );

      setApplications(applicationList);

      /*
       * معرفة المستخدم صاحب الطلب:
       *
       * إذا كان graduate_id موجودًا فهو خريج.
       * وإذا كان student_id موجودًا فهو طالب.
       */
      const applicantIds = Array.from(
        new Set(
          applicationList
            .map(
              (application) =>
                application.graduate_id ||
                application.student_id
            )
            .filter(Boolean) as string[]
        )
      );

      if (applicantIds.length > 0) {
        const {
          data: profileData,
          error: profilesError,
        } = await supabase
          .from("users")
          .select(
            "id,full_name,email,role"
          )
          .in("id", applicantIds);

        if (profilesError) {
          console.error(
            "Load applicant profiles error:",
            profilesError
          );
        } else {
          const profileMap: Record<
            string,
            UserProfile
          > = {};

          for (const profile of profileData || []) {
            profileMap[profile.id] =
              profile;
          }

          setProfiles(profileMap);
        }
      } else {
        setProfiles({});
      }
    } catch (error) {
      console.error(
        "Institution applications error:",
        error
      );

      setMessage(
        "حدث خطأ أثناء تحميل الصفحة."
      );
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(
    applicationId: string,
    status: "accepted" | "rejected"
  ) {
    if (updatingId) return;

    const application =
      applications.find(
        (item) =>
          item.id === applicationId
      );

    if (!application) {
      alert(
        "لم يتم العثور على طلب التقديم."
      );
      return;
    }

    if (application.status !== "pending") {
      alert(
        "تم تحديث حالة هذا الطلب مسبقًا."
      );
      return;
    }

    /*
     * تحديد صاحب الطلب:
     *
     * الطالب:
     * student_id
     *
     * الخريج:
     * graduate_id
     */
    const recipientId =
      application.graduate_id ||
      application.student_id;

    if (!recipientId) {
      alert(
        "لا يمكن إرسال الإشعار لأن معرف صاحب الطلب غير موجود."
      );
      return;
    }

    setUpdatingId(applicationId);

    try {
      /*
       * تحديث حالة الطلب.
       */
      const {
        error: updateError,
      } = await supabase
        .from("applications")
        .update({
          status,
        })
        .eq("id", applicationId);

      if (updateError) {
        console.error(
          "Update application status error:",
          updateError
        );

        alert(
          "تعذر تحديث حالة الطلب:\n" +
            updateError.message
        );

        return;
      }

      const opportunityTitle =
        application.opportunity?.title ||
        "الفرصة";

      /*
       * إرسال الإشعار إلى الطالب أو الخريج.
       */
      const notificationTitle =
        status === "accepted"
          ? "تم قبول طلبك"
          : "تم رفض طلبك";

      const notificationMessage =
        status === "accepted"
          ? `تم قبول طلبك في فرصة "${opportunityTitle}".`
          : `تم رفض طلبك في فرصة "${opportunityTitle}".`;

      try {
        await createNotification({
          userId: recipientId,
          title: notificationTitle,
          message:
            notificationMessage,
        });
      } catch (notificationError) {
        console.error(
          "Notification error:",
          notificationError
        );
      }

      /*
       * تحديث الصفحة محليًا.
       */
      setApplications((current) =>
        current.map((item) =>
          item.id === applicationId
            ? {
                ...item,
                status,
              }
            : item
        )
      );

      alert(
        status === "accepted"
          ? "تم قبول الطلب بنجاح وإرسال الإشعار."
          : "تم رفض الطلب بنجاح وإرسال الإشعار."
      );
    } catch (error) {
      console.error(
        "Update status error:",
        error
      );

      alert(
        "حدث خطأ أثناء تحديث حالة الطلب."
      );

      await loadApplications();
    } finally {
      setUpdatingId(null);
    }
  }

  const filteredApplications =
    useMemo(() => {
      if (filter === "all") {
        return applications;
      }

      return applications.filter(
        (application) =>
          application.status === filter
      );
    }, [applications, filter]);

  const totalCount =
    applications.length;

  const pendingCount =
    applications.filter(
      (application) =>
        application.status === "pending"
    ).length;

  const acceptedCount =
    applications.filter(
      (application) =>
        application.status === "accepted"
    ).length;

  const rejectedCount =
    applications.filter(
      (application) =>
        application.status === "rejected"
    ).length;

  function applicantProfile(
    application: Application
  ) {
    const id =
      application.graduate_id ||
      application.student_id;

    if (!id) return null;

    return profiles[id] || null;
  }

  function applicantType(
    application: Application
  ) {
    if (application.student_id) {
      return "طالب";
    }

    if (application.graduate_id) {
      return "خريج";
    }

    return "متقدم";
  }

  if (loading) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-slate-100"
      >
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-100 border-t-blue-700" />

            <p className="mt-4 font-semibold text-slate-600">
              جاري تحميل طلبات التقديم...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (message) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-slate-100 px-6"
      >
        <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-3xl">
            ⚠️
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            تعذر تحميل الطلبات
          </h1>

          <p className="mt-4 leading-7 text-slate-600">
            {message}
          </p>

          <button
            onClick={loadApplications}
            className="mt-6 rounded-xl bg-blue-700 px-6 py-3 font-bold text-white transition hover:bg-blue-800"
          >
            إعادة المحاولة
          </button>
        </div>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-100"
    >
      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">
              طلبات التقديم
            </h1>

            <p className="mt-2 text-slate-500">
              إدارة ومراجعة جميع الطلبات المقدمة
              على فرص مؤسستك.
            </p>
          </div>

          <Link
            href="/dashboard/institution"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            ← العودة إلى لوحة التحكم
          </Link>

        </div>

        {/* Statistics */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <p className="text-sm font-semibold text-slate-500">
              إجمالي الطلبات
            </p>

            <p className="mt-3 text-4xl font-black text-blue-700">
              {totalCount}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <p className="text-sm font-semibold text-slate-500">
              قيد المراجعة
            </p>

            <p className="mt-3 text-4xl font-black text-amber-600">
              {pendingCount}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <p className="text-sm font-semibold text-slate-500">
              المقبولون
            </p>

            <p className="mt-3 text-4xl font-black text-emerald-600">
              {acceptedCount}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <p className="text-sm font-semibold text-slate-500">
              المرفوضون
            </p>

            <p className="mt-3 text-4xl font-black text-red-600">
              {rejectedCount}
            </p>
          </div>

        </div>

        {/* Filters */}
        <div className="mb-6 overflow-x-auto rounded-2xl bg-white p-2 shadow-sm ring-1 ring-slate-100">

          <div className="flex min-w-max gap-2">

            <button
              onClick={() =>
                setFilter("all")
              }
              className={`rounded-xl px-5 py-3 text-sm font-bold transition ${
                filter === "all"
                  ? "bg-blue-700 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              الكل ({totalCount})
            </button>

            <button
              onClick={() =>
                setFilter("pending")
              }
              className={`rounded-xl px-5 py-3 text-sm font-bold transition ${
                filter === "pending"
                  ? "bg-amber-500 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              قيد المراجعة ({pendingCount})
            </button>

            <button
              onClick={() =>
                setFilter("accepted")
              }
              className={`rounded-xl px-5 py-3 text-sm font-bold transition ${
                filter === "accepted"
                  ? "bg-emerald-600 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              المقبولون ({acceptedCount})
            </button>

            <button
              onClick={() =>
                setFilter("rejected")
              }
              className={`rounded-xl px-5 py-3 text-sm font-bold transition ${
                filter === "rejected"
                  ? "bg-red-600 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              المرفوضون ({rejectedCount})
            </button>

          </div>

        </div>

        {/* Applications */}
        {filteredApplications.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-100">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-4xl">
              📭
            </div>

            <h2 className="mt-5 text-2xl font-black text-slate-800">
              لا توجد طلبات
            </h2>

            <p className="mt-3 text-slate-500">
              لا توجد طلبات تقديم ضمن التصنيف
              المحدد حاليًا.
            </p>

          </div>
        ) : (
          <div className="space-y-6">

            {filteredApplications.map(
              (application) => {
                const profile =
                  applicantProfile(
                    application
                  );

                const displayName =
                  application.applicant_name ||
                  profile?.full_name ||
                  "متقدم";

                const email =
                  application.applicant_email ||
                  profile?.email;

                const opportunity =
                  application.opportunity;

                const isUpdating =
                  updatingId ===
                  application.id;

                return (
                  <div
                    key={application.id}
                    className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100"
                  >

                    {/* Card Header */}
                    <div className="border-b border-slate-100 p-6">

                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

                        <div>

                          <div className="flex flex-wrap items-center gap-2">

                            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                              {applicantType(
                                application
                              )}
                            </span>

                            <StatusBadge
                              status={
                                application.status
                              }
                            />

                          </div>

                          <h2 className="mt-4 text-2xl font-black text-slate-900">
                            {displayName}
                          </h2>

                          <p className="mt-2 text-slate-500">
                            تقدم على فرصة:
                            {" "}
                            <span className="font-bold text-blue-700">
                              {opportunity?.title ||
                                "غير معروف"}
                            </span>
                          </p>

                        </div>

                        <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-500">
                          📅{" "}
                          {formatDate(
                            application.created_at
                          )}
                        </div>

                      </div>

                    </div>

                    {/* Applicant Information */}
                    <div className="grid gap-4 p-6 md:grid-cols-2 lg:grid-cols-4">

                      <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-xs font-bold text-slate-400">
                          البريد الإلكتروني
                        </p>

                        <p className="mt-2 break-all font-semibold text-slate-700">
                          {email ||
                            "غير متوفر"}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-xs font-bold text-slate-400">
                          رقم الهاتف
                        </p>

                        <p className="mt-2 font-semibold text-slate-700">
                          {application.applicant_phone ||
                            "غير متوفر"}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-xs font-bold text-slate-400">
                          نوع الفرصة
                        </p>

                        <p className="mt-2 font-semibold text-slate-700">
                          {opportunityTypeLabel(
                            opportunity?.opportunity_type
                          )}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-xs font-bold text-slate-400">
                          الموقع
                        </p>

                        <p className="mt-2 font-semibold text-slate-700">
                          📍{" "}
                          {opportunity?.city ||
                            "غير محدد"}
                          {opportunity?.state
                            ? ` - ${opportunity.state}`
                            : ""}
                        </p>
                      </div>

                    </div>

                    {/* Cover Letter */}
                    {application.cover_letter && (
                      <div className="px-6 pb-6">

                        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">

                          <h3 className="font-black text-slate-800">
                            ✉️ خطاب التقديم
                          </h3>

                          <p className="mt-3 whitespace-pre-line leading-8 text-slate-600">
                            {
                              application.cover_letter
                            }
                          </p>

                        </div>

                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex flex-col gap-4 border-t border-slate-100 bg-slate-50 p-6 md:flex-row md:items-center md:justify-between">

                      <div className="flex flex-wrap gap-3">

                        {application.applicant_cv && (
                          <a
                            href={
                              application.applicant_cv
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white transition hover:bg-indigo-700"
                          >
                            📄 عرض السيرة الذاتية
                          </a>
                        )}

                      </div>

                      {application.status ===
                      "pending" ? (
                        <div className="flex flex-col gap-3 sm:flex-row">

                          <button
                            disabled={isUpdating}
                            onClick={() =>
                              updateStatus(
                                application.id,
                                "accepted"
                              )
                            }
                            className="rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                          >
                            {isUpdating
                              ? "جاري المعالجة..."
                              : "✓ قبول الطلب"}
                          </button>

                          <button
                            disabled={isUpdating}
                            onClick={() =>
                              updateStatus(
                                application.id,
                                "rejected"
                              )
                            }
                            className="rounded-xl bg-red-600 px-6 py-3 font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                          >
                            {isUpdating
                              ? "جاري المعالجة..."
                              : "✕ رفض الطلب"}
                          </button>

                        </div>
                      ) : (
                        <div>
                          <StatusBadge
                            status={
                              application.status
                            }
                          />
                        </div>
                      )}

                    </div>

                  </div>
                );
              }
            )}

          </div>
        )}

      </div>
    </main>
  );
}

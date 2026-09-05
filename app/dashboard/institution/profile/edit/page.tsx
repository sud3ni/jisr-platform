"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase-client";

type Institution = {
  id: string;
  name: string;
  website: string;
  phone: string;
  city: string;
  state: string;
  description: string;
  status: string;
  verified: boolean;
};

export default function EditInstitutionProfilePage() {
  const router = useRouter();

  const [institution, setInstitution] =
    useState<Institution | null>(null);

  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadInstitution();
  }, []);

  async function loadInstitution() {
    setLoading(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data, error } = await supabase
      .from("institutions")
      .select(
        "id,name,website,phone,city,state,description,status,verified"
      )
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      console.error(error);
      setError("تعذر تحميل بيانات المؤسسة.");
      setLoading(false);
      return;
    }

    if (!data) {
      setError("لا توجد بيانات مؤسسة مرتبطة بهذا الحساب.");
      setLoading(false);
      return;
    }

    setInstitution(data);

    setName(data.name || "");
    setWebsite(data.website || "");
    setPhone(data.phone || "");
    setCity(data.city || "");
    setState(data.state || "");
    setDescription(data.description || "");

    setLoading(false);
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("انتهت جلسة تسجيل الدخول. يرجى تسجيل الدخول مرة أخرى.");
      setSaving(false);
      return;
    }

    if (!name.trim()) {
      setError("يرجى إدخال اسم المؤسسة.");
      setSaving(false);
      return;
    }

    const { error } = await supabase
      .from("institutions")
      .update({
        name: name.trim(),
        website: website.trim() || null,
        phone: phone.trim() || null,
        city: city.trim() || null,
        state: state.trim() || null,
        description: description.trim() || null,
      })
      .eq("id", user.id);

    if (error) {
      console.error("Update institution error:", error);
      setError(
        "تعذر حفظ التعديلات. يرجى المحاولة مرة أخرى."
      );
      setSaving(false);
      return;
    }

    setSuccess("تم حفظ بيانات المؤسسة بنجاح.");

    setTimeout(() => {
      router.push("/dashboard/institution");
      router.refresh();
    }, 1000);
  }

  if (loading) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-slate-100"
      >
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-700" />

            <p className="mt-4 font-semibold text-slate-600">
              جاري تحميل بيانات المؤسسة...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!institution) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-slate-100 px-6"
      >
        <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-xl ring-1 ring-slate-200">
          <h1 className="text-2xl font-extrabold text-red-600">
            تعذر تحميل الملف
          </h1>

          <p className="mt-4 leading-7 text-slate-600">
            {error || "لم يتم العثور على بيانات المؤسسة."}
          </p>

          <Link
            href="/dashboard/institution"
            className="mt-6 inline-flex rounded-xl bg-blue-700 px-6 py-3 font-bold text-white transition hover:bg-blue-800"
          >
            العودة إلى لوحة التحكم
          </Link>
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
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex min-h-20 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <div>
            <p className="text-sm font-semibold text-blue-700">
              جسر
            </p>

            <h1 className="text-xl font-extrabold text-slate-900">
              تعديل بيانات المؤسسة
            </h1>
          </div>

          <Link
            href="/dashboard/institution"
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            العودة للوحة التحكم
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-12">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile summary */}
          <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-2xl font-extrabold text-blue-700">
              {name.trim().charAt(0) || "م"}
            </div>

            <h2 className="mt-5 text-xl font-extrabold text-slate-900">
              {name || "المؤسسة"}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              قم بتحديث المعلومات العامة لمؤسستك لتظهر بصورة أفضل أمام المتقدمين.
            </p>

            <div className="mt-6 space-y-3">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  حالة الحساب
                </p>

                <p className="mt-1 font-bold text-slate-800">
                  {institution.status || "قيد المراجعة"}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  التحقق
                </p>

                <p
                  className={`mt-1 font-bold ${
                    institution.verified
                      ? "text-green-700"
                      : "text-amber-700"
                  }`}
                >
                  {institution.verified
                    ? "مؤسسة موثقة"
                    : "لم يتم التحقق بعد"}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-800">
              حالة التحقق وحالة الحساب تتم إدارتهما من قبل إدارة منصة جسر ولا يمكن تعديلهما من هذه الصفحة.
            </div>
          </aside>

          {/* Form */}
          <section className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8"
            >
              <div className="border-b border-slate-100 pb-6">
                <h2 className="text-2xl font-extrabold text-slate-900">
                  المعلومات الأساسية
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  حدّث بيانات المؤسسة ومعلومات التواصل والموقع.
                </p>
              </div>

              {/* Messages */}
              {error && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold leading-6 text-red-700">
                  {error}
                </div>
              )}

              {success && (
                <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-semibold leading-6 text-green-700">
                  {success}
                </div>
              )}

              <div className="mt-8 space-y-6">
                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    اسم المؤسسة
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    placeholder="اسم المؤسسة"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {/* Website */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    الموقع الإلكتروني
                  </label>

                  <input
                    type="url"
                    value={website}
                    onChange={(e) =>
                      setWebsite(e.target.value)
                    }
                    placeholder="https://example.com"
                    dir="ltr"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-left text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    رقم الهاتف
                  </label>

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                    placeholder="رقم هاتف المؤسسة"
                    dir="ltr"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-left text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {/* Location */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      المدينة
                    </label>

                    <input
                      type="text"
                      value={city}
                      onChange={(e) =>
                        setCity(e.target.value)
                      }
                      placeholder="مثال: الخرطوم"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      الولاية
                    </label>

                    <input
                      type="text"
                      value={state}
                      onChange={(e) =>
                        setState(e.target.value)
                      }
                      placeholder="مثال: ولاية الخرطوم"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    نبذة عن المؤسسة
                  </label>

                  <textarea
                    value={description}
                    onChange={(e) =>
                      setDescription(e.target.value)
                    }
                    rows={7}
                    placeholder="اكتب نبذة مختصرة عن المؤسسة وأنشطتها..."
                    className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3.5 leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-start">
                <Link
                  href="/dashboard/institution"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-6 py-3.5 font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  إلغاء
                </Link>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center rounded-xl bg-blue-700 px-7 py-3.5 font-bold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <span className="ml-2 h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      جاري حفظ التعديلات...
                    </>
                  ) : (
                    "حفظ التعديلات"
                  )}
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}

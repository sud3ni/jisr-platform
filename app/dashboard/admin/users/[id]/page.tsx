import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseServer } from "@/lib/supabase-server";
import UserStatusActions from "@/components/admin/UserStatusActions";
import DeleteUserButton from "@/components/admin/DeleteUserButton";

export default async function UserDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: user, error } = await supabaseServer
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !user) {
    notFound();
  }

  function getRoleLabel(role: string | null) {
    switch (role) {
      case "admin":
        return "👑 مدير";

      case "institution":
        return "🏢 مؤسسة";

      case "graduate":
        return "🎓 خريج";

      case "student":
        return "📚 طالب";

      default:
        return role || "غير محدد";
    }
  }

  function getRoleClass(role: string | null) {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-700";

      case "institution":
        return "bg-blue-100 text-blue-700";

      case "graduate":
        return "bg-green-100 text-green-700";

      case "student":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  }

  function formatDate(date: string | null) {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <main>

      {/* رأس الصفحة */}
      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold text-blue-700">
            تفاصيل المستخدم
          </h1>

          <p className="mt-2 text-gray-500">
            عرض وإدارة بيانات حساب المستخدم.
          </p>
        </div>

        <Link
          href="/dashboard/admin/users"
          className="rounded-lg bg-slate-700 px-5 py-3 text-white hover:bg-slate-800"
        >
          ← العودة
        </Link>

      </div>


      {/* بطاقة المستخدم */}
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-xl">

        {/* رأس البطاقة */}
        <div className="mb-8 text-center">

          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-5xl">
            👤
          </div>

          <h2 className="text-3xl font-bold text-slate-800">
            {user.full_name || "بدون اسم"}
          </h2>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">

            {/* نوع الحساب */}
            <span
              className={`rounded-lg px-4 py-2 ${getRoleClass(
                user.role
              )}`}
            >
              {getRoleLabel(user.role)}
            </span>

            {/* حالة الحساب */}
            {user.status === "suspended" ? (
              <span className="rounded-lg bg-red-100 px-4 py-2 text-red-700">
                ⛔ الحساب معلق
              </span>
            ) : (
              <span className="rounded-lg bg-green-100 px-4 py-2 text-green-700">
                🟢 الحساب نشط
              </span>
            )}

          </div>

        </div>


        {/* بيانات المستخدم */}
        <div className="space-y-4">

          {/* الاسم */}
          <div className="rounded-xl bg-slate-50 p-5">

            <p className="mb-1 text-sm text-gray-500">
              الاسم الكامل
            </p>

            <p className="text-lg font-semibold">
              {user.full_name || "-"}
            </p>

          </div>


          {/* البريد */}
          <div className="rounded-xl bg-slate-50 p-5">

            <p className="mb-1 text-sm text-gray-500">
              البريد الإلكتروني
            </p>

            <p className="break-all text-lg font-semibold">
              {user.email || "-"}
            </p>

          </div>


          {/* نوع الحساب */}
          <div className="rounded-xl bg-slate-50 p-5">

            <p className="mb-2 text-sm text-gray-500">
              نوع الحساب
            </p>

            <span
              className={`inline-block rounded-lg px-4 py-2 ${getRoleClass(
                user.role
              )}`}
            >
              {getRoleLabel(user.role)}
            </span>

          </div>


          {/* حالة الحساب */}
          <div className="rounded-xl bg-slate-50 p-5">

            <p className="mb-2 text-sm text-gray-500">
              حالة الحساب
            </p>

            {user.status === "suspended" ? (
              <span className="inline-block rounded-lg bg-red-100 px-4 py-2 text-red-700">
                ⛔ الحساب معلق
              </span>
            ) : (
              <span className="inline-block rounded-lg bg-green-100 px-4 py-2 text-green-700">
                🟢 الحساب نشط
              </span>
            )}

          </div>


          {/* تاريخ التسجيل */}
          <div className="rounded-xl bg-slate-50 p-5">

            <p className="mb-1 text-sm text-gray-500">
              تاريخ التسجيل
            </p>

            <p className="text-lg font-semibold">
              {formatDate(user.created_at)}
            </p>

          </div>


          {/* معرف المستخدم */}
          <div className="rounded-xl bg-slate-50 p-5">

            <p className="mb-1 text-sm text-gray-500">
              معرف المستخدم
            </p>

            <p className="break-all font-mono text-sm text-gray-600">
              {user.id}
            </p>

          </div>

        </div>


        {/* إجراءات المدير */}
        <div className="mt-8 border-t pt-6">

          <h3 className="mb-4 text-xl font-bold">
            إجراءات المدير
          </h3>

          <div className="flex flex-wrap gap-3">

            {/* تعديل */}
            <Link
              href={`/dashboard/admin/users/${user.id}/edit`}
              className="rounded-lg bg-yellow-500 px-5 py-3 text-white hover:bg-yellow-600"
            >
              ✏️ تعديل
            </Link>


            {/* تعليق / إعادة تنشيط */}
            <UserStatusActions
              id={user.id}
              name={user.full_name || "هذا المستخدم"}
              status={user.status}
            />


            {/* حذف */}
            <DeleteUserButton
              id={user.id}
              name={user.full_name || "هذا المستخدم"}
            />

          </div>

        </div>


        {/* تنبيه إداري */}
        <div className="mt-6 rounded-xl bg-blue-50 p-4 text-sm leading-6 text-blue-700">
          💡 من هذه الصفحة يستطيع المدير تعديل بيانات المستخدم،
          تعليق الحساب أو إعادة تنشيطه، وحذف الحساب نهائيًا.
        </div>

      </div>

    </main>
  );
}

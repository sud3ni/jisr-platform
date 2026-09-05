import Link from "next/link";
import { supabaseServer } from "@/lib/supabase-server";
import { updateUser } from "../actions";

export default async function EditUserPage({
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
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold text-red-600">
          المستخدم غير موجود
        </h1>

        <Link
          href="/dashboard/admin/users"
          className="mt-6 inline-block rounded-lg bg-slate-700 px-5 py-3 text-white"
        >
          العودة إلى المستخدمين
        </Link>
      </main>
    );
  }

  return (
    <main>

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-4xl font-bold text-blue-700">
          تعديل المستخدم
        </h1>

        <Link
          href={`/dashboard/admin/users/${id}`}
          className="rounded-lg bg-slate-700 px-5 py-3 text-white hover:bg-slate-800"
        >
          ← العودة
        </Link>

      </div>


      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-xl">

        <div className="mb-8 text-center">

          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-4xl">
            👤
          </div>

          <h2 className="text-2xl font-bold">
            {user.full_name || "بدون اسم"}
          </h2>

          <p className="mt-2 break-all text-gray-500">
            {user.email || "-"}
          </p>

        </div>


        <form action={updateUser} className="space-y-6">

          <input
            type="hidden"
            name="id"
            value={user.id}
          />


          {/* الاسم */}
          <div>

            <label className="mb-2 block font-semibold">
              الاسم الكامل
            </label>

            <input
              type="text"
              name="full_name"
              defaultValue={user.full_name ?? ""}
              required
              className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
              placeholder="الاسم الكامل"
            />

          </div>


          {/* البريد */}
          <div>

            <label className="mb-2 block font-semibold">
              البريد الإلكتروني
            </label>

            <input
              type="email"
              value={user.email ?? ""}
              disabled
              className="w-full cursor-not-allowed rounded-lg border bg-slate-100 p-3 text-gray-500"
            />

            <p className="mt-2 text-sm text-gray-500">
              لا يتم تغيير بريد تسجيل الدخول من هذه الصفحة.
            </p>

          </div>


          {/* نوع الحساب */}
          <div>

            <label className="mb-2 block font-semibold">
              نوع الحساب
            </label>

            <select
              name="role"
              defaultValue={user.role ?? "graduate"}
              className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
            >

              <option value="student">
                📚 طالب
              </option>

              <option value="graduate">
                🎓 خريج
              </option>

              <option value="institution">
                🏢 مؤسسة
              </option>

              <option value="admin">
                👑 مدير
              </option>

            </select>

          </div>


          {/* المعرف */}
          <div>

            <label className="mb-2 block font-semibold">
              معرف المستخدم
            </label>

            <input
              type="text"
              value={user.id}
              disabled
              className="w-full cursor-not-allowed rounded-lg border bg-slate-100 p-3 font-mono text-sm text-gray-500"
            />

          </div>


          {/* زر الحفظ */}
          <div className="flex flex-wrap gap-3 pt-4">

            <button
              type="submit"
              className="rounded-lg bg-blue-700 px-8 py-3 font-semibold text-white hover:bg-blue-800"
            >
              💾 حفظ التعديلات
            </button>

            <Link
              href={`/dashboard/admin/users/${id}`}
              className="rounded-lg bg-slate-200 px-8 py-3 text-slate-700 hover:bg-slate-300"
            >
              إلغاء
            </Link>

          </div>

        </form>

      </div>

    </main>
  );
}

"use server";

import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { supabaseServer } from "@/lib/supabase-server";

export async function updateUser(formData: FormData) {
  const id = formData.get("id") as string;
  const fullName = formData.get("full_name") as string;
  const role = formData.get("role") as string;

  if (!id) {
    throw new Error("معرف المستخدم غير موجود.");
  }

  if (!fullName?.trim()) {
    throw new Error("اسم المستخدم مطلوب.");
  }

  const allowedRoles = [
    "student",
    "graduate",
    "institution",
    "admin",
  ];

  if (!allowedRoles.includes(role)) {
    throw new Error("نوع الحساب غير صالح.");
  }

  const { error } = await supabaseServer
    .from("users")
    .update({
      full_name: fullName.trim(),
      role,
    })
    .eq("id", id);

  if (error) {
    console.error("Update user error:", error);
    throw new Error("فشل تحديث بيانات المستخدم.");
  }

  redirect(`/dashboard/admin/users/${id}`);
}

export async function suspendUser(formData: FormData) {
  const id = formData.get("id") as string;

  if (!id) {
    throw new Error("معرف المستخدم غير موجود.");
  }

  const { error } = await supabaseServer
    .from("users")
    .update({
      status: "suspended",
    })
    .eq("id", id);

  if (error) {
    console.error("Suspend user error:", error);
    throw new Error("فشل تعليق الحساب.");
  }

  redirect(`/dashboard/admin/users/${id}`);
}

export async function activateUser(formData: FormData) {
  const id = formData.get("id") as string;

  if (!id) {
    throw new Error("معرف المستخدم غير موجود.");
  }

  const { error } = await supabaseServer
    .from("users")
    .update({
      status: "active",
    })
    .eq("id", id);

  if (error) {
    console.error("Activate user error:", error);
    throw new Error("فشل إعادة تنشيط الحساب.");
  }

  redirect(`/dashboard/admin/users/${id}`);
}

export async function deleteUser(formData: FormData) {
  const id = formData.get("id") as string;

  if (!id) {
    throw new Error("معرف المستخدم غير موجود.");
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  const { error: authError } =
    await supabaseAdmin.auth.admin.deleteUser(id);

  if (authError) {
    console.error("Delete Auth user error:", authError);
    throw new Error(
      "فشل حذف حساب المستخدم من نظام المصادقة."
    );
  }

  const { error: userError } = await supabaseServer
    .from("users")
    .delete()
    .eq("id", id);

  if (userError) {
    console.error("Delete users row error:", userError);
    throw new Error(
      "تم حذف حساب الدخول، ولكن فشل حذف سجل المستخدم."
    );
  }

  redirect("/dashboard/admin/users");
}

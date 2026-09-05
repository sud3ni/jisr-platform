"use server";

import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase-server";

export async function updateInstitution(formData: FormData) {
  const id = formData.get("id") as string;

  const name = formData.get("name") as string;
  const website = formData.get("website") as string;
  const phone = formData.get("phone") as string;
  const city = formData.get("city") as string;
  const state = formData.get("state") as string;
  const description = formData.get("description") as string;

  const { error } = await supabaseServer
    .from("institutions")
    .update({
      name,
      website,
      phone,
      city,
      state,
      description,
    })
    .eq("id", id);

  if (error) {
    console.error("Update institution error:", error);
    throw new Error("فشل تحديث بيانات المؤسسة.");
  }

  redirect(`/dashboard/admin/institutions/${id}`);
}


/* =========================
   توثيق المؤسسة
========================= */

export async function verifyInstitution(formData: FormData) {
  const id = formData.get("id") as string;

  const { error } = await supabaseServer
    .from("institutions")
    .update({
      verified: true,
    })
    .eq("id", id);

  if (error) {
    console.error("Verify institution error:", error);
    throw new Error("فشل توثيق المؤسسة.");
  }

  redirect(`/dashboard/admin/institutions/${id}`);
}


/* =========================
   إلغاء توثيق المؤسسة
========================= */

export async function unverifyInstitution(formData: FormData) {
  const id = formData.get("id") as string;

  const { error } = await supabaseServer
    .from("institutions")
    .update({
      verified: false,
    })
    .eq("id", id);

  if (error) {
    console.error("Unverify institution error:", error);
    throw new Error("فشل إلغاء توثيق المؤسسة.");
  }

  redirect(`/dashboard/admin/institutions/${id}`);
}


/* =========================
   تعليق المؤسسة
========================= */

export async function suspendInstitution(formData: FormData) {
  const id = formData.get("id") as string;

  const { error } = await supabaseServer
    .from("institutions")
    .update({
      status: "suspended",
    })
    .eq("id", id);

  if (error) {
    console.error("Suspend institution error:", error);
    throw new Error("فشل تعليق المؤسسة.");
  }

  redirect(`/dashboard/admin/institutions/${id}`);
}


/* =========================
   إعادة تنشيط المؤسسة
========================= */

export async function activateInstitution(formData: FormData) {
  const id = formData.get("id") as string;

  const { error } = await supabaseServer
    .from("institutions")
    .update({
      status: "active",
    })
    .eq("id", id);

  if (error) {
    console.error("Activate institution error:", error);
    throw new Error("فشل إعادة تنشيط المؤسسة.");
  }

  redirect(`/dashboard/admin/institutions/${id}`);
}
export async function deleteInstitution(formData: FormData) {
  const id = formData.get("id") as string;

  if (!id) {
    throw new Error("معرّف المؤسسة غير موجود.");
  }

  const { error } = await supabaseServer
    .from("institutions")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Delete institution error:", error);
    throw new Error("فشل حذف المؤسسة.");
  }

  redirect("/dashboard/admin/institutions");
}

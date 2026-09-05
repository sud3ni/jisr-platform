"use server";

import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase-server";

export async function publishOpportunity(formData: FormData) {
  const id = formData.get("id") as string;

  if (!id) {
    throw new Error("معرف الفرصة غير موجود.");
  }

  const { error } = await supabaseServer
    .from("opportunities")
    .update({
      status: "published",
    })
    .eq("id", id);

  if (error) {
    console.error("Publish opportunity error:", error);
    throw new Error("فشل نشر الفرصة.");
  }

  redirect(`/dashboard/admin/opportunities/${id}`);
}

export async function suspendOpportunity(formData: FormData) {
  const id = formData.get("id") as string;

  if (!id) {
    throw new Error("معرف الفرصة غير موجود.");
  }

  const { error } = await supabaseServer
    .from("opportunities")
    .update({
      status: "suspended",
    })
    .eq("id", id);

  if (error) {
    console.error("Suspend opportunity error:", error);
    throw new Error("فشل إيقاف الفرصة.");
  }

  redirect(`/dashboard/admin/opportunities/${id}`);
}

export async function updateOpportunity(formData: FormData) {
  const id = formData.get("id") as string;

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const opportunityType = formData.get("opportunity_type") as string;
  const city = formData.get("city") as string;
  const state = formData.get("state") as string;
  const duration = formData.get("duration") as string;
  const salary = formData.get("salary") as string;
  const deadline = formData.get("deadline") as string;
  const requirements = formData.get("requirements") as string;

  if (!id) {
    throw new Error("معرف الفرصة غير موجود.");
  }

  if (!title?.trim()) {
    throw new Error("عنوان الفرصة مطلوب.");
  }

  const { error } = await supabaseServer
    .from("opportunities")
    .update({
      title: title.trim(),
      description: description?.trim() || null,
      opportunity_type: opportunityType?.trim() || null,
      city: city?.trim() || null,
      state: state?.trim() || null,
      duration: duration?.trim() || null,
      salary: salary?.trim() || null,
      deadline: deadline || null,
      requirements: requirements?.trim() || null,
    })
    .eq("id", id);

  if (error) {
    console.error("Update opportunity error:", error);
    throw new Error("فشل تحديث بيانات الفرصة.");
  }

  redirect(`/dashboard/admin/opportunities/${id}`);
}
export async function deleteOpportunity(formData: FormData) {
  const id = formData.get("id") as string;

  if (!id) {
    throw new Error("معرف الفرصة غير موجود.");
  }

  const { error } = await supabaseServer
    .from("opportunities")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Delete opportunity error:", error);
    throw new Error("فشل حذف الفرصة.");
  }

  redirect("/dashboard/admin/opportunities");
}

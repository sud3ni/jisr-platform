"use server";

import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase-server";

export async function updateApplicationStatus(
  formData: FormData
) {
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;

  if (!id) {
    throw new Error("معرف الطلب غير موجود.");
  }

  const allowedStatuses = [
    "pending",
    "accepted",
    "rejected",
  ];

  if (!allowedStatuses.includes(status)) {
    throw new Error("حالة الطلب غير صحيحة.");
  }

  const { error } = await supabaseServer
    .from("applications")
    .update({
      status,
    })
    .eq("id", id);

  if (error) {
    console.error(
      "Update application status error:",
      error
    );

    throw new Error(
      "فشل تحديث حالة طلب التقديم."
    );
  }

  redirect(
    `/dashboard/admin/applications/${id}`
  );
}

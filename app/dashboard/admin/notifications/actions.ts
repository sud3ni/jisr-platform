"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase-server-auth";
import { supabaseServer } from "@/lib/supabase-server";

async function getCurrentUserId() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("يجب تسجيل الدخول أولًا.");
  }

  return user.id;
}

export async function getNotifications() {
  const userId = await getCurrentUserId();

  const { data, error } = await supabaseServer
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "Get notifications error:",
      error
    );

    throw new Error(
      "تعذر تحميل الإشعارات."
    );
  }

  return data || [];
}

export async function markNotificationAsRead(
  formData: FormData
) {
  const id = formData.get("id") as string;

  if (!id) {
    throw new Error(
      "معرف الإشعار غير موجود."
    );
  }

  const userId = await getCurrentUserId();

  const { error } = await supabaseServer
    .from("notifications")
    .update({
      is_read: true,
    })
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    console.error(
      "Mark notification as read error:",
      error
    );

    throw new Error(
      "تعذر تحديث الإشعار."
    );
  }

  revalidatePath(
    "/dashboard/admin"
  );

  revalidatePath(
    "/dashboard/admin/notifications"
  );
}

export async function markAllNotificationsAsRead(
  userIdFromClient?: string
) {
  const userId = await getCurrentUserId();

  /*
   * لا نعتمد على userId القادم من المتصفح.
   * نستخدم userId من جلسة Supabase.
   */

  const { error } = await supabaseServer
    .from("notifications")
    .update({
      is_read: true,
    })
    .eq("user_id", userId)
    .eq("is_read", false);

  if (error) {
    console.error(
      "Mark all notifications error:",
      error
    );

    throw new Error(
      "تعذر تحديث الإشعارات."
    );
  }

  revalidatePath(
    "/dashboard/admin"
  );

  revalidatePath(
    "/dashboard/admin/notifications"
  );
}

export async function deleteNotification(
  formData: FormData
) {
  const id = formData.get("id") as string;

  if (!id) {
    throw new Error(
      "معرف الإشعار غير موجود."
    );
  }

  const userId = await getCurrentUserId();

  const { error } = await supabaseServer
    .from("notifications")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    console.error(
      "Delete notification error:",
      error
    );

    throw new Error(
      "تعذر حذف الإشعار."
    );
  }

  revalidatePath(
    "/dashboard/admin"
  );

  revalidatePath(
    "/dashboard/admin/notifications"
  );
}

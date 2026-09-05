import { supabaseServer } from "@/lib/supabase-server";

type CreateNotificationParams = {
  userId: string;
  title: string;
  message?: string | null;
};

export async function createNotification({
  userId,
  title,
  message = null,
}: CreateNotificationParams) {
  if (!userId) {
    throw new Error("معرف المستخدم غير موجود.");
  }

  if (!title) {
    throw new Error("عنوان الإشعار غير موجود.");
  }

  const { data, error } = await supabaseServer
    .from("notifications")
    .insert({
      user_id: userId,
      title,
      message,
      is_read: false,
    })
    .select()
    .single();

  if (error) {
    console.error(
      "Create notification error:",
      error
    );

    throw new Error(
      "تعذر إنشاء الإشعار."
    );
  }

  return data;
}

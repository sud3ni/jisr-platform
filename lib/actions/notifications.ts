"use server";

import { supabaseServer } from "@/lib/supabase-server";

/*
 * =========================================================
 * أنواع الإشعارات
 * =========================================================
 */

export type NotificationType =
  | "application"
  | "institution"
  | "opportunity"
  | "system";

/*
 * =========================================================
 * إنشاء إشعار لمستخدم واحد
 * =========================================================
 */

export async function createNotification({
  userId,
  title,
  message,
}: {
  userId: string;
  title: string;
  message: string;
}) {
  const {
    data,
    error,
  } = await supabaseServer
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
      "CREATE NOTIFICATION ERROR:",
      error
    );

    throw new Error(
      "تعذر إنشاء الإشعار."
    );
  }

  return data;
}

/*
 * =========================================================
 * إرسال إشعار لجميع المديرين
 * =========================================================
 */

export async function notifyAdmins({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  /*
   * جلب جميع حسابات الإدارة
   */
  const {
    data: admins,
    error: adminsError,
  } = await supabaseServer
    .from("users")
    .select("id")
    .eq("role", "admin");

  if (adminsError) {
    console.error(
      "GET ADMINS ERROR:",
      adminsError
    );

    throw new Error(
      "تعذر الوصول إلى حسابات الإدارة."
    );
  }

  /*
   * في حالة عدم وجود مديرين
   */
  if (!admins || admins.length === 0) {
    console.warn(
      "NOTIFICATION WARNING: لا يوجد مديرون."
    );

    return [];
  }

  /*
   * إنشاء إشعار لكل مدير
   */
  const notifications = admins.map(
    (admin) => ({
      user_id: admin.id,
      title,
      message,
      is_read: false,
    })
  );

  const {
    data,
    error,
  } = await supabaseServer
    .from("notifications")
    .insert(notifications)
    .select();

  if (error) {
    console.error(
      "NOTIFY ADMINS ERROR:",
      error
    );

    throw new Error(
      "تعذر إرسال الإشعار إلى الإدارة."
    );
  }

  return data || [];
}

/*
 * =========================================================
 * مؤسسة جديدة
 * =========================================================
 */

export async function notifyNewInstitution({
  institutionName,
}: {
  institutionName: string;
}) {
  return notifyAdmins({
    title:
      "مؤسسة جديدة بانتظار المراجعة",

    message:
      `تم تسجيل مؤسسة جديدة باسم "${institutionName}". يرجى مراجعة بيانات المؤسسة.`,
  });
}

/*
 * =========================================================
 * فرصة جديدة
 * =========================================================
 */

export async function notifyNewOpportunity({
  opportunityTitle,
  institutionName,
}: {
  opportunityTitle: string;
  institutionName: string;
}) {
  return notifyAdmins({
    title:
      "فرصة جديدة بانتظار المراجعة",

    message:
      `تم نشر فرصة جديدة بعنوان "${opportunityTitle}" بواسطة مؤسسة "${institutionName}". يرجى مراجعة الفرصة.`,
  });
}

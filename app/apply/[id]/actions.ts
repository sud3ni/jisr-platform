"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAuthServer } from "@/lib/supabase-auth-server";

const MAX_CV_SIZE = 1024 * 1024; // 1 MB

type SubmitApplicationResult =
  | {
      success: true;
      applicationId: string;
      message: string;
    }
  | {
      success: false;
      message: string;
    };

export async function submitApplication(
  formData: FormData
): Promise<SubmitApplicationResult> {
  let uploadedFileName: string | null = null;

  try {
    /*
     * ==========================================
     * 1. قراءة بيانات النموذج
     * ==========================================
     */

    const opportunityId = String(
      formData.get("opportunity_id") || ""
    ).trim();

    const applicantName = String(
      formData.get("applicant_name") || ""
    ).trim();

    const applicantEmail = String(
      formData.get("applicant_email") || ""
    ).trim();

    const applicantPhone = String(
      formData.get("applicant_phone") || ""
    ).trim();

    const coverLetter = String(
      formData.get("cover_letter") || ""
    ).trim();

    const cv = formData.get("cv");

    /*
     * ==========================================
     * 2. التحقق من معرف الفرصة
     * ==========================================
     */

    if (!opportunityId) {
      return {
        success: false,
        message: "معرف الفرصة غير موجود.",
      };
    }

    /*
     * ==========================================
     * 3. التحقق من تسجيل الدخول
     * ==========================================
     */

    const authSupabase =
      await supabaseAuthServer();

    const {
      data: { user },
      error: authError,
    } =
      await authSupabase.auth.getUser();

    if (authError) {
      console.error(
        "AUTH ERROR:",
        authError
      );

      return {
        success: false,
        message:
          "تعذر التحقق من تسجيل الدخول.",
      };
    }

    if (!user) {
      return {
        success: false,
        message:
          "يجب تسجيل الدخول قبل التقديم.",
      };
    }

    /*
     * ==========================================
     * 4. جلب بيانات المستخدم
     * ==========================================
     */

    const {
      data: applicant,
      error: applicantError,
    } =
      await supabaseServer
        .from("users")
        .select(
          "id, role, full_name, email"
        )
        .eq("id", user.id)
        .single();

    if (
      applicantError ||
      !applicant
    ) {
      console.error(
        "APPLICANT ERROR:",
        applicantError
      );

      return {
        success: false,
        message:
          "تعذر العثور على بيانات المستخدم.",
      };
    }

    /*
     * ==========================================
     * 5. التحقق من نوع الحساب
     * ==========================================
     */

    const role = applicant.role;

    if (
      role !== "student" &&
      role !== "graduate"
    ) {
      return {
        success: false,
        message:
          "هذا الحساب غير مسموح له بالتقديم على الفرص.",
      };
    }

    /*
     * ==========================================
     * 6. التحقق من السيرة الذاتية
     * ==========================================
     */

    if (
      !(cv instanceof File) ||
      cv.size === 0
    ) {
      return {
        success: false,
        message:
          "يرجى اختيار ملف السيرة الذاتية.",
      };
    }

    /*
     * التحقق من صيغة الملف
     */
    const isPdf =
      cv.type === "application/pdf" ||
      cv.name
        .toLowerCase()
        .endsWith(".pdf");

    if (!isPdf) {
      return {
        success: false,
        message:
          "يسمح فقط بملفات PDF.",
      };
    }

    /*
     * التحقق من الحجم
     *
     * الحد الأقصى = 1 MB
     */
    if (cv.size > MAX_CV_SIZE) {
      return {
        success: false,
        message:
          "حجم السيرة الذاتية يجب ألا يتجاوز 1 ميجابايت.",
      };
    }

    /*
     * ==========================================
     * 7. جلب الفرصة
     * ==========================================
     */

    const {
      data: opportunity,
      error: opportunityError,
    } =
      await supabaseServer
        .from("opportunities")
        .select(
          "id, title, institution_id, status"
        )
        .eq("id", opportunityId)
        .single();

    if (
      opportunityError ||
      !opportunity
    ) {
      console.error(
        "OPPORTUNITY ERROR:",
        opportunityError
      );

      return {
        success: false,
        message:
          "تعذر العثور على الفرصة.",
      };
    }

    /*
     * ==========================================
     * 8. التأكد من أن الفرصة متاحة
     * ==========================================
     */

    if (
      opportunity.status !==
      "published"
    ) {
      return {
        success: false,
        message:
          "هذه الفرصة غير متاحة للتقديم حاليًا.",
      };
    }

    /*
     * ==========================================
     * 9. منع التقديم المكرر
     * ==========================================
     */

    const applicantColumn =
      role === "student"
        ? "student_id"
        : "graduate_id";

    const {
      data: existingApplication,
      error:
        existingApplicationError,
    } =
      await supabaseServer
        .from("applications")
        .select("id")
        .eq(
          "opportunity_id",
          opportunityId
        )
        .eq(
          applicantColumn,
          user.id
        )
        .maybeSingle();

    if (existingApplicationError) {
      console.error(
        "DUPLICATE CHECK ERROR:",
        existingApplicationError
      );

      return {
        success: false,
        message:
          "تعذر التحقق من وجود طلب سابق.",
      };
    }

    if (existingApplication) {
      return {
        success: false,
        message:
          "لقد تقدمت لهذه الفرصة مسبقًا.",
      };
    }

    /*
     * ==========================================
     * 10. تجهيز اسم الملف
     * ==========================================
     */

    const safeUserId =
      user.id.replace(
        /[^a-zA-Z0-9-]/g,
        ""
      );

    const fileName =
      `${safeUserId}-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.pdf`;

    uploadedFileName =
      fileName;

    /*
     * ==========================================
     * 11. تحويل الملف إلى ArrayBuffer
     * ==========================================
     */

    const bytes =
      await cv.arrayBuffer();

    /*
     * ==========================================
     * 12. رفع السيرة الذاتية
     * ==========================================
     */

    const {
      error: uploadError,
    } =
      await supabaseServer
        .storage
        .from("cvs")
        .upload(
          fileName,
          bytes,
          {
            contentType:
              "application/pdf",
            upsert: false,
          }
        );

    if (uploadError) {
      console.error(
        "CV UPLOAD ERROR:",
        uploadError
      );

      return {
        success: false,
        message:
          "تعذر رفع السيرة الذاتية: " +
          uploadError.message,
      };
    }

    /*
     * ==========================================
     * 13. الحصول على رابط السيرة
     * ==========================================
     */

    const {
      data: publicUrlData,
    } =
      supabaseServer
        .storage
        .from("cvs")
        .getPublicUrl(
          fileName
        );

    const publicUrl =
      publicUrlData?.publicUrl;

    if (!publicUrl) {
      await supabaseServer
        .storage
        .from("cvs")
        .remove([
          fileName,
        ]);

      uploadedFileName = null;

      return {
        success: false,
        message:
          "تعذر الحصول على رابط السيرة الذاتية.",
      };
    }

    /*
     * ==========================================
     * 14. تجهيز بيانات الطلب
     * ==========================================
     */

    const applicationData = {
      opportunity_id:
        opportunityId,

      student_id:
        role === "student"
          ? user.id
          : null,

      graduate_id:
        role === "graduate"
          ? user.id
          : null,

      applicant_name:
        applicantName ||
        applicant.full_name ||
        "",

      applicant_email:
        applicantEmail ||
        applicant.email ||
        user.email ||
        "",

      applicant_phone:
        applicantPhone ||
        "",

      applicant_cv:
        publicUrl,

      cover_letter:
        coverLetter ||
        "",

      status:
        "pending",
    };

    /*
     * ==========================================
     * 15. حفظ طلب التقديم
     * ==========================================
     */

    const {
      data: application,
      error: insertError,
    } =
      await supabaseServer
        .from("applications")
        .insert(
          applicationData
        )
        .select("id")
        .single();

    if (insertError) {
      console.error(
        "APPLICATION INSERT ERROR:",
        insertError
      );

      /*
       * حذف CV في حالة فشل حفظ الطلب
       */
      await supabaseServer
        .storage
        .from("cvs")
        .remove([
          fileName,
        ]);

      uploadedFileName = null;

      return {
        success: false,
        message:
          "تعذر حفظ طلب التقديم: " +
          insertError.message,
      };
    }

    if (!application) {
      await supabaseServer
        .storage
        .from("cvs")
        .remove([
          fileName,
        ]);

      uploadedFileName = null;

      return {
        success: false,
        message:
          "تعذر إنشاء طلب التقديم.",
      };
    }

    /*
     * ==========================================
     * 16. إرسال إشعار للمؤسسة
     * ==========================================
     */

    if (
      opportunity.institution_id
    ) {
      const {
        error:
          institutionNotificationError,
      } =
        await supabaseServer
          .from("notifications")
          .insert({
            user_id:
              opportunity.institution_id,

            title:
              "طلب تقديم جديد",

            message:
              `تم تقديم طلب جديد على فرصة "${opportunity.title}".`,

            is_read:
              false,
          });

      /*
       * فشل الإشعار لا يلغي الطلب
       */
      if (
        institutionNotificationError
      ) {
        console.error(
          "INSTITUTION NOTIFICATION ERROR:",
          institutionNotificationError
        );
      }
    }

    /*
     * ==========================================
     * 17. النجاح
     * ==========================================
     */

    return {
      success: true,
      applicationId:
        application.id,
      message:
        "تم إرسال طلب التقديم بنجاح.",
    };
  } catch (error) {
    console.error(
      "SUBMIT APPLICATION UNEXPECTED ERROR:",
      error
    );

    /*
     * تنظيف الملف إذا حدث خطأ غير متوقع
     */
    if (uploadedFileName) {
      try {
        await supabaseServer
          .storage
          .from("cvs")
          .remove([
            uploadedFileName,
          ]);
      } catch (cleanupError) {
        console.error(
          "CV CLEANUP ERROR:",
          cleanupError
        );
      }
    }

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "حدث خطأ غير متوقع أثناء إرسال طلب التقديم.",
    };
  }
}

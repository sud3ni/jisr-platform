"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";

type Institution = {
id: string;
name: string | null;
website: string | null;
phone: string | null;
city: string | null;
state: string | null;
description: string | null;
created_at: string | null;
status: string | null;
verified: boolean | null;
};

function InfoIcon({
type,
}: {
type:
| "building"
| "email"
| "phone"
| "location"
| "website"
| "description"
| "status";
}) {
if (type === "building") {
return (
<svg  
viewBox="0 0 24 24"  
fill="none"  
stroke="currentColor"  
strokeWidth="1.8"  
className="h-5 w-5"  
>
<path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
<path d="M16 9h2a2 2 0 0 1 2 2v10" />
<path d="M8 7h4" />
<path d="M8 11h4" />
<path d="M8 15h4" />
<path d="M10 21v-3h2v3" />
</svg>
);
}

if (type === "email") {
return (
<svg  
viewBox="0 0 24 24"  
fill="none"  
stroke="currentColor"  
strokeWidth="1.8"  
className="h-5 w-5"  
>
<rect x="3" y="5" width="18" height="14" rx="2" />
<path d="m3 7 9 6 9-6" />
</svg>
);
}

if (type === "phone") {
return (
<svg  
viewBox="0 0 24 24"  
fill="none"  
stroke="currentColor"  
strokeWidth="1.8"  
className="h-5 w-5"  
>
<path d="M6.5 3.5 9 3l2 5-2 1.5a15 15 0 0 0 5.5 5.5L16 13l5 2 .5 2.5a2 2 0 0 1-2 2C11.5 19.5 4.5 12.5 4 5.5a2 2 0 0 1 2.5-2Z" />
</svg>
);
}

if (type === "location") {
return (
<svg  
viewBox="0 0 24 24"  
fill="none"  
stroke="currentColor"  
strokeWidth="1.8"  
className="h-5 w-5"  
>
<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
<circle cx="12" cy="10" r="2.5" />
</svg>
);
}

if (type === "website") {
return (
<svg  
viewBox="0 0 24 24"  
fill="none"  
stroke="currentColor"  
strokeWidth="1.8"  
className="h-5 w-5"  
>
<circle cx="12" cy="12" r="9" />
<path d="M3 12h18" />
<path d="M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9S9.5 5.5 12 3Z" />
</svg>
);
}

if (type === "status") {
return (
<svg  
viewBox="0 0 24 24"  
fill="none"  
stroke="currentColor"  
strokeWidth="1.8"  
className="h-5 w-5"  
>
<circle cx="12" cy="12" r="9" />
<path d="M8 12h8" />
</svg>
);
}

return (
<svg  
viewBox="0 0 24 24"  
fill="none"  
stroke="currentColor"  
strokeWidth="1.8"  
className="h-5 w-5"  
>
<path d="M4 5h16v14H4z" />
<path d="M8 9h8" />
<path d="M8 13h6" />
</svg>
);
}

function InfoCard({
icon,
label,
value,
}: {
icon:
| "building"
| "email"
| "phone"
| "location"
| "website"
| "description"
| "status";
label: string;
value: string | null | undefined;
}) {
const hasValue = Boolean(value?.trim());

return (
<div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-sm">
<div className="flex items-start gap-4">
<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
<InfoIcon type={icon} />
</div>

<div className="min-w-0 flex-1">  
      <p className="text-xs font-bold text-slate-400">  
        {label}  
      </p>  

      {hasValue ? (  
        <p className="mt-2 break-words text-sm font-bold leading-6 text-slate-800">  
          {value}  
        </p>  
      ) : (  
        <p className="mt-2 text-sm font-medium text-slate-400">  
          غير مضاف  
        </p>  
      )}  
    </div>  
  </div>  
</div>

);
}

function statusLabel(status?: string | null) {
switch (status) {
case "active":
return "نشطة";

case "pending":  
  return "قيد المراجعة";  

case "suspended":  
  return "موقوفة";  

case "rejected":  
  return "مرفوضة";  

default:  
  return status || "غير محددة";

}
}

export default function InstitutionProfilePage() {
const router = useRouter();

const [institution, setInstitution] =
useState<Institution | null>(null);

const [authEmail, setAuthEmail] = useState("");

const [name, setName] = useState("");
const [website, setWebsite] = useState("");
const [phone, setPhone] = useState("");
const [city, setCity] = useState("");
const [state, setState] = useState("");
const [description, setDescription] = useState("");

const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);
const [loggingOut, setLoggingOut] = useState(false);

const [message, setMessage] = useState("");
const [error, setError] = useState("");

useEffect(() => {
loadProfile();
}, []);

async function loadProfile() {
setLoading(true);
setError("");
setMessage("");

try {  
  const {  
    data: { user },  
    error: authError,  
  } = await supabase.auth.getUser();  

  if (authError) {  
    console.error("AUTH ERROR:", authError);  

    setError(  
      "تعذر التحقق من جلسة تسجيل الدخول."  
    );  

    return;  
  }  

  if (!user) {  
    setError("يجب تسجيل الدخول أولاً.");  
    return;  
  }  

  /*  
   * البريد الإلكتروني يأتي من Supabase Auth  
   * وليس من جدول institutions.  
   */  
  setAuthEmail(user.email || "");  

  /*  
   * الأعمدة الموجودة فعلياً في جدول institutions:  
   *  
   * id  
   * name  
   * website  
   * phone  
   * city  
   * state  
   * description  
   * created_at  
   * status  
   * verified  
   */  
  const { data, error: profileError } =  
    await supabase  
      .from("institutions")  
      .select(  
        "id,name,website,phone,city,state,description,created_at,status,verified"  
      )  
      .eq("id", user.id)  
      .maybeSingle();  

  if (profileError) {  
    console.error(  
      "INSTITUTION PROFILE ERROR:",  
      profileError  
    );  

    setError(  
      "تعذر تحميل بيانات المؤسسة من قاعدة البيانات: " +  
        profileError.message  
    );  

    return;  
  }  

  if (!data) {  
    setError(  
      "لا يوجد ملف مؤسسة مرتبط بالحساب الحالي."  
    );  

    return;  
  }  

  const institutionData =  
    data as Institution;  

  setInstitution(institutionData);  

  setName(  
    institutionData.name || ""  
  );  

  setWebsite(  
    institutionData.website || ""  
  );  

  setPhone(  
    institutionData.phone || ""  
  );  

  setCity(  
    institutionData.city || ""  
  );  

  setState(  
    institutionData.state || ""  
  );  

  setDescription(  
    institutionData.description || ""  
  );  
} catch (err) {  
  console.error(  
    "LOAD INSTITUTION PROFILE ERROR:",  
    err  
  );  

  setError(  
    "حدث خطأ غير متوقع أثناء تحميل ملف المؤسسة."  
  );  
} finally {  
  setLoading(false);  
}

}

async function handleSave(
e: React.FormEvent<HTMLFormElement>
) {
e.preventDefault();

if (saving) return;  

setSaving(true);  
setMessage("");  
setError("");  

try {  
  const {  
    data: { user },  
    error: authError,  
  } = await supabase.auth.getUser();  

  if (authError || !user) {  
    setError(  
      "انتهت جلسة تسجيل الدخول. يرجى تسجيل الدخول مرة أخرى."  
    );  

    return;  
  }  

  const cleanName = name.trim();  
  const cleanWebsite = website.trim();  
  const cleanPhone = phone.trim();  
  const cleanCity = city.trim();  
  const cleanState = state.trim();  
  const cleanDescription = description.trim();  

  if (!cleanName) {  
    setError(  
      "يرجى إدخال اسم المؤسسة."  
    );  

    return;  
  }  

  const { data, error: updateError } =  
    await supabase  
      .from("institutions")  
      .update({  
        name: cleanName,  
        website:  
          cleanWebsite || null,  
        phone:  
          cleanPhone || null,  
        city:  
          cleanCity || null,  
        state:  
          cleanState || null,  
        description:  
          cleanDescription || null,  
      })  
      .eq("id", user.id)  
      .select(  
        "id,name,website,phone,city,state,description,created_at,status,verified"  
      )  
      .maybeSingle();  

  if (updateError) {  
    console.error(  
      "UPDATE INSTITUTION ERROR:",  
      updateError  
    );  

    setError(  
      "تعذر حفظ التغييرات: " +  
        updateError.message  
    );  

    return;  
  }  

  if (!data) {  
    setError(  
      "لم يتم تحديث بيانات المؤسسة. تأكد من صلاحيات حسابك."  
    );  

    return;  
  }  

  const updatedInstitution =  
    data as Institution;  

  setInstitution(  
    updatedInstitution  
  );  

  setName(  
    updatedInstitution.name || ""  
  );  

  setWebsite(  
    updatedInstitution.website || ""  
  );  

  setPhone(  
    updatedInstitution.phone || ""  
  );  

  setCity(  
    updatedInstitution.city || ""  
  );  

  setState(  
    updatedInstitution.state || ""  
  );  

  setDescription(  
    updatedInstitution.description || ""  
  );  

  setMessage(  
    "تم حفظ بيانات المؤسسة بنجاح."  
  );  
} catch (err) {  
  console.error(  
    "SAVE INSTITUTION ERROR:",  
    err  
  );  

  setError(  
    "حدث خطأ غير متوقع أثناء حفظ البيانات."  
  );  
} finally {  
  setSaving(false);  
}

}

/*

فتح واتساب مع رسالة جاهزة لطلب توثيق المؤسسة.

ملاحظة:

واتساب لا يسمح للمتصفح بإرفاق الملفات تلقائياً.

لذلك يتم فتح المحادثة بالرسالة الجاهزة،

ثم تقوم المؤسسة بإرفاق مستندات التوثيق يدوياً.
*/
function handleWhatsAppVerification() {
if (!institution) return;


const institutionName =  
  institution.name?.trim() ||  
  name.trim() ||  
  "المؤسسة";  

const institutionPhone =  
  institution.phone?.trim() ||  
  phone.trim() ||  
  "غير مضاف";  

const institutionLocation = [  
  institution.city || city,  
  institution.state || state,  
]  
  .filter(Boolean)  
  .join("، ") || "غير مضاف";  

const institutionWebsite =  
  institution.website?.trim() ||  
  website.trim() ||  
  "غير مضاف";  

const verificationMessage = `

السلام عليكم ورحمة الله وبركاته،

نرغب في توثيق واعتماد مؤسسة "${institutionName}" لدى منصة جسر.

بيانات المؤسسة:

اسم المؤسسة: ${institutionName}
البريد الإلكتروني: ${authEmail || "غير مضاف"}
رقم الهاتف: ${institutionPhone}
الموقع: ${institutionLocation}
الموقع الإلكتروني: ${institutionWebsite}

نرفق لكم المستندات والبيانات التي تثبت صحة المؤسسة واعتمادها، ونرجو مراجعتها وإكمال إجراءات التوثيق.

شاكرين لكم جهودكم.

منصة جسر
Jisr Platform
`.trim();

const whatsappUrl =  
  `https://wa.me/249991893903?text=${encodeURIComponent(  
    verificationMessage  
  )}`;  

window.open(  
  whatsappUrl,  
  "_blank",  
  "noopener,noreferrer"  
);

}

async function handleLogout() {
if (loggingOut) return;

setLoggingOut(true);  
setError("");  
setMessage("");  

try {  
  const { error: logoutError } =  
    await supabase.auth.signOut();  

  if (logoutError) {  
    console.error(  
      "LOGOUT ERROR:",  
      logoutError  
    );  

    setError(  
      "تعذر تسجيل الخروج. يرجى المحاولة مرة أخرى."  
    );  

    return;  
  }  

  router.push("/login");  
  router.refresh();  
} catch (err) {  
  console.error(  
    "UNEXPECTED LOGOUT ERROR:",  
    err  
  );  

  setError(  
    "حدث خطأ أثناء تسجيل الخروج."  
  );  
} finally {  
  setLoggingOut(false);  
}

}

if (loading) {
return (
<main  
dir="rtl"  
className="min-h-screen bg-slate-100"  
>
<div className="flex min-h-screen items-center justify-center px-6">
<div className="text-center">
<div className="mx-auto h-11 w-11 animate-spin rounded-full border-4 border-blue-100 border-t-blue-700" />

<p className="mt-4 font-semibold text-slate-600">  
          جاري تحميل بيانات المؤسسة...  
        </p>  
      </div>  
    </div>  
  </main>  
);

}

if (error && !institution) {
return (
<main  
dir="rtl"  
className="flex min-h-screen items-center justify-center bg-slate-100 px-6"  
>
<div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-xl ring-1 ring-slate-200">
<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
<svg  
viewBox="0 0 24 24"  
fill="none"  
stroke="currentColor"  
strokeWidth="1.8"  
className="h-8 w-8"  
>
<path d="M12 9v4" />
<path d="M12 17h.01" />
<path d="M10.3 3.6 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0Z" />
</svg>
</div>

<h1 className="mt-5 text-2xl font-extrabold text-slate-900">  
        تعذر فتح ملف المؤسسة  
      </h1>  

      <p className="mt-3 leading-7 text-slate-600">  
        {error}  
      </p>  

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">  
        <button  
          type="button"  
          onClick={loadProfile}  
          className="rounded-xl bg-blue-700 px-6 py-3 font-bold text-white transition hover:bg-blue-800"  
        >  
          إعادة المحاولة  
        </button>  

        <Link  
          href="/dashboard/institution"  
          className="rounded-xl border border-slate-200 px-6 py-3 font-bold text-slate-700 transition hover:bg-slate-50"  
        >  
          لوحة المؤسسة  
        </Link>  
      </div>  
    </div>  
  </main>  
);

}

if (!institution) {
return null;
}

const institutionName =
institution.name?.trim() ||
"اسم المؤسسة غير مضاف";

const firstLetter =
institutionName
.charAt(0)
.toUpperCase();

const location = [
institution.city,
institution.state,
]
.filter(Boolean)
.join("، ");

return (
<main  
dir="rtl"  
className="min-h-screen bg-slate-100"  
>
{/* Header */}
<header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
<div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
<div className="flex items-center gap-4">
<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-700 text-white shadow-md">
<svg  
viewBox="0 0 64 64"  
className="h-7 w-7"  
fill="none"  
xmlns="http://www.w3.org/2000/svg"  
>
<path  
d="M8 43C18 23 46 23 56 43"  
stroke="currentColor"  
strokeWidth="5"  
strokeLinecap="round"  
/>

<path  
              d="M8 43H56"  
              stroke="currentColor"  
              strokeWidth="5"  
              strokeLinecap="round"  
            />  

            <path  
              d="M18 43V34"  
              stroke="currentColor"  
              strokeWidth="4"  
              strokeLinecap="round"  
            />  

            <path  
              d="M32 43V29"  
              stroke="currentColor"  
              strokeWidth="4"  
              strokeLinecap="round"  
            />  

            <path  
              d="M46 43V34"  
              stroke="currentColor"  
              strokeWidth="4"  
              strokeLinecap="round"  
            />  
          </svg>  
        </div>  

        <div>  
          <p className="text-xs font-bold text-blue-700">  
            منصة جسر  
          </p>  

          <h1 className="text-xl font-extrabold text-slate-900">  
            ملف المؤسسة  
          </h1>  
        </div>  
      </div>  

      <div className="flex items-center gap-2">  
        <Link  
          href="/dashboard/institution"  
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"  
        >  
          <svg  
            viewBox="0 0 24 24"  
            fill="none"  
            stroke="currentColor"  
            strokeWidth="1.8"  
            className="h-5 w-5"  
          >  
            <path d="M19 12H5" />  
            <path d="m12 19-7-7 7-7" />  
          </svg>  

          لوحة المؤسسة  
        </Link>  

        <button  
          type="button"  
          onClick={handleLogout}  
          disabled={loggingOut}  
          className="hidden items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 sm:inline-flex"  
        >  
          <svg  
            viewBox="0 0 24 24"  
            fill="none"  
            stroke="currentColor"  
            strokeWidth="1.8"  
            className="h-5 w-5"  
          >  
            <path d="M10 17l5-5-5-5" />  
            <path d="M15 12H3" />  
            <path d="M21 4v16" />  
          </svg>  

          {loggingOut  
            ? "جاري الخروج..."  
            : "تسجيل الخروج"}  
        </button>  
      </div>  
    </div>  
  </header>  

  <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">  
    {/* Hero */}  
    <section className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-l from-blue-900 via-blue-800 to-indigo-800 p-6 text-white shadow-xl sm:p-8">  
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/5" />  

      <div className="absolute -bottom-32 right-1/3 h-72 w-72 rounded-full bg-white/5" />  

      <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center">  
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-white text-4xl font-extrabold text-blue-700 shadow-lg">  
          {firstLetter}  
        </div>  

        <div className="min-w-0">  
          <p className="text-sm font-semibold text-blue-100">  
            الحساب المؤسسي  
          </p>  

          <h2 className="mt-1 break-words text-3xl font-extrabold sm:text-4xl">  
            {institutionName}  
          </h2>  

          <div className="mt-4 flex flex-wrap gap-3">  
            <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold ring-1 ring-white/10">  
              مؤسسة  
            </span>  

            {institution.verified ? (  
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-2 text-xs font-bold text-emerald-100 ring-1 ring-emerald-300/20">  
                <svg  
                  viewBox="0 0 24 24"  
                  fill="none"  
                  stroke="currentColor"  
                  strokeWidth="2"  
                  className="h-4 w-4"  
                >  
                  <path d="m5 12 4 4L19 6" />  
                </svg>  

                مؤسسة موثقة  
              </span>  
            ) : (  
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/15 px-4 py-2 text-xs font-bold text-amber-100 ring-1 ring-amber-200/20">  
                غير موثقة  
              </span>  
            )}  
          </div>  

          {location && (  
            <div className="mt-4 flex items-center gap-2 text-sm text-blue-100">  
              <InfoIcon type="location" />  

              {location}  
            </div>  
          )}  
        </div>  
      </div>  
    </section>  

    {/* Messages */}  
    {message && (  
      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 font-semibold text-emerald-700">  
        <svg  
          viewBox="0 0 24 24"  
          fill="none"  
          stroke="currentColor"  
          strokeWidth="2"  
          className="h-5 w-5 shrink-0"  
        >  
          <path d="m5 12 4 4L19 6" />  
        </svg>  

        {message}  
      </div>  
    )}  

    {error && (  
      <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 font-semibold text-red-700">  
        {error}  
      </div>  
    )}  

    {/* Edit Form */}  
    <form  
      onSubmit={handleSave}  
      className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8"  
    >  
      <div className="mb-8">  
        <p className="text-sm font-bold text-blue-700">  
          إدارة البيانات  
        </p>  

        <h2 className="mt-1 text-2xl font-extrabold text-slate-900">  
          تعديل بيانات المؤسسة  
        </h2>  

        <p className="mt-2 text-sm leading-6 text-slate-500">  
          يمكنك تحديث البيانات الأساسية للمؤسسة من هنا.  
        </p>  
      </div>  

      <div className="grid gap-5 md:grid-cols-2">  
        {/* Name */}  
        <div>  
          <label className="mb-2 block text-sm font-bold text-slate-700">  
            اسم المؤسسة  
          </label>  

          <input  
            value={name}  
            onChange={(e) =>  
              setName(e.target.value)  
            }  
            required  
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"  
            placeholder="اسم المؤسسة"  
          />  
        </div>  

        {/* Email */}  
        <div>  
          <label className="mb-2 block text-sm font-bold text-slate-700">  
            البريد الإلكتروني  
          </label>  

          <input  
            type="email"  
            value={authEmail}  
            readOnly  
            className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500 outline-none"  
          />  

          <p className="mt-2 text-xs text-slate-400">  
            البريد الإلكتروني مرتبط بحساب الدخول ولا يتم تغييره من هذه الصفحة.  
          </p>  
        </div>  

        {/* Phone */}  
        <div>  
          <label className="mb-2 block text-sm font-bold text-slate-700">  
            رقم الهاتف  
          </label>  

          <input  
            value={phone}  
            onChange={(e) =>  
              setPhone(e.target.value)  
            }  
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"  
            placeholder="رقم الهاتف"  
          />  
        </div>  

        {/* State */}  
        <div>  
          <label className="mb-2 block text-sm font-bold text-slate-700">  
            الولاية  
          </label>  

          <input  
            value={state}  
            onChange={(e) =>  
              setState(e.target.value)  
            }  
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"  
            placeholder="الولاية"  
          />  
        </div>  

        {/* City */}  
        <div>  
          <label className="mb-2 block text-sm font-bold text-slate-700">  
            المدينة  
          </label>  

          <input  
            value={city}  
            onChange={(e) =>  
              setCity(e.target.value)  
            }  
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"  
            placeholder="المدينة"  
          />  
        </div>  

        {/* Website */}  
        <div>  
          <label className="mb-2 block text-sm font-bold text-slate-700">  
            الموقع الإلكتروني  
          </label>  

          <input  
            type="url"  
            value={website}  
            onChange={(e) =>  
              setWebsite(e.target.value)  
            }  
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"  
            placeholder="https://example.com"  
          />  
        </div>  

        {/* Description */}  
        <div className="md:col-span-2">  
          <label className="mb-2 block text-sm font-bold text-slate-700">  
            نبذة عن المؤسسة  
          </label>  

          <textarea  
            value={description}  
            onChange={(e) =>  
              setDescription(  
                e.target.value  
              )  
            }  
            rows={6}  
            className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 leading-7 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"  
            placeholder="اكتب نبذة مختصرة عن المؤسسة..."  
          />  
        </div>  
      </div>  

      {/* Save buttons */}  
      <div className="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-between">  
        <Link  
          href="/dashboard/institution"  
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-6 py-3 font-bold text-slate-700 transition hover:bg-slate-50"  
        >  
          إلغاء  
        </Link>  

        <button  
          type="submit"  
          disabled={saving}  
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-7 py-3 font-bold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"  
        >  
          {saving ? (  
            <>  
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />  
              جاري حفظ التغييرات...  
            </>  
          ) : (  
            <>  
              <svg  
                viewBox="0 0 24 24"  
                fill="none"  
                stroke="currentColor"  
                strokeWidth="1.8"  
                className="h-5 w-5"  
              >  
                <path d="M5 4h11l3 3v13H5z" />  
                <path d="M8 4v6h8V4" />  
                <path d="M8 20v-6h8v6" />  
              </svg>  

              حفظ التغييرات  
            </>  
          )}  
        </button>  
      </div>  
    </form>  

    {/* Current Information */}  
    <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">  
      <div className="mb-7">  
        <p className="text-sm font-bold text-blue-700">  
          معلومات الحساب  
        </p>  

        <h2 className="mt-1 text-2xl font-extrabold text-slate-900">  
          البيانات الحالية  
        </h2>  
      </div>  

      <div className="grid gap-4 sm:grid-cols-2">  
        <InfoCard  
          icon="building"  
          label="اسم المؤسسة"  
          value={institution.name}  
        />  

        <InfoCard  
          icon="email"  
          label="البريد الإلكتروني"  
          value={authEmail}  
        />  

        <InfoCard  
          icon="phone"  
          label="رقم الهاتف"  
          value={institution.phone}  
        />  

        <InfoCard  
          icon="location"  
          label="الموقع"  
          value={location}  
        />  

        <InfoCard  
          icon="website"  
          label="الموقع الإلكتروني"  
          value={institution.website}  
        />  

        <InfoCard  
          icon="status"  
          label="حالة الحساب"  
          value={statusLabel(  
            institution.status  
          )}  
        />  
      </div>  
    </section>  

    {/* Verification */}  
    <section className="mt-6 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">  
      <div className="border-b border-slate-100 p-6 sm:p-8">  
        <div className="flex items-start gap-4">  
          <div  
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${  
              institution.verified  
                ? "bg-emerald-100 text-emerald-700"  
                : "bg-amber-100 text-amber-700"  
            }`}  
          >  
            {institution.verified ? (  
              <svg  
                viewBox="0 0 24 24"  
                fill="none"  
                stroke="currentColor"  
                strokeWidth="2"  
                className="h-6 w-6"  
              >  
                <path d="m5 12 4 4L19 6" />  
              </svg>  
            ) : (  
              <svg  
                viewBox="0 0 24 24"  
                fill="none"  
                stroke="currentColor"  
                strokeWidth="1.8"  
                className="h-6 w-6"  
              >  
                <circle  
                  cx="12"  
                  cy="12"  
                  r="9"  
                />  
                <path d="M12 7v5" />  
                <path d="M12 16h.01" />  
              </svg>  
            )}  
          </div>  

          <div className="min-w-0">  
            <p className="text-sm font-bold text-blue-700">  
              توثيق المؤسسة  
            </p>  

            <h2 className="mt-1 text-2xl font-extrabold text-slate-900">  
              حالة التوثيق والاعتماد  
            </h2>  

            <p className="mt-2 text-sm leading-7 text-slate-500">  
              يساعد توثيق المؤسسة على تأكيد صحة بياناتها  
              ورفع مستوى الثقة في الفرص التي تنشرها عبر منصة جسر.  
            </p>  
          </div>  
        </div>  
      </div>  

      <div className="p-6 sm:p-8">  
        {institution.verified ? (  
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">  
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">  
              <div className="flex items-start gap-4">  
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">  
                  <svg  
                    viewBox="0 0 24 24"  
                    fill="none"  
                    stroke="currentColor"  
                    strokeWidth="2"  
                    className="h-6 w-6"  
                  >  
                    <path d="m5 12 4 4L19 6" />  
                  </svg>  
                </div>  

                <div>  
                  <p className="font-extrabold text-emerald-800">  
                    مؤسسة موثقة ومعتمدة  
                  </p>  

                  <p className="mt-1 text-sm leading-6 text-emerald-700">  
                    تم اعتماد المؤسسة من قبل إدارة منصة جسر.  
                  </p>  
                </div>  
              </div>  
            </div>  
          </div>  
        ) : (  
          <div>  
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">  
              <div className="flex items-start gap-4">  
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">  
                  <svg  
                    viewBox="0 0 24 24"  
                    fill="none"  
                    stroke="currentColor"  
                    strokeWidth="1.8"  
                    className="h-6 w-6"  
                  >  
                    <circle  
                      cx="12"  
                      cy="12"  
                      r="9"  
                    />  
                    <path d="M12 7v5" />  
                    <path d="M12 16h.01" />  
                  </svg>  
                </div>  

                <div>  
                  <p className="font-extrabold text-amber-800">  
                    المؤسسة غير موثقة حتى الآن  
                  </p>  

                  <p className="mt-2 text-sm leading-7 text-amber-700">  
                    لإكمال عملية التوثيق، يرجى التواصل مع  
                    إدارة منصة جسر وإرسال المستندات التي تثبت  
                    صحة المؤسسة وبياناتها.  
                  </p>  
                </div>  
              </div>  
            </div>  

            {/* Required Documents */}  
            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-6">  
              <h3 className="text-base font-extrabold text-slate-900">  
                المستندات والبيانات المطلوبة للتوثيق  
              </h3>  

              <div className="mt-4 grid gap-3 sm:grid-cols-2">  
                <div className="flex items-start gap-3 rounded-xl bg-white p-4 ring-1 ring-slate-200">  
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-extrabold text-blue-700">  
                    1  
                  </span>  

                  <p className="text-sm font-semibold leading-6 text-slate-600">  
                    مستند رسمي يثبت تسجيل أو اعتماد المؤسسة.  
                  </p>  
                </div>  

                <div className="flex items-start gap-3 rounded-xl bg-white p-4 ring-1 ring-slate-200">  
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-extrabold text-blue-700">  
                    2  
                  </span>  

                  <p className="text-sm font-semibold leading-6 text-slate-600">  
                    خطاب أو مستند يثبت صفة المؤسسة وممثلها.  
                  </p>  
                </div>  

                <div className="flex items-start gap-3 rounded-xl bg-white p-4 ring-1 ring-slate-200">  
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-extrabold text-blue-700">  
                    3  
                  </span>  

                  <p className="text-sm font-semibold leading-6 text-slate-600">  
                    بيانات التواصل الرسمية للمؤسسة.  
                  </p>  
                </div>  

                <div className="flex items-start gap-3 rounded-xl bg-white p-4 ring-1 ring-slate-200">  
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-extrabold text-blue-700">  
                    4  
                  </span>  

                  <p className="text-sm font-semibold leading-6 text-slate-600">  
                    أي مستندات إضافية قد تساعد في إثبات صحة المؤسسة.  
                  </p>  
                </div>  
              </div>  

              <p className="mt-4 text-xs leading-6 text-slate-400">  
                يرجى إرسال المستندات الرسمية فقط، والتأكد من  
                وضوح البيانات الظاهرة فيها.  
              </p>  
            </div>  

            {/* WhatsApp Verification */}  
            <div className="mt-5 overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50">  
              <div className="p-6">  
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">  
                  <div className="flex items-start gap-4">  
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-sm">  
                      <svg  
                        viewBox="0 0 24 24"  
                        fill="none"  
                        stroke="currentColor"  
                        strokeWidth="1.8"  
                        className="h-7 w-7"  
                      >  
                        <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z" />  
                        <path d="M8.5 8.5c.3 1.7 1.8 3.7 3.4 4.7 1.1.7 2.1.9 2.7.4l.8-.8" />  
                      </svg>  
                    </div>  

                    <div>  
                      <p className="text-sm font-bold text-emerald-700">  
                        التواصل مع إدارة منصة جسر  
                      </p>  

                      <h3 className="mt-1 text-lg font-extrabold text-slate-900">  
                        إرسال طلب التوثيق عبر واتساب  
                      </h3>  

                      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">  
                        اضغط على الزر لفتح محادثة واتساب مع  
                        إدارة منصة جسر. سيتم تجهيز رسالة التوثيق  
                        تلقائيًا ببيانات مؤسستك.  
                      </p>  
                    </div>  
                  </div>  

                  <button  
                    type="button"  
                    onClick={handleWhatsAppVerification}  
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-emerald-700 hover:shadow-md active:scale-[0.98]"  
                  >  
                    <svg  
                      viewBox="0 0 24 24"  
                      fill="none"  
                      stroke="currentColor"  
                      strokeWidth="1.8"  
                      className="h-5 w-5"  
                    >  
                      <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z" />  
                      <path d="M8.5 8.5c.3 1.7 1.8 3.7 3.4 4.7 1.1.7 2.1.9 2.7.4l.8-.8" />  
                    </svg>  

                    توثيق المؤسسة عبر واتساب  
                  </button>  
                </div>  
              </div>  

              <div className="border-t border-emerald-200 bg-white/60 px-6 py-4">  
                <p className="text-xs font-semibold leading-6 text-slate-500">  
                  بعد فتح واتساب، أرفق المستندات المطلوبة في  
                  المحادثة ثم أرسل الرسالة.  
                </p>  
              </div>  
            </div>  
          </div>  
        )}  
      </div>  
    </section>  

    {/* Description */}  
    <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">  
      <div className="flex items-center gap-3">  
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">  
          <InfoIcon type="description" />  
        </div>  

        <div>  
          <h2 className="text-lg font-extrabold text-slate-900">  
            نبذة عن المؤسسة  
          </h2>  

          <p className="text-xs font-medium text-slate-400">  
            الوصف المسجل في المنصة  
          </p>  
        </div>  
      </div>  

      <div className="mt-5">  
        {institution.description ? (  
          <p className="whitespace-pre-line text-sm leading-8 text-slate-600">  
            {institution.description}  
          </p>  
        ) : (  
          <div className="rounded-2xl bg-slate-50 p-5 text-center">  
            <p className="text-sm font-semibold text-slate-400">  
              لم تتم إضافة نبذة عن المؤسسة بعد.  
            </p>  
          </div>  
        )}  
      </div>  
    </section>  

    {/* Mobile logout */}  
    <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:hidden">  
      <h2 className="text-lg font-extrabold text-slate-900">  
        إعدادات الحساب  
      </h2>  

      <p className="mt-2 text-sm leading-6 text-slate-500">  
        يمكنك تسجيل الخروج من حساب المؤسسة على هذا الجهاز.  
      </p>  

      <button  
        type="button"  
        onClick={handleLogout}  
        disabled={loggingOut}  
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-6 py-3 font-bold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"  
      >  
        <svg  
          viewBox="0 0 24 24"  
          fill="none"  
          stroke="currentColor"  
          strokeWidth="1.8"  
          className="h-5 w-5"  
        >  
          <path d="M10 17l5-5-5-5" />  
          <path d="M15 12H3" />  
          <path d="M21 4v16" />  
        </svg>  

        {loggingOut  
          ? "جاري تسجيل الخروج..."  
          : "تسجيل الخروج"}  
      </button>  
    </section>  

    {/* Footer */}  
    <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 text-center">  
      <p className="text-sm font-medium leading-6 text-blue-800">  
        هذه الصفحة مرتبطة مباشرة ببيانات المؤسسة  
        والحساب الحالي في منصة جسر.  
      </p>  
    </div>  
  </div>  
</main>

);
}

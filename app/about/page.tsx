"use client";

import Link from "next/link";

function BridgeLogo({
  className = "h-10 w-10",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
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
  );
}

function BriefcaseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
      <path d="M3 12h18" />
      <path d="M10 12v2h4v-2" />
    </svg>
  );
}

function GraduationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="m3 9 9-5 9 5-9 5-9-5Z" />
      <path d="M7 11.2V16c3.3 2.2 6.7 2.2 10 0v-4.8" />
      <path d="M21 9v6" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M20.8 8.7c0 5.5-8.8 10.2-8.8 10.2S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.5Z" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.5a3 3 0 0 1 0 5.8" />
      <path d="M16.5 14.5a5 5 0 0 1 4 4.5" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M19 12H5" />
      <path d="m11 18-6-6 6-6" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.5 22v-8h2.8l.4-3h-3.2V9.1c0-.9.3-1.6 1.7-1.6h1.8V4.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V11H8v3h2.6v8h2.9Z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M21.7 3.4 18.4 20c-.2 1.2-.9 1.5-1.8.9l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1 9.2-8.3c.4-.4-.1-.6-.6-.2L6 13.5l-4.9-1.5c-1.1-.3-1.1-1 .2-1.5L20.5 3c.9-.3 1.7.2 1.2.4Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 text-slate-900"
    >
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-700 text-white shadow-md shadow-blue-700/20">
              <BridgeLogo className="h-7 w-7" />
            </div>

            <div>
              <div className="text-xl font-extrabold text-slate-900">
                جسر
              </div>

              <div className="text-[11px] font-medium text-slate-500">
                منصة الفرص
              </div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
            <Link
              href="/"
              className="transition hover:text-blue-700"
            >
              الرئيسية
            </Link>

            <Link
              href="/opportunities"
              className="transition hover:text-blue-700"
            >
              الفرص
            </Link>

            <Link
              href="/about"
              className="text-blue-700"
            >
              من نحن
            </Link>

            <Link
              href="/contact"
              className="transition hover:text-blue-700"
            >
              تواصل معنا
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="hidden rounded-xl px-4 py-2.5 text-sm font-bold text-blue-700 transition hover:bg-blue-50 sm:block"
            >
              تسجيل الدخول
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-700/20 transition hover:bg-blue-800"
            >
              إنشاء حساب
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 text-white">
        <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-white/10" />
        <div className="absolute -bottom-36 -left-20 h-96 w-96 rounded-full bg-white/5" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-50 backdrop-blur">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-blue-700">
                <BridgeLogo className="h-5 w-5" />
              </span>

              منصة جسر
            </div>

            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              نبني جسراً بين
              <span className="block text-blue-200">
                الطموح والفرصة
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-9 text-blue-100 sm:text-xl">
              جسر منصة رقمية تهدف إلى تسهيل وصول الطلاب والخريجين
              إلى فرص التدريب والعمل والتطوع والتعاون، وربطهم
              بالمؤسسات والجهات الباحثة عن المواهب والكفاءات.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/opportunities"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-6 py-3.5 font-bold text-blue-800 shadow-xl transition hover:bg-blue-50"
              >
                استكشف الفرص
                <ArrowLeftIcon />
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 font-bold text-white backdrop-blur transition hover:bg-white/15"
              >
                انضم إلى جسر
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          
          <div>
            <p className="text-sm font-bold text-blue-700">
              من نحن
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              مساحة تجمع الكفاءات
              <span className="text-blue-700"> بالفرص</span>
            </h2>

            <p className="mt-6 text-lg leading-9 text-slate-600">
              جاءت فكرة جسر من الحاجة إلى مساحة رقمية أكثر
              سهولة ووضوحاً تساعد الشباب على الوصول إلى الفرص
              المناسبة، وتساعد المؤسسات على اكتشاف الكفاءات
              والمواهب.
            </p>

            <p className="mt-5 leading-8 text-slate-500">
              نسعى إلى بناء بيئة رقمية تربط بين أصحاب الطموح
              والجهات التي توفر الفرص، مع التركيز على سهولة
              الاستخدام، وضوح المعلومات، وتسهيل عملية التقديم
              ومتابعة الطلبات.
            </p>
          </div>

          <div className="relative">
            <div className="rounded-3xl bg-gradient-to-br from-blue-700 to-indigo-900 p-8 shadow-2xl">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-8 backdrop-blur">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-lg">
                  <BridgeLogo className="h-10 w-10" />
                </div>

                <h3 className="mt-7 text-2xl font-bold text-white">
                  جسر بين المواهب والفرص
                </h3>

                <p className="mt-4 leading-8 text-blue-100">
                  نعمل على تسهيل رحلة البحث عن الفرصة من لحظة
                  اكتشافها وحتى التقديم ومتابعة الطلب.
                </p>

                <div className="mt-7 h-px bg-white/10" />

                <p className="mt-6 text-sm leading-7 text-blue-100">
                  منصة رقمية تهدف إلى بناء شبكة أكثر ترابطاً
                  بين الشباب والمؤسسات.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-16 lg:grid-cols-2 lg:px-8">
          
          <div className="rounded-3xl border border-blue-100 bg-blue-50/70 p-8 sm:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-700 text-white">
              <BridgeLogo className="h-7 w-7" />
            </div>

            <h2 className="mt-6 text-2xl font-extrabold">
              رؤيتنا
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              أن تصبح جسر منصة موثوقة تربط الكفاءات بالفرص،
              وتساهم في بناء مستقبل مهني أفضل للشباب، وتدعم
              المؤسسات في الوصول إلى المواهب المناسبة.
            </p>
          </div>

          <div className="rounded-3xl border border-indigo-100 bg-indigo-50/70 p-8 sm:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-700 text-white">
              <UsersIcon />
            </div>

            <h2 className="mt-6 text-2xl font-extrabold">
              رسالتنا
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              توفير مساحة رقمية بسيطة وموثوقة تساعد الشباب على
              اكتشاف الفرص المناسبة، وتساعد المؤسسات على الوصول
              إلى المواهب والكفاءات بطريقة أكثر سهولة وفعالية.
            </p>
          </div>

        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold text-blue-700">
            ماذا تقدم جسر؟
          </p>

          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            فرص متعددة في مكان واحد
          </h2>

          <p className="mt-4 leading-8 text-slate-500">
            نوفر مساحة تساعدك على اكتشاف أنواع مختلفة من الفرص
            وتحديد المسار الأنسب لك.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white">
              <GraduationIcon />
            </div>

            <h3 className="mt-6 text-xl font-bold">
              التدريب
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              فرص تساعدك على اكتساب الخبرة والمهارات العملية
              وبناء أساس مهني قوي.
            </p>
          </div>

          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700 transition group-hover:bg-indigo-700 group-hover:text-white">
              <BriefcaseIcon />
            </div>

            <h3 className="mt-6 text-xl font-bold">
              العمل
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              اكتشف الوظائف والفرص المهنية التي تتناسب مع
              مهاراتك وطموحاتك.
            </p>
          </div>

          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-700 group-hover:text-white">
              <HeartIcon />
            </div>

            <h3 className="mt-6 text-xl font-bold">
              التطوع
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              شارك في المبادرات والأنشطة التي تساعدك على
              تطوير خبراتك وخدمة مجتمعك.
            </p>
          </div>

          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-700 transition group-hover:bg-purple-700 group-hover:text-white">
              <UsersIcon />
            </div>

            <h3 className="mt-6 text-xl font-bold">
              التعاون
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              فرص للتعاون بين الكفاءات والمؤسسات والمبادرات
              والمشاريع المختلفة.
            </p>
          </div>

        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-100">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-bold text-blue-700">
              كيف تعمل جسر؟
            </p>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              رحلة بسيطة نحو الفرصة
            </h2>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-4">
            
            {[
              {
                number: "01",
                title: "أنشئ حسابك",
                text: "أنشئ حساباً وأكمل بياناتك الأساسية.",
              },
              {
                number: "02",
                title: "اكتشف الفرص",
                text: "تصفح الفرص المتاحة وابحث عن الأنسب لك.",
              },
              {
                number: "03",
                title: "قدّم طلبك",
                text: "أرسل طلب التقديم والبيانات المطلوبة.",
              },
              {
                number: "04",
                title: "تابع طلبك",
                text: "تابع حالة طلبك واستقبل الإشعارات والتحديثات.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="relative rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200"
              >
                <span className="text-sm font-extrabold text-blue-700">
                  {step.number}
                </span>

                <h3 className="mt-5 text-xl font-bold">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {step.text}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-700 text-white">
              <GraduationIcon />
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              للطلاب والخريجين
            </h3>

            <p className="mt-4 leading-8 text-slate-500">
              اكتشف فرص التدريب والعمل والتطوع والتعاون التي
              تساعدك على تطوير مسارك الأكاديمي والمهني.
            </p>

            <Link
              href="/opportunities"
              className="mt-6 inline-flex items-center gap-2 font-bold text-blue-700 hover:text-blue-800"
            >
              استكشف الفرص
              <ArrowLeftIcon />
            </Link>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-blue-700 to-indigo-900 p-8 text-white shadow-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-blue-700">
              <BriefcaseIcon />
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              للمؤسسات
            </h3>

            <p className="mt-4 leading-8 text-blue-100">
              انشر فرصك واستقبل طلبات المتقدمين وساعد في الوصول
              إلى المواهب والكفاءات المناسبة.
            </p>

            <Link
              href="/register"
              className="mt-6 inline-flex items-center gap-2 font-bold text-white hover:text-blue-100"
            >
              انضم كمؤسسة
              <ArrowLeftIcon />
            </Link>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <UsersIcon />
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              للمجتمع
            </h3>

            <p className="mt-4 leading-8 text-slate-500">
              نعمل على بناء شبكة أكثر ترابطاً تساعد على توسيع
              الوصول إلى الفرص والكفاءات والمبادرات.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 font-bold text-blue-700 hover:text-blue-800"
            >
              تواصل معنا
              <ArrowLeftIcon />
            </Link>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 text-white">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/5" />

        <div className="relative mx-auto max-w-4xl px-6 py-20 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-xl">
            <BridgeLogo className="h-10 w-10" />
          </div>

          <h2 className="mt-7 text-3xl font-extrabold sm:text-4xl">
            هل تبحث عن فرصتك القادمة؟
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-100">
            ابدأ رحلتك مع جسر واكتشف الفرص التي يمكن أن تساعدك
            على بناء مستقبلك.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/opportunities"
              className="rounded-xl bg-white px-7 py-3.5 font-bold text-blue-800 shadow-lg transition hover:bg-blue-50"
            >
              استكشف الفرص
            </Link>

            <Link
              href="/register"
              className="rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 font-bold text-white transition hover:bg-white/15"
            >
              إنشاء حساب
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-300">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid gap-10 md:grid-cols-4">
            
            {/* Brand */}
            <div className="md:col-span-2">
              <Link
                href="/"
                className="flex items-center gap-3"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-700 text-white">
                  <BridgeLogo className="h-7 w-7" />
                </div>

                <div>
                  <div className="text-xl font-extrabold text-white">
                    جسر
                  </div>

                  <div className="text-xs text-slate-500">
                    منصة الفرص
                  </div>
                </div>
              </Link>

              <p className="mt-5 max-w-md leading-8 text-slate-400">
                منصة رقمية تربط الطلاب والخريجين بالمؤسسات
                والفرص، وتساعد على بناء جسور جديدة بين الطموح
                والإمكانات.
              </p>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-bold text-white">
                روابط
              </h3>

              <div className="mt-5 space-y-3 text-sm">
                <Link
                  href="/"
                  className="block transition hover:text-white"
                >
                  الرئيسية
                </Link>

                <Link
                  href="/opportunities"
                  className="block transition hover:text-white"
                >
                  الفرص
                </Link>

                <Link
                  href="/about"
                  className="block transition hover:text-white"
                >
                  من نحن
                </Link>

                <Link
                  href="/contact"
                  className="block transition hover:text-white"
                >
                  تواصل معنا
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold text-white">
                تواصل معنا
              </h3>

              <div className="mt-5 space-y-4">
                <a
                  href="https://www.facebook.com/share/1EHXzj38uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm transition hover:text-white"
                >
                  <FacebookIcon />
                  Facebook
                </a>

                <a
                  href="https://t.me/Jisr_Sudan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm transition hover:text-white"
                >
                  <TelegramIcon />
                  Telegram
                </a>

                <a
                  href="mailto:jisrsudan@gmail.com"
                  className="flex items-center gap-3 text-sm transition hover:text-white"
                >
                  <MailIcon />
                  jisrsudan@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} جسر — جميع الحقوق محفوظة.
          </div>
        </div>
      </footer>
    </main>
  );
}

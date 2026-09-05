"use client";

import Link from "next/link";
import { useState } from "react";

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.6 1.7-1.6h1.8V3.8c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.5v3h2.8v8h3.2Z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M21.4 4.6 18.2 19c-.2 1-1 1.3-1.8.8l-4.8-3.6-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.9 8.9-8c.4-.4-.1-.6-.6-.2L6 12.8 1.3 11.3c-1-.3-1-1 .2-1.5L20 2.6c.9-.3 1.7.2 1.4 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
      />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function BridgeLogo() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-9 w-9"
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

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setSent(true);

    setTimeout(() => {
      setSent(false);
    }, 5000);
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50"
    >
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-700 text-white shadow-lg shadow-blue-700/20">
              <BridgeLogo />
            </div>

            <div>
              <h1 className="text-xl font-extrabold text-slate-900">
                جسر
              </h1>

              <p className="text-xs text-slate-500">
                منصة الفرص
              </p>
            </div>
          </Link>

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
              className="transition hover:text-blue-700"
            >
              من نحن
            </Link>

            <Link
              href="/contact"
              className="text-blue-700"
            >
              تواصل معنا
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100 sm:block"
            >
              تسجيل الدخول
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
            >
              إنشاء حساب
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 px-6 py-20 text-white">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />
        <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-white/5" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-xl">
            <MailIcon />
          </div>

          <h2 className="mt-7 text-4xl font-extrabold tracking-tight md:text-5xl">
            تواصل معنا
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-100">
            نحن هنا للاستماع إليك ومساعدتك.
            إذا كانت لديك استفسارات أو اقتراحات أو
            ملاحظات حول منصة جسر، يسعدنا التواصل معك.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-8 lg:grid-cols-5">

          {/* Contact information */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-100">
              <h2 className="text-2xl font-extrabold text-slate-900">
                معلومات التواصل
              </h2>

              <p className="mt-3 leading-7 text-slate-500">
                يمكنك التواصل مع فريق جسر من خلال
                القنوات التالية.
              </p>

              {/* Email */}
              <a
                href="mailto:jisrsudan@gmail.com"
                className="mt-8 flex items-center gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-blue-200 hover:bg-blue-50"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <MailIcon />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-500">
                    البريد الإلكتروني
                  </p>

                  <p className="mt-1 truncate font-bold text-slate-800">
                    jisrsudan@gmail.com
                  </p>
                </div>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/1EHXzj38uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-blue-200 hover:bg-blue-50"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <FacebookIcon />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    فيسبوك
                  </p>

                  <p className="mt-1 font-bold text-slate-800">
                    صفحة جسر على فيسبوك
                  </p>
                </div>
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/Jisr_Sudan"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-blue-200 hover:bg-blue-50"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <TelegramIcon />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    تلغرام
                  </p>

                  <p className="mt-1 font-bold text-slate-800">
                    قناة جسر على تلغرام
                  </p>
                </div>
              </a>

              {/* Location */}
              <div className="mt-4 flex items-center gap-4 rounded-2xl border border-slate-200 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <LocationIcon />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    نطاق عمل المنصة
                  </p>

                  <p className="mt-1 font-bold text-slate-800">
                    السودان
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-100 md:p-10">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  أرسل لنا رسالة
                </h2>

                <p className="mt-3 leading-7 text-slate-500">
                  املأ النموذج التالي وسيتواصل معك فريق
                  جسر عند الحاجة.
                </p>
              </div>

              {sent && (
                <div
                  role="status"
                  className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold leading-6 text-emerald-700"
                >
                  تم إرسال رسالتك بنجاح. شكرًا لتواصلك
                  مع منصة جسر.
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-6"
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      الاسم الكامل
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="أدخل اسمك الكامل"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      البريد الإلكتروني
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="example@email.com"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-left outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    موضوع الرسالة
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="ما موضوع رسالتك؟"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    الرسالة
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={7}
                    required
                    placeholder="اكتب رسالتك هنا..."
                    className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-700 py-4 font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                  إرسال الرسالة
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-l from-blue-700 to-indigo-800 px-8 py-12 text-center text-white shadow-xl">
          <h2 className="text-3xl font-extrabold">
            هل تبحث عن فرصة جديدة؟
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-100">
            استكشف الفرص المتاحة على منصة جسر وابدأ
            رحلتك نحو الفرصة المناسبة.
          </p>

          <Link
            href="/opportunities"
            className="mt-7 inline-flex rounded-xl bg-white px-7 py-3.5 font-bold text-blue-700 shadow-lg transition hover:bg-blue-50"
          >
            استعراض الفرص
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-center sm:flex-row sm:text-right">
          <div>
            <p className="font-bold text-slate-900">
              جسر
            </p>

            <p className="mt-1 text-sm text-slate-500">
              منصة تربط المواهب بالفرص.
            </p>
          </div>

          <div className="flex items-center gap-5 text-sm text-slate-500">
            <Link
              href="/about"
              className="transition hover:text-blue-700"
            >
              من نحن
            </Link>

            <Link
              href="/opportunities"
              className="transition hover:text-blue-700"
            >
              الفرص
            </Link>

            <Link
              href="/contact"
              className="font-semibold text-blue-700"
            >
              تواصل معنا
            </Link>
          </div>

          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} جسر
          </p>
        </div>
      </footer>
    </main>
  );
}

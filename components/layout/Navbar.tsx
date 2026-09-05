"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          {/* Logo */}

          <Link href="/" className="flex items-center gap-3">

            <Image
              src="/images/logo.png"
              alt="جسر"
              width={60}
              height={60}
              priority
            />

            <div>

              <h1 className="text-2xl font-bold text-blue-700">
                جسر
              </h1>

              <p className="text-sm text-slate-500">
                نجسر الفجوة بين التعليم وسوق العمل
              </p>

            </div>

          </Link>

          {/* Desktop Menu */}

          <nav className="hidden items-center gap-8 text-base font-medium md:flex">

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
              href="/institutions"
              className="transition hover:text-blue-700"
            >
              المؤسسات
            </Link>

            <Link
              href="/about"
              className="transition hover:text-blue-700"
            >
              عن جسر
            </Link>

            <Link
              href="/contact"
              className="transition hover:text-blue-700"
            >
              تواصل معنا
            </Link>

          </nav>

          {/* Desktop Buttons */}

          <div className="hidden items-center gap-3 md:flex">

            <Link
              href="/login"
              className="rounded-xl border border-blue-700 px-5 py-2 font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              تسجيل الدخول
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-blue-700 px-5 py-2 font-semibold text-white transition hover:bg-blue-800"
            >
              إنشاء حساب
            </Link>

          </div>

          {/* Mobile Menu Button */}

          <button
            onClick={() => setOpen(true)}
            className="rounded-lg p-2 transition hover:bg-slate-100 md:hidden"
          >
            <Menu size={30} />
          </button>

        </div>

      </header>

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

"use client";

import Link from "next/link";
import { X } from "lucide-react";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({
  open,
  onClose,
}: MobileMenuProps) {
  if (!open) return null;

  return (
    <>
      {/* الخلفية */}
      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={onClose}
      />

      {/* القائمة */}
      <aside className="fixed right-0 top-0 z-50 h-full w-72 bg-white shadow-xl">

        <div className="flex items-center justify-between border-b p-6">

          <h2 className="text-2xl font-bold text-blue-700">
            جسر
          </h2>

          <button onClick={onClose}>
            <X size={28} />
          </button>

        </div>

        <nav className="flex flex-col p-6 text-lg">

          <Link
            href="/"
            onClick={onClose}
            className="rounded-lg p-3 hover:bg-slate-100"
          >
            الرئيسية
          </Link>

          <Link
            href="/opportunities"
            onClick={onClose}
            className="rounded-lg p-3 hover:bg-slate-100"
          >
            الفرص
          </Link>

          <Link
            href="/institutions"
            onClick={onClose}
            className="rounded-lg p-3 hover:bg-slate-100"
          >
            المؤسسات
          </Link>

          <Link
            href="/about"
            onClick={onClose}
            className="rounded-lg p-3 hover:bg-slate-100"
          >
            عن جسر
          </Link>

          <Link
            href="/contact"
            onClick={onClose}
            className="rounded-lg p-3 hover:bg-slate-100"
          >
            تواصل معنا
          </Link>

          <hr className="my-6" />

          <Link
            href="/login"
            onClick={onClose}
            className="rounded-lg bg-blue-700 py-3 text-center font-semibold text-white hover:bg-blue-800"
          >
            تسجيل الدخول
          </Link>

        </nav>

      </aside>
    </>
  );
}

import Link from "next/link";
import { Mail, Send, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3">

        {/* About */}
        <div>

          <h2 className="text-3xl font-bold text-blue-400">
            جسر
          </h2>

          <p className="mt-5 leading-8 text-slate-300">
            منصة سودانية غير ربحية تهدف إلى
            جسر الفجوة بين التعليم وسوق العمل
            من خلال ربط الخريجين بالمؤسسات
            وتوفير فرص التدريب والعمل والتطوع
            والتعاون.
          </p>

        </div>

        {/* Links */}
        <div>

          <h3 className="mb-5 text-xl font-bold">
            روابط سريعة
          </h3>

          <div className="flex flex-col gap-3">

            <Link href="/">الرئيسية</Link>

            <Link href="/opportunities">الفرص</Link>

            <Link href="/institutions">المؤسسات</Link>

            <Link href="/about">عن جسر</Link>

            <Link href="/contact">تواصل معنا</Link>

          </div>

        </div>

        {/* Contact */}
        <div>

          <h3 className="mb-5 text-xl font-bold">
            تواصل معنا
          </h3>

          <div className="space-y-4">

            <a
              href="mailto:jisrsudan@gmail.com"
              className="flex items-center gap-3 hover:text-blue-300"
            >
              <Mail size={20} />
              <span>jisrsudan@gmail.com</span>
            </a>

            <a
              href="https://t.me/Jisr_Sudan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-blue-300"
            >
              <Send size={20} />
              <span>قناة تيليجرام</span>
            </a>

            <a
              href="https://www.facebook.com/share/1DQfj6Wyqk/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-blue-300"
            >
              <Globe size={20} />
              <span>صفحة فيسبوك</span>
            </a>

          </div>

        </div>

      </div>

      <div className="border-t border-slate-700 py-6 text-center text-slate-400">

        © {new Date().getFullYear()} منصة جسر — جميع الحقوق محفوظة.

      </div>

    </footer>
  );
}

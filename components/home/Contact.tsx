import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section className="bg-slate-50 py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <h2 className="text-4xl font-bold text-slate-900">
            تواصل معنا
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            يسعدنا استقبال استفساراتكم واقتراحاتكم وشراكاتكم.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">

          <div className="rounded-2xl bg-white p-8 shadow-md">

            <Mail className="mb-5 h-10 w-10 text-blue-700" />

            <h3 className="text-xl font-bold">
              البريد الإلكتروني
            </h3>

            <p className="mt-3 text-slate-600">
              info@jisr.sd
            </p>

          </div>

          <div className="rounded-2xl bg-white p-8 shadow-md">

            <Phone className="mb-5 h-10 w-10 text-green-700" />

            <h3 className="text-xl font-bold">
              الهاتف
            </h3>

            <p className="mt-3 text-slate-600">
              سيتم إضافته قريبًا
            </p>

          </div>

          <div className="rounded-2xl bg-white p-8 shadow-md">

            <MapPin className="mb-5 h-10 w-10 text-red-600" />

            <h3 className="text-xl font-bold">
              الموقع
            </h3>

            <p className="mt-3 text-slate-600">
              السودان
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setEmail(user.email || "");
    }

    loadUser();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow">

        <h1 className="text-4xl font-bold text-blue-700">
          لوحة التحكم
        </h1>

        <p className="mt-6">
          مرحباً بك 👋
        </p>

        <p className="mt-2 text-gray-600">
          {email}
        </p>

        <button
          onClick={handleLogout}
          className="mt-8 rounded-xl bg-red-600 px-6 py-3 text-white"
        >
          تسجيل الخروج
        </button>

      </div>
    </main>
  );
}

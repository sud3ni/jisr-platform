"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase-client";

type UserRole =
  | "admin"
  | "graduate"
  | "student"
  | "institution"
  | null;

type Institution = {
  id: string;
  name: string;
  website?: string | null;
  phone?: string | null;
  city?: string | null;
  state?: string | null;
  description?: string | null;
  created_at?: string | null;
  status?: string | null;
  verified?: boolean | null;
};

function BuildingIcon({
  className = "h-6 w-6",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 21h16"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 21V5.5L12 3l6 2.5V21"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 8h1"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 8h1"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h1"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 12h1"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 21v-4h4v4"
      />
    </svg>
  );
}

function LocationIcon({
  className = "h-5 w-5",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"
      />
      <circle cx="12" cy="9" r="2.2" />
    </svg>
  );
}

function SearchIcon({
  className = "h-5 w-5",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path
        strokeLinecap="round"
        d="m16 16 4 4"
      />
    </svg>
  );
}

function ArrowIcon({
  className = "h-4 w-4",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12h14"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m13 6 6 6-6 6"
      />
    </svg>
  );
}

function CheckIcon({
  className = "h-4 w-4",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m5 12 4 4L19 6"
      />
    </svg>
  );
}

function UserIcon({
  className = "h-5 w-5",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" />
      <path
        strokeLinecap="round"
        d="M4 21c.8-4 3.4-6 8-6s7.2 2 8 6"
      />
    </svg>
  );
}

function LogoutIcon({
  className = "h-5 w-5",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 17l5-5-5-5"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12H3"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 19V5a2 2 0 0 0-2-2h-5"
      />
    </svg>
  );
}

function GlobeIcon({
  className = "h-5 w-5",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path
        strokeLinecap="round"
        d="M3 12h18"
      />
      <path
        strokeLinecap="round"
        d="M12 3c2.4 2.5 3.6 5.5 3.6 9S14.4 18.5 12 21"
      />
      <path
        strokeLinecap="round"
        d="M12 3C9.6 5.5 8.4 8.5 8.4 12S9.6 18.5 12 21"
      />
    </svg>
  );
}

function JisrLogo() {
  return (
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
        d="M18 43V34M32 43V29M46 43V34"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function getDashboardPath(role: UserRole) {
  switch (role) {
    case "admin":
      return "/dashboard/admin";

    case "graduate":
      return "/dashboard/graduate";

    case "student":
      return "/dashboard/student";

    case "institution":
      return "/dashboard/institution";

    default:
      return "/opportunities";
  }
}

function getRoleLabel(role: UserRole) {
  switch (role) {
    case "admin":
      return "مسؤول المنصة";

    case "graduate":
      return "حساب خريج";

    case "student":
      return "حساب طالب";

    case "institution":
      return "حساب مؤسسة";

    default:
      return "";
  }
}

export default function InstitutionsPage() {
  const [institutions, setInstitutions] = useState<
    Institution[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [search, setSearch] = useState("");

  const [state, setState] = useState("");

  const [city, setCity] = useState("");

  const [userRole, setUserRole] =
    useState<UserRole>(null);

  const [userName, setUserName] = useState("");

  const [authLoading, setAuthLoading] =
    useState(true);

  useEffect(() => {
    loadPage();
  }, []);

  async function loadPage() {
    setLoading(true);
    setAuthLoading(true);
    setErrorMessage("");

    try {
      /*
       * ============================
       * معرفة المستخدم الحالي
       * ============================
       */

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const {
          data: profile,
          error: profileError,
        } = await supabase
          .from("users")
          .select("full_name, role")
          .eq("id", user.id)
          .maybeSingle();

        if (profileError) {
          console.error(
            "INSTITUTIONS PROFILE ERROR:",
            profileError
          );
        }

        if (profile) {
          setUserName(
            profile.full_name || ""
          );

          setUserRole(
            (profile.role as UserRole) || null
          );
        }
      }

      /*
       * ============================
       * تحميل المؤسسات العامة
       * ============================
       *
       * نعرض فقط المؤسسات التي:
       * status = approved
       * أو verified = true
       *
       * حتى لا تظهر المؤسسات غير المعتمدة.
       */

      const {
        data,
        error,
      } = await supabase
        .from("institutions")
        .select(
          "id,name,website,phone,city,state,description,created_at,status,verified"
        )
        .or(
          "status.eq.approved,verified.eq.true"
        )
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error(
          "INSTITUTIONS LOAD ERROR:",
          error
        );

        setErrorMessage(
          "تعذر تحميل المؤسسات حاليًا."
        );

        setInstitutions([]);
        return;
      }

      setInstitutions(
        (data || []) as Institution[]
      );
    } catch (error) {
      console.error(
        "INSTITUTIONS PAGE ERROR:",
        error
      );

      setErrorMessage(
        "حدث خطأ أثناء تحميل صفحة المؤسسات."
      );
    } finally {
      setLoading(false);
      setAuthLoading(false);
    }
  }

  const states = useMemo(() => {
    return Array.from(
      new Set(
        institutions
          .map((item) => item.state)
          .filter(
            (
              value
            ): value is string =>
              Boolean(value)
          )
      )
    ).sort((a, b) =>
      a.localeCompare(b, "ar")
    );
  }, [institutions]);

  const cities = useMemo(() => {
    return Array.from(
      new Set(
        institutions
          .filter(
            (item) =>
              !state ||
              item.state === state
          )
          .map((item) => item.city)
          .filter(
            (
              value
            ): value is string =>
              Boolean(value)
          )
      )
    ).sort((a, b) =>
      a.localeCompare(b, "ar")
    );
  }, [institutions, state]);

  const filteredInstitutions =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      return institutions.filter(
        (institution) => {
          const matchesSearch =
            !query ||
            institution.name
              .toLowerCase()
              .includes(query) ||
            institution.description
              ?.toLowerCase()
              .includes(query) ||
            institution.city
              ?.toLowerCase()
              .includes(query) ||
            institution.state
              ?.toLowerCase()
              .includes(query);

          const matchesState =
            !state ||
            institution.state === state;

          const matchesCity =
            !city ||
            institution.city === city;

          return (
            matchesSearch &&
            matchesState &&
            matchesCity
          );
        }
      );
    }, [
      institutions,
      search,
      state,
      city,
    ]);

  function resetFilters() {
    setSearch("");
    setState("");
    setCity("");
  }

  async function handleLogout() {
    try {
      await supabase.auth.signOut();

      window.location.href = "/";
    } catch (error) {
      console.error(
        "LOGOUT ERROR:",
        error
      );

      setErrorMessage(
        "تعذر تسجيل الخروج حاليًا."
      );
    }
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 text-slate-900"
    >
      {/* ========================= HEADER ========================= */}

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo */}

          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-700 text-white shadow-md shadow-blue-700/20">
              <JisrLogo />
            </div>

            <div>
              <div className="text-xl font-extrabold tracking-tight text-slate-900">
                جسر
              </div>

              <div className="text-xs font-medium text-slate-500">
                منصة الفرص
              </div>
            </div>
          </Link>

          {/* Navigation */}

          <nav className="hidden items-center gap-1 md:flex">
            <Link
              href="/"
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-blue-700"
            >
              الرئيسية
            </Link>

            <Link
              href="/opportunities"
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-blue-700"
            >
              الفرص
            </Link>

            <Link
              href="/institutions"
              className="rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-700"
            >
              المؤسسات
            </Link>

            <Link
              href="/about"
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-blue-700"
            >
              عن جسر
            </Link>

            <Link
              href="/contact"
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-blue-700"
            >
              تواصل معنا
            </Link>
          </nav>

          {/* User actions */}

          <div className="flex items-center gap-2">
            {authLoading ? (
              <div className="h-10 w-28 animate-pulse rounded-xl bg-slate-100" />
            ) : userRole ? (
              <>
                <Link
                  href={getDashboardPath(
                    userRole
                  )}
                  className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:flex"
                >
                  <UserIcon />

                  <span>
                    {userName ||
                      getRoleLabel(
                        userRole
                      )}
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-100"
                >
                  <LogoutIcon />

                  <span className="hidden sm:inline">
                    تسجيل الخروج
                  </span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100 sm:px-4"
                >
                  تسجيل الدخول
                </Link>

                <Link
                  href="/register"
                  className="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
                >
                  إنشاء حساب
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ========================= HERO ========================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 text-white">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-white/10" />

        <div className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-white/5" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-50">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />

              مؤسسات موثوقة عبر منصة جسر
            </div>

            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              اكتشف المؤسسات
              <br />
              الموجودة على جسر
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
              تعرّف على المؤسسات المعتمدة
              التي تنشر فرص العمل والتدريب
              والتطوع والتعاون عبر منصة جسر.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold">
                مؤسسات معتمدة
              </div>

              <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold">
                فرص مهنية
              </div>

              <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold">
                تدريب وتطوع
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= SEARCH ========================= */}

      <section className="relative z-10 mx-auto -mt-8 max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
          <div className="grid gap-3 md:grid-cols-12">
            {/* Search */}

            <div className="relative md:col-span-6">
              <label className="mb-2 block text-xs font-bold text-slate-500">
                البحث عن مؤسسة
              </label>

              <div className="relative">
                <input
                  type="search"
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  placeholder="ابحث باسم المؤسسة أو المدينة..."
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 pl-11 text-sm outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />

                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <SearchIcon />
                </div>
              </div>
            </div>

            {/* State */}

            <div className="md:col-span-3">
              <label className="mb-2 block text-xs font-bold text-slate-500">
                الولاية
              </label>

              <select
                value={state}
                onChange={(e) => {
                  setState(
                    e.target.value
                  );

                  setCity("");
                }}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
              >
                <option value="">
                  كل الولايات
                </option>

                {states.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* City */}

            <div className="md:col-span-3">
              <label className="mb-2 block text-xs font-bold text-slate-500">
                المدينة
              </label>

              <select
                value={city}
                onChange={(e) =>
                  setCity(
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
              >
                <option value="">
                  كل المدن
                </option>

                {cities.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= CONTENT ========================= */}

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold text-blue-700">
              منصة جسر
            </p>

            <h2 className="mt-1 text-3xl font-extrabold text-slate-900">
              المؤسسات المعتمدة
            </h2>

            <p className="mt-2 text-sm leading-7 text-slate-500">
              تعرّف على الجهات الموجودة على
              منصة جسر واستكشف فرصها.
            </p>
          </div>

          {!loading && (
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600">
              {filteredInstitutions.length} مؤسسة
            </div>
          )}
        </div>

        {/* Error */}

        {errorMessage && (
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm leading-7 text-red-700">
            {errorMessage}
          </div>
        )}

        {/* Loading */}

        {loading ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map(
              (item) => (
                <div
                  key={item}
                  className="h-72 animate-pulse rounded-2xl border border-slate-200 bg-white"
                />
              )
            )}
          </div>
        ) : filteredInstitutions.length ===
          0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
              <BuildingIcon className="h-8 w-8" />
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-800">
              لم نجد مؤسسات مطابقة
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500">
              جرّب تغيير كلمات البحث أو
              الفلاتر للوصول إلى مؤسسات أخرى.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
            >
              إعادة ضبط البحث
            </button>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredInstitutions.map(
              (institution) => (
                <article
                  key={institution.id}
                  className="group flex min-h-[300px] flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                >
                  {/* Top */}

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-100">
                      <BuildingIcon className="h-7 w-7" />
                    </div>

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 ring-1 ring-emerald-100">
                      <CheckIcon className="h-3.5 w-3.5" />
                      موثقة
                    </span>
                  </div>

                  {/* Name */}

                  <div className="mt-6">
                    <h3 className="line-clamp-2 text-xl font-extrabold leading-8 text-slate-900">
                      {institution.name}
                    </h3>

                    {institution.description && (
                      <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-500">
                        {institution.description}
                      </p>
                    )}
                  </div>

                  {/* Location */}

                  {(institution.city ||
                    institution.state) && (
                    <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
                        <LocationIcon />
                      </span>

                      <span>
                        {[
                          institution.city,
                          institution.state,
                        ]
                          .filter(Boolean)
                          .join("، ")}
                      </span>
                    </div>
                  )}

                  {/* Bottom */}

                  <div className="mt-auto pt-6">
                    {institution.website ? (
                      <a
                        href={
                          institution.website.startsWith(
                            "http://"
                          ) ||
                          institution.website.startsWith(
                            "https://"
                          )
                            ? institution.website
                            : `https://${institution.website}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-5 py-3.5 text-sm font-bold text-blue-700 transition hover:bg-blue-100"
                      >
                        <GlobeIcon />
                        زيارة موقع المؤسسة
                        <ArrowIcon />
                      </a>
                    ) : (
                      <div className="flex w-full items-center justify-center rounded-xl bg-slate-50 px-5 py-3.5 text-sm font-semibold text-slate-400">
                        لا يوجد موقع إلكتروني
                      </div>
                    )}
                  </div>
                </article>
              )
            )}
          </div>
        )}
      </section>

      {/* ========================= CTA ========================= */}

      <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-blue-700 to-indigo-900 px-6 py-12 text-center text-white sm:px-12">
          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-white/10" />

          <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-white/5" />

          <div className="relative">
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              هل تبحث عن فرصة؟
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
              استكشف الفرص المنشورة من
              المؤسسات الموجودة على منصة جسر.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/opportunities"
                className="rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-blue-700 shadow-lg transition hover:bg-blue-50"
              >
                استعراض الفرص
              </Link>

              {!userRole && (
                <Link
                  href="/register"
                  className="rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/20"
                >
                  إنشاء حساب
                </Link>
              )}

              {userRole && (
                <Link
                  href={getDashboardPath(
                    userRole
                  )}
                  className="rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/20"
                >
                  العودة إلى لوحتي
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================= FOOTER ========================= */}

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-4">
            {/* About */}

            <div className="md:col-span-2">
              <Link
                href="/"
                className="inline-flex items-center gap-3"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-700 text-white">
                  <JisrLogo />
                </div>

                <div>
                  <div className="text-xl font-extrabold text-slate-900">
                    جسر
                  </div>

                  <div className="text-xs text-slate-500">
                    منصة الفرص
                  </div>
                </div>
              </Link>

              <p className="mt-5 max-w-md text-sm leading-7 text-slate-500">
                منصة جسر تربط الطلاب والخريجين
                بالمؤسسات، وتساعد على الوصول إلى
                فرص التدريب والعمل والتطوع والتعاون
                في مكان واحد.
              </p>
            </div>

            {/* Links */}

            <div>
              <h3 className="font-bold text-slate-900">
                روابط المنصة
              </h3>

              <div className="mt-4 space-y-3 text-sm">
                <Link
                  href="/"
                  className="block text-slate-500 hover:text-blue-700"
                >
                  الرئيسية
                </Link>

                <Link
                  href="/opportunities"
                  className="block text-slate-500 hover:text-blue-700"
                >
                  الفرص
                </Link>

                <Link
                  href="/institutions"
                  className="block text-slate-500 hover:text-blue-700"
                >
                  المؤسسات
                </Link>

                <Link
                  href="/about"
                  className="block text-slate-500 hover:text-blue-700"
                >
                  عن جسر
                </Link>
              </div>
            </div>

            {/* Account */}

            <div>
              <h3 className="font-bold text-slate-900">
                الحساب
              </h3>

              <div className="mt-4 space-y-3 text-sm">
                {userRole ? (
                  <>
                    <Link
                      href={getDashboardPath(
                        userRole
                      )}
                      className="block text-slate-500 hover:text-blue-700"
                    >
                      لوحة التحكم
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="block text-slate-500 transition hover:text-red-600"
                    >
                      تسجيل الخروج
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block text-slate-500 hover:text-blue-700"
                    >
                      تسجيل الدخول
                    </Link>

                    <Link
                      href="/register"
                      className="block text-slate-500 hover:text-blue-700"
                    >
                      إنشاء حساب
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-100 pt-6 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} منصة جسر. جميع الحقوق محفوظة.
          </div>
        </div>
      </footer>
    </main>
  );
}

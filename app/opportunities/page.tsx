"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";

type Opportunity = {
  id: string;
  title: string;
  opportunity_type?: string | null;
  city?: string | null;
  state?: string | null;
  status?: string | null;
  institution_name?: string | null;
  created_at?: string | null;
};

type UserRole =
  | "admin"
  | "graduate"
  | "student"
  | "institution"
  | null;

type SessionUser = {
  id: string;
  email?: string | null;
  full_name?: string | null;
  role: UserRole;
};

const typeOptions = [
  { value: "", label: "كل الأنواع" },
  { value: "training", label: "تدريب" },
  { value: "job", label: "وظيفة" },
  { value: "volunteer", label: "تطوع" },
  { value: "cooperation", label: "تعاون" },
];

function typeLabel(type?: string | null) {
  switch (type) {
    case "training":
      return "تدريب";
    case "job":
      return "وظيفة";
    case "volunteer":
      return "تطوع";
    case "cooperation":
      return "تعاون";
    default:
      return type || "فرصة";
  }
}

function typeBadgeClass(type?: string | null) {
  switch (type) {
    case "training":
      return "bg-blue-50 text-blue-700 ring-blue-100";

    case "job":
      return "bg-indigo-50 text-indigo-700 ring-indigo-100";

    case "volunteer":
      return "bg-emerald-50 text-emerald-700 ring-emerald-100";

    case "cooperation":
      return "bg-purple-50 text-purple-700 ring-purple-100";

    default:
      return "bg-slate-50 text-slate-700 ring-slate-100";
  }
}

function getDashboardPath(role: UserRole) {
  switch (role) {
    case "admin":
      return "/dashboard/admin";

    case "institution":
      return "/dashboard/institution";

    case "student":
      return "/dashboard/student";

    case "graduate":
      return "/dashboard/graduate";

    default:
      return "/dashboard";
  }
}

function getRoleLabel(role: UserRole) {
  switch (role) {
    case "admin":
      return "مدير النظام";

    case "institution":
      return "حساب مؤسسة";

    case "student":
      return "حساب طالب";

    case "graduate":
      return "حساب خريج";

    default:
      return "حساب مستخدم";
  }
}

function BuildingIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
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

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
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

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
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

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
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

function LogoutIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 5H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 8l4 4-4 4"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 12H9"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="8" r="4" />

      <path
        strokeLinecap="round"
        d="M4 21c.8-4 3.4-6 8-6s7.2 2 8 6"
      />
    </svg>
  );
}

function BridgeLogo({
  light = false,
}: {
  light?: boolean;
}) {
  return (
    <div
      className={`flex h-11 w-11 items-center justify-center rounded-xl shadow-sm ${
        light
          ? "bg-white text-blue-700"
          : "bg-blue-700 text-white"
      }`}
    >
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
  );
}

export default function OpportunitiesPage() {
  const router = useRouter();

  const [opportunities, setOpportunities] =
    useState<Opportunity[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [type, setType] =
    useState("");

  const [state, setState] =
    useState("");

  const [city, setCity] =
    useState("");

  /*
   * حالة المستخدم والجلسة
   */
  const [sessionUser, setSessionUser] =
    useState<SessionUser | null>(null);

  const [authLoading, setAuthLoading] =
    useState(true);

  const [loggingOut, setLoggingOut] =
    useState(false);

  /*
   * تحميل حالة الجلسة
   */
  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      setAuthLoading(true);

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!mounted) return;

        if (!user) {
          setSessionUser(null);
          return;
        }

        /*
         * جلب بيانات المستخدم من جدول users
         */
        const {
          data: profile,
          error,
        } = await supabase
          .from("users")
          .select("full_name, role")
          .eq("id", user.id)
          .maybeSingle();

        if (error) {
          console.error(
            "SESSION PROFILE ERROR:",
            error
          );

          /*
           * إذا كانت الجلسة موجودة ولكن بيانات
           * المستخدم غير موجودة، نحتفظ بالمستخدم
           * دون افتراض صلاحية.
           */
          setSessionUser({
            id: user.id,
            email: user.email,
            full_name: null,
            role: null,
          });

          return;
        }

        const role =
          profile?.role === "admin" ||
          profile?.role === "graduate" ||
          profile?.role === "student" ||
          profile?.role === "institution"
            ? profile.role
            : null;

        setSessionUser({
          id: user.id,
          email: user.email,
          full_name: profile?.full_name || null,
          role,
        });
      } catch (error) {
        console.error(
          "SESSION LOAD ERROR:",
          error
        );

        if (mounted) {
          setSessionUser(null);
        }
      } finally {
        if (mounted) {
          setAuthLoading(false);
        }
      }
    }

    loadSession();

    /*
     * متابعة تسجيل الدخول والخروج وتحديث الجلسة
     * تلقائيًا.
     */
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        if (
          event === "SIGNED_OUT" ||
          !session?.user
        ) {
          setSessionUser(null);
          setAuthLoading(false);
          return;
        }

        /*
         * لا نقوم بأي افتراض حول الصلاحية.
         * نقرأ role من جدول users.
         */
        const user = session.user;

        /*
         * تأخير صغير يمنع بعض حالات السباق
         * بين تحديث جلسة Supabase وقراءة البيانات.
         */
        setTimeout(async () => {
          if (!mounted) return;

          try {
            const {
              data: profile,
              error,
            } = await supabase
              .from("users")
              .select("full_name, role")
              .eq("id", user.id)
              .maybeSingle();

            if (!mounted) return;

            if (error) {
              console.error(
                "AUTH PROFILE ERROR:",
                error
              );

              setSessionUser({
                id: user.id,
                email: user.email,
                full_name: null,
                role: null,
              });

              return;
            }

            const role =
              profile?.role === "admin" ||
              profile?.role === "graduate" ||
              profile?.role === "student" ||
              profile?.role === "institution"
                ? profile.role
                : null;

            setSessionUser({
              id: user.id,
              email: user.email,
              full_name:
                profile?.full_name || null,
              role,
            });
          } catch (error) {
            console.error(
              "AUTH PROFILE LOAD ERROR:",
              error
            );
          } finally {
            if (mounted) {
              setAuthLoading(false);
            }
          }
        }, 0);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  /*
   * تسجيل الخروج
   */
  async function handleLogout() {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      const { error } =
        await supabase.auth.signOut();

      if (error) {
        console.error(
          "LOGOUT ERROR:",
          error
        );

        setErrorMessage(
          "تعذر تسجيل الخروج حاليًا. حاول مرة أخرى."
        );

        setLoggingOut(false);
        return;
      }

      setSessionUser(null);

      /*
       * العودة إلى الصفحة الرئيسية بعد الخروج.
       */
      router.push("/");

      router.refresh();
    } catch (error) {
      console.error(
        "LOGOUT EXCEPTION:",
        error
      );

      setErrorMessage(
        "حدث خطأ أثناء تسجيل الخروج."
      );

      setLoggingOut(false);
    }
  }

  /*
   * تحميل الفرص
   */
  async function loadOpportunities() {
    setLoading(true);
    setErrorMessage("");

    try {
      const {
        data,
        error,
      } = await supabase
        .from("opportunities")
        .select(
          "id,title,opportunity_type,city,state,status,institution_name,created_at"
        )
        .eq("status", "published")
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error(
          "OPPORTUNITIES ERROR:",
          error
        );

        setErrorMessage(
          "تعذر تحميل الفرص حاليًا."
        );

        setOpportunities([]);
        return;
      }

      setOpportunities(
        (data || []) as Opportunity[]
      );
    } catch (error) {
      console.error(
        "LOAD OPPORTUNITIES ERROR:",
        error
      );

      setErrorMessage(
        "حدث خطأ أثناء تحميل الفرص."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOpportunities();
  }, []);

  const states = useMemo(() => {
    return Array.from(
      new Set(
        opportunities
          .map((item) => item.state)
          .filter(Boolean)
      )
    ).sort();
  }, [opportunities]);

  const cities = useMemo(() => {
    return Array.from(
      new Set(
        opportunities
          .filter(
            (item) =>
              !state ||
              item.state === state
          )
          .map((item) => item.city)
          .filter(Boolean)
      )
    ).sort();
  }, [opportunities, state]);

  const filteredOpportunities =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      return opportunities.filter(
        (opportunity) => {
          const matchesSearch =
            !query ||
            opportunity.title
              .toLowerCase()
              .includes(query) ||
            opportunity.institution_name
              ?.toLowerCase()
              .includes(query) ||
            opportunity.city
              ?.toLowerCase()
              .includes(query) ||
            opportunity.state
              ?.toLowerCase()
              .includes(query);

          const matchesType =
            !type ||
            opportunity.opportunity_type ===
              type;

          const matchesState =
            !state ||
            opportunity.state === state;

          const matchesCity =
            !city ||
            opportunity.city === city;

          return (
            matchesSearch &&
            matchesType &&
            matchesState &&
            matchesCity
          );
        }
      );
    }, [
      opportunities,
      search,
      type,
      state,
      city,
    ]);

  function handleSearch(
    e: React.FormEvent
  ) {
    e.preventDefault();
  }

  function resetFilters() {
    setSearch("");
    setType("");
    setState("");
    setCity("");
  }

  const dashboardPath =
    getDashboardPath(
      sessionUser?.role || null
    );

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 text-slate-900"
    >
      {/* ================= HEADER ================= */}

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
          >
            <BridgeLogo />

            <div>
              <div className="text-xl font-extrabold tracking-tight text-slate-900">
                جسر
              </div>

              <div className="text-[11px] font-medium text-slate-500">
                منصة الفرص
              </div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-7 md:flex">
            <Link
              href="/"
              className="text-sm font-semibold text-slate-600 transition hover:text-blue-700"
            >
              الرئيسية
            </Link>

            <Link
              href="/opportunities"
              className="text-sm font-bold text-blue-700"
            >
              الفرص
            </Link>

            <Link
              href="/institutions"
              className="text-sm font-semibold text-slate-600 transition hover:text-blue-700"
            >
              المؤسسات
            </Link>

            <Link
              href="/about"
              className="text-sm font-semibold text-slate-600 transition hover:text-blue-700"
            >
              عن جسر
            </Link>

            <Link
              href="/contact"
              className="text-sm font-semibold text-slate-600 transition hover:text-blue-700"
            >
              تواصل معنا
            </Link>
          </nav>

          {/* ================= AUTH ACTIONS ================= */}

          <div className="flex items-center gap-2">

            {authLoading ? (
              <div className="hidden h-10 w-32 animate-pulse rounded-xl bg-slate-100 sm:block" />
            ) : sessionUser ? (

              <div className="flex items-center gap-2">

                {/* Dashboard */}
                {sessionUser.role && (
                  <Link
                    href={dashboardPath}
                    className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:flex"
                  >
                    <UserIcon />

                    <span>
                      لوحة التحكم
                    </span>
                  </Link>
                )}

                {/* User */}
                <Link
                  href={
                    sessionUser.role
                      ? dashboardPath
                      : "/dashboard/profile"
                  }
                  className="hidden items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 transition hover:border-blue-200 hover:bg-blue-50 sm:flex"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                    <UserIcon />
                  </div>

                  <div className="max-w-36 text-right">
                    <p className="truncate text-sm font-bold text-slate-800">
                      {sessionUser.full_name ||
                        sessionUser.email ||
                        "المستخدم"}
                    </p>

                    <p className="text-xs text-slate-500">
                      {getRoleLabel(
                        sessionUser.role
                      )}
                    </p>
                  </div>
                </Link>

                {/* Logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <LogoutIcon />

                  <span className="hidden sm:inline">
                    {loggingOut
                      ? "جارٍ الخروج..."
                      : "تسجيل الخروج"}
                  </span>
                </button>

              </div>

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

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 text-white">

        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-white/10" />

        <div className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-white/5" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">

          <div className="max-w-3xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-50">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />

              فرص جديدة عبر منصة جسر
            </div>

            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              اكتشف فرصتك
              <br />
              القادمة
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
              اكتشف فرص التدريب والعمل والتطوع
              والتعاون، وتواصل مع المؤسسات التي
              تبحث عن المواهب والطاقات الجديدة.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm">

              <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3">
                فرص تدريب
              </div>

              <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3">
                وظائف
              </div>

              <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3">
                فرص تطوع
              </div>

              <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3">
                تعاون
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ================= SEARCH ================= */}

      <section className="relative z-10 mx-auto -mt-8 max-w-7xl px-5 sm:px-6 lg:px-8">

        <form
          onSubmit={handleSearch}
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5"
        >
          <div className="grid gap-3 md:grid-cols-12">

            <div className="relative md:col-span-4">

              <label className="mb-2 block text-xs font-bold text-slate-500">
                البحث
              </label>

              <div className="relative">

                <input
                  type="search"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="ابحث عن فرصة أو مؤسسة..."
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 pl-11 text-sm outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />

                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <SearchIcon />
                </div>

              </div>
            </div>

            <div className="md:col-span-2">

              <label className="mb-2 block text-xs font-bold text-slate-500">
                نوع الفرصة
              </label>

              <select
                value={type}
                onChange={(e) =>
                  setType(e.target.value)
                }
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
              >
                {typeOptions.map(
                  (option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  )
                )}
              </select>

            </div>

            <div className="md:col-span-2">

              <label className="mb-2 block text-xs font-bold text-slate-500">
                الولاية
              </label>

              <select
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                  setCity("");
                }}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
              >
                <option value="">
                  كل الولايات
                </option>

                {states.map(
                  (item) => (
                    <option
                      key={item}
                      value={item || ""}
                    >
                      {item}
                    </option>
                  )
                )}
              </select>

            </div>

            <div className="md:col-span-2">

              <label className="mb-2 block text-xs font-bold text-slate-500">
                المدينة
              </label>

              <select
                value={city}
                onChange={(e) =>
                  setCity(e.target.value)
                }
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
              >
                <option value="">
                  كل المدن
                </option>

                {cities.map(
                  (item) => (
                    <option
                      key={item}
                      value={item || ""}
                    >
                      {item}
                    </option>
                  )
                )}
              </select>

            </div>

            <div className="flex items-end md:col-span-2">

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
              >
                <SearchIcon />
                بحث عن الفرص
              </button>

            </div>

          </div>
        </form>
      </section>

      {/* ================= OPPORTUNITIES ================= */}

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <p className="text-sm font-bold text-blue-700">
              منصة جسر
            </p>

            <h2 className="mt-1 text-3xl font-extrabold text-slate-900">
              أحدث الفرص
            </h2>

            <p className="mt-2 text-sm leading-7 text-slate-500">
              تصفح الفرص المتاحة واختر ما
              يناسب طموحك وخبراتك.
            </p>

          </div>

          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600">
            {filteredOpportunities.length} فرصة متاحة
          </div>

        </div>

        {errorMessage && (
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm leading-7 text-red-700">
            {errorMessage}
          </div>
        )}

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

        ) : filteredOpportunities.length === 0 ? (

          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
              <SearchIcon />
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-800">
              لم نجد فرصًا مطابقة
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500">
              جرّب تغيير كلمات البحث أو
              الفلاتر للوصول إلى فرص أخرى.
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

            {filteredOpportunities.map(
              (opportunity) => (

                <article
                  key={opportunity.id}
                  className="group flex min-h-[300px] flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                >

                  <div className="flex items-start justify-between gap-4">

                    <span
                      className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ring-1 ${typeBadgeClass(
                        opportunity.opportunity_type
                      )}`}
                    >
                      {typeLabel(
                        opportunity.opportunity_type
                      )}
                    </span>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-blue-700 transition group-hover:bg-blue-50">
                      <BuildingIcon />
                    </div>

                  </div>

                  <div className="mt-5">

                    <h3 className="line-clamp-2 text-xl font-extrabold leading-8 text-slate-900">
                      {opportunity.title}
                    </h3>

                    {opportunity.institution_name && (
                      <p className="mt-2 line-clamp-1 text-sm font-semibold text-slate-500">
                        {opportunity.institution_name}
                      </p>
                    )}

                  </div>

                  <div className="mt-5 space-y-3">

                    {opportunity.city ||
                    opportunity.state ? (

                      <div className="flex items-center gap-2 text-sm text-slate-500">

                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
                          <LocationIcon />
                        </span>

                        <span>
                          {[
                            opportunity.city,
                            opportunity.state,
                          ]
                            .filter(Boolean)
                            .join("، ")}
                        </span>

                      </div>

                    ) : null}

                    {opportunity.institution_name && (

                      <div className="flex items-center gap-2 text-sm text-slate-500">

                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
                          <BuildingIcon />
                        </span>

                        <span className="line-clamp-1">
                          {opportunity.institution_name}
                        </span>

                      </div>

                    )}

                  </div>

                  <div className="mt-auto pt-6">

                    <Link
                      href={`/opportunities/${opportunity.id}`}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-700/10 transition hover:bg-blue-800"
                    >
                      عرض تفاصيل الفرصة

                      <ArrowIcon />
                    </Link>

                  </div>

                </article>

              )
            )}

          </div>

        )}

      </section>

      {/* ================= CTA ================= */}

      <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-6 lg:px-8">

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-blue-700 to-indigo-900 px-6 py-12 text-center text-white sm:px-12">

          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-white/10" />

          <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-white/5" />

          <div className="relative">

            {sessionUser ? (

              <>
                <h2 className="text-2xl font-extrabold sm:text-3xl">
                  ابحث عن فرصتك القادمة
                </h2>

                <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
                  تصفح الفرص المنشورة واختر الفرصة
                  التي تناسب مهاراتك وتخصصك.
                </p>

                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

                  {sessionUser.role && (
                    <Link
                      href={dashboardPath}
                      className="rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-blue-700 shadow-lg transition hover:bg-blue-50"
                    >
                      العودة إلى لوحة التحكم
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/20 disabled:opacity-60"
                  >
                    {loggingOut
                      ? "جارٍ تسجيل الخروج..."
                      : "تسجيل الخروج"}
                  </button>

                </div>
              </>

            ) : (

              <>
                <h2 className="text-2xl font-extrabold sm:text-3xl">
                  لم تجد الفرصة المناسبة؟
                </h2>

                <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
                  أنشئ حسابًا على منصة جسر وتابع
                  الفرص الجديدة التي تناسب اهتماماتك.
                </p>

                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

                  <Link
                    href="/register"
                    className="rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-blue-700 shadow-lg transition hover:bg-blue-50"
                  >
                    إنشاء حساب جديد
                  </Link>

                  <Link
                    href="/login"
                    className="rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/20"
                  >
                    تسجيل الدخول
                  </Link>

                </div>
              </>

            )}

          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">

          <div className="grid gap-10 md:grid-cols-4">

            <div className="md:col-span-2">

              <Link
                href="/"
                className="inline-flex items-center gap-3"
              >
                <BridgeLogo />

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

                <Link
                  href="/register"
                  className="block text-slate-500 hover:text-blue-700"
                >
                  إنشاء حساب
                </Link>

              </div>

            </div>

            <div>

              <h3 className="font-bold text-slate-900">
                تواصل معنا
              </h3>

              <div className="mt-4 space-y-3 text-sm">

                <a
                  href="https://www.facebook.com/share/1EHXzj38uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-slate-500 transition hover:text-blue-700"
                >
                  Facebook
                </a>

                <a
                  href="https://t.me/Jisr_Sudan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-slate-500 transition hover:text-blue-700"
                >
                  Telegram
                </a>

                <a
                  href="mailto:jisrsudan@gmail.com"
                  className="block break-all text-slate-500 transition hover:text-blue-700"
                >
                  jisrsudan@gmail.com
                </a>

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

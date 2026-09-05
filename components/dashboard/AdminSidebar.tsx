"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    href: "/dashboard/admin",
    title: "الرئيسية",
    icon: "🏠",
  },
  {
    href: "/dashboard/admin/institutions",
    title: "إدارة المؤسسات",
    icon: "🏢",
  },
  {
    href: "/dashboard/admin/users",
    title: "إدارة المستخدمين",
    icon: "👥",
  },
  {
    href: "/dashboard/admin/opportunities",
    title: "إدارة الفرص",
    icon: "💼",
  },
  {
    href: "/dashboard/admin/applications",
    title: "طلبات التقديم",
    icon: "📨",
  },
  {
    href: "/dashboard/admin/notifications",
    title: "الإشعارات",
    icon: "🔔",
  },
  {
    href: "/dashboard/admin/settings",
    title: "الإعدادات",
    icon: "⚙️",
  },
];

export default function AdminSidebar({
  unreadNotifications = 0,
}: {
  unreadNotifications?: number;
}) {
  const pathname = usePathname();

  return (
    <aside className="min-h-screen w-72 bg-slate-900 p-6 text-white">
      <h1 className="mb-10 text-3xl font-bold">
        جسر
      </h1>

      <nav className="space-y-3">
        {links.map((link) => {
          const isActive = pathname === link.href;

          const isNotifications =
            link.href ===
            "/dashboard/admin/notifications";

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                isActive
                  ? "bg-blue-700"
                  : "hover:bg-slate-800"
              }`}
            >
              <span className="text-2xl">
                {link.icon}
              </span>

              <span className="flex-1">
                {link.title}
              </span>

              {isNotifications &&
                unreadNotifications > 0 && (
                  <span className="flex min-h-6 min-w-6 items-center justify-center rounded-full bg-red-600 px-1.5 text-xs font-bold text-white">
                    {unreadNotifications > 99
                      ? "99+"
                      : unreadNotifications}
                  </span>
                )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

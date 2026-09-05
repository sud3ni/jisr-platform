import AdminSidebar from "@/components/dashboard/AdminSidebar";
import { createSupabaseServerClient } from "@/lib/supabase-server-auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase =
    await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let unreadNotifications = 0;

  if (user) {
    const { count } = await supabase
      .from("notifications")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id)
      .eq("is_read", false);

    unreadNotifications = count || 0;
  }

  return (
    <div className="flex">
      <AdminSidebar
        unreadNotifications={
          unreadNotifications
        }
      />

      <main className="min-h-screen flex-1 bg-slate-100 p-8">
        {children}
      </main>
    </div>
  );
}

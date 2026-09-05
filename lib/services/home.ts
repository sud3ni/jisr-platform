import { supabase } from "@/lib/supabase-client";

export async function getHomeStats() {
  const [
    graduates,
    institutions,
    opportunities,
    applications,
  ] = await Promise.all([
    supabase
      .from("graduates")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("institutions")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("opportunities")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("applications")
      .select("*", { count: "exact", head: true }),
  ]);

  return {
    graduates: graduates.count ?? 0,
    institutions: institutions.count ?? 0,
    opportunities: opportunities.count ?? 0,
    applications: applications.count ?? 0,
  };
}

export async function getLatestOpportunities() {
  const { data } = await supabase
    .from("opportunities")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(6);

  return data ?? [];
}

export async function getInstitutions() {
  const { data } = await supabase
    .from("institutions")
    .select("*")
    .limit(8);

  return data ?? [];
}

import { supabaseServer } from "./supabase-server";

export async function getLatestOpportunities() {
  const { data, error } = await supabaseServer
    .from("opportunities")
    .select(`
      id,
      institution_id,
      title,
      description,
      opportunity_type,
      city,
      state,
      duration
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

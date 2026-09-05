export interface Application {
  id: string;
  opportunity_id: string;
  graduate_id: string;
  status: "pending" | "accepted" | "rejected";
  cover_letter: string | null;
  created_at: string;
}

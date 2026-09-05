export interface User {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  role: string;
}

export interface Graduate {
  id: string;
  user_id: string;
  university: string;
  faculty: string;
  major: string;
  graduation_year: number;
}

export interface Institution {
  id: string;
  user_id: string;
  name: string;
  city: string;
  verified: boolean;
}

export interface Opportunity {
  id: string;
  institution_id: string;
  title: string;
  description: string;
  opportunity_type: string;
  salary_type: string;
  city: string;
}

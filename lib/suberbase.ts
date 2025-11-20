import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  full_name: string;
  bio: string;
  skills: string;
  projects: string;
  education: string;
  linkedin_url: string;
  github_url: string;
  created_at: string;
  updated_at: string;
};

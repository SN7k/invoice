const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function getSupabaseConfig() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return { ready: false, url: '', key: '' };
  }

  return {
    ready: true,
    url: supabaseUrl,
    key: supabaseAnonKey
  };
}
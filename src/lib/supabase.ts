import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as
  | string
  | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

if (!isSupabaseConfigured) {
  console.warn(
    "Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY — waitlist signups will not work until env is set."
  );
}

/** Real client when configured; otherwise a no-op stub so the marketing site still renders. */
export const supabase: SupabaseClient = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseKey!)
  : ({
      from: () => ({
        insert: async () => ({
          data: null,
          error: new Error("Supabase is not configured"),
        }),
      }),
      rpc: async () => ({
        data: null,
        error: new Error("Supabase is not configured"),
      }),
    } as unknown as SupabaseClient);

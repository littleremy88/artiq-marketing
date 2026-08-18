import { useCallback, useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

/** Reads the signup total through a security-definer function; waitlist rows stay unreadable. */
async function fetchWaitlistCount(): Promise<number | null> {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase.rpc("waitlist_count");
  if (error) return null;
  const count = Number(data);
  return Number.isFinite(count) ? count : null;
}

export function useWaitlistCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    fetchWaitlistCount().then((value) => {
      if (active) setCount(value);
    });
    return () => {
      active = false;
    };
  }, []);

  const bumpCount = useCallback(() => {
    setCount((current) => (current === null ? null : current + 1));
  }, []);

  return { count, bumpCount };
}

export function formatWaitlistCount(count: number) {
  return count.toLocaleString("en-US");
}

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

export default function Account() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth", { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center pt-24 text-sm text-ivory/50">
        Loading…
      </div>
    );
  }

  const displayName =
    (user.user_metadata?.display_name as string | undefined) ||
    user.email?.split("@")[0] ||
    "Collector";

  return (
    <div className="pt-24">
      <section className="mx-auto max-w-lg px-5 py-16 md:px-8 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <h1 className="font-display text-3xl font-semibold tracking-wide text-ivory">
            You’re signed in
          </h1>
          <p className="mt-2 text-ivory/55">
            Hi {displayName}. This is the same account you use in the Artiq app.
          </p>

          <div className="mt-8 border-t border-ivory/10 pt-8">
            <p className="text-xs font-medium uppercase tracking-wider text-ivory/40">
              Email
            </p>
            <p className="mt-1 text-sm text-ivory/80">{user.email}</p>
          </div>

          <p className="mt-8 text-sm leading-relaxed text-ivory/55">
            The marketplace, feed, and selling tools live in the mobile app. Use
            your account there to browse and collect.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/download"
              className="rounded-xl bg-ivory px-6 py-3.5 text-sm font-semibold text-charcoal transition hover:bg-gold-soft"
            >
              Get the app
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              className="rounded-xl border border-ivory/25 px-6 py-3.5 text-sm font-semibold text-ivory transition hover:border-ivory/50"
            >
              Sign out
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

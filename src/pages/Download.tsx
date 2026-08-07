import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getAndroidStoreUrl, getIosStoreUrl } from "@/lib/appStore";

export default function Download() {
  const iosUrl = getIosStoreUrl();
  const androidUrl = getAndroidStoreUrl();

  return (
    <div className="pt-24">
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(184,154,90,0.16), transparent 55%), #1C1C1A",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-5 py-20 text-center md:px-8 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl font-semibold tracking-wide text-ivory md:text-5xl">
              Get Artiq
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-ivory/60">
              The full gallery experience — feed, collecting, messaging, and
              selling — lives in the app.
            </p>

            <div className="mt-12 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
              {iosUrl ? (
                <a
                  href={iosUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-ivory px-8 py-4 text-sm font-semibold text-charcoal transition hover:bg-gold-soft"
                >
                  Download on the App Store
                </a>
              ) : (
                <div className="rounded-xl border border-ivory/15 bg-charcoal-lift px-8 py-4 text-sm text-ivory/50">
                  App Store — coming soon
                </div>
              )}
              <a
                href={androidUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-ivory/25 px-8 py-4 text-sm font-semibold text-ivory transition hover:border-ivory/50"
              >
                Get it on Google Play
              </a>
            </div>

            <p className="mt-10 text-sm text-ivory/45">
              Already have an account?{" "}
              <Link to="/auth" className="text-gold hover:text-gold-soft">
                Sign in here
              </Link>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

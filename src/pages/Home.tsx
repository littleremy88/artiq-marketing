import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ArtBackground from "@/components/ArtBackground";
import FeedScrollPreview from "@/components/FeedScrollPreview";
import { PLATFORM_FEE_PERCENT } from "@/lib/fees";

export default function Home() {
  return (
    <>
      {/* Hero — brand + one line + CTA over GTA-style art wall */}
      <section className="relative min-h-[100svh] overflow-hidden bg-charcoal">
        <ArtBackground opacity={72} />

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:justify-center md:px-8 md:pb-24 md:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            <p className="font-display text-5xl font-semibold tracking-wide text-ivory sm:text-6xl md:text-7xl">
              Artiq
            </p>
            <h1 className="mt-4 font-display text-2xl font-medium leading-snug text-ivory/90 sm:text-3xl">
              Discover & collect art in a scrolling gallery.
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ivory/65 sm:text-lg">
              Follow artists, find works that resonate, and collect pieces you love —
              all in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/waitlist"
                className="rounded-xl bg-ivory px-6 py-3.5 text-sm font-semibold text-charcoal transition hover:bg-gold-soft"
              >
                Join waitlist
              </Link>
              <Link
                to="/how-it-works"
                className="rounded-xl border border-ivory/25 bg-charcoal/40 px-6 py-3.5 text-sm font-semibold text-ivory backdrop-blur transition hover:border-ivory/50"
              >
                How it works
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* One job: what Artiq is */}
      <section className="relative overflow-hidden border-t border-ivory/10 bg-charcoal-deep">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 20% 0%, rgba(184,154,90,0.18), transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h2 className="font-display text-3xl font-semibold tracking-wide text-ivory md:text-4xl">
              Art, discovered the way you scroll.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ivory/60 md:text-lg">
              Artiq is a digital gallery built for the way people already browse —
              a vertical feed of original works, with artists you can follow and
              pieces you can collect.
            </p>
          </motion.div>
        </div>
      </section>

      {/* One job: emerging artist exposure */}
      <section className="border-t border-ivory/10 bg-charcoal">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h2 className="font-display text-3xl font-semibold tracking-wide text-ivory md:text-4xl">
              Built so young artists get seen.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ivory/60 md:text-lg">
              Emerging artists often struggle to get their work in front of people —
              galleries are hard to break into, and crowded marketplaces bury new
              voices. Artiq puts your art in a scrolling feed collectors already know
              how to use, so talent can find an audience without waiting for a gatekeeper.
            </p>
            <Link
              to="/waitlist"
              className="mt-8 inline-flex rounded-xl bg-ivory px-6 py-3.5 text-sm font-semibold text-charcoal transition hover:bg-gold-soft"
            >
              Join the waitlist as an artist
            </Link>
          </motion.div>
        </div>
      </section>

      {/* One job: scrolling feed visual */}
      <section className="border-t border-ivory/10 bg-charcoal-deep">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:gap-16 md:px-8 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl font-semibold tracking-wide text-ivory md:text-4xl">
              Scroll. Pause. Fall for a piece.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ivory/60 md:text-lg">
              Discovery on Artiq is a full-screen vertical gallery — swipe through
              original works the same way you’d scroll a feed, without the noise of a
              traditional storefront.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <FeedScrollPreview />
            <p className="mt-6 text-center text-sm text-ivory/45">
              The Artiq feed — art first, every swipe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* One job: lower fees */}
      <section className="relative overflow-hidden border-t border-ivory/10 bg-charcoal">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 50% at 85% 50%, rgba(184,154,90,0.14), transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <p className="font-display text-6xl font-semibold tracking-wide text-gold md:text-7xl">
              {PLATFORM_FEE_PERCENT}%
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-wide text-ivory md:text-4xl">
              Artists keep more of every sale.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ivory/60 md:text-lg">
              Artiq takes an {PLATFORM_FEE_PERCENT}% platform fee — lower than typical
              marketplace and gallery cuts, which often run much higher. That means more
              of what collectors pay goes to the person who made the work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA band */}
      <section className="border-t border-ivory/10 bg-charcoal-deep">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 py-16 md:flex-row md:items-center md:px-8 md:py-20">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ivory md:text-3xl">
              Be first when Artiq launches
            </h2>
            <p className="mt-2 text-ivory/55">
              Join the waitlist as an artist, buyer, or viewer — we’ll notify you.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/waitlist"
              className="rounded-xl bg-gold px-6 py-3.5 text-sm font-semibold text-charcoal transition hover:bg-gold-soft"
            >
              Join waitlist
            </Link>
            <Link
              to="/download"
              className="rounded-xl border border-ivory/25 px-6 py-3.5 text-sm font-semibold text-ivory transition hover:border-ivory/50"
            >
              Download
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

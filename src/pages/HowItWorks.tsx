import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import art2 from "@/assets/artwork-2.jpg";
import art3 from "@/assets/artwork-3.jpg";
import { PLATFORM_FEE_PERCENT } from "@/lib/fees";

const steps = [
  {
    title: "Discover",
    body: "Scroll a curated feed of original works. Pause on pieces that catch you — no crowded marketplace layout, just the art.",
  },
  {
    title: "Follow",
    body: "Connect with artists whose work resonates. See new pieces from people you follow as they publish.",
  },
  {
    title: "Collect",
    body: "Save favorites, buy fixed-price works, or bid in auctions — then manage orders in the app.",
  },
];

export default function HowItWorks() {
  return (
    <div className="pt-24">
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 45% at 80% 10%, rgba(184,154,90,0.14), transparent 50%), linear-gradient(180deg, #121211 0%, #1C1C1A 100%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="font-display text-4xl font-semibold tracking-wide text-ivory md:text-5xl">
              How Artiq works
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ivory/60">
              Built for collectors and artists who want discovery first — then a
              clear path to own the work.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p className="font-display text-5xl font-semibold text-gold/40">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-3 font-display text-2xl font-semibold text-ivory">
                  {step.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ivory/55 md:text-base">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ivory/10 bg-charcoal-deep">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center md:gap-16 md:px-8 md:py-24">
          <div className="grid grid-cols-2 gap-3">
            <img
              src={art2}
              alt=""
              className="aspect-[3/4] w-full object-cover"
            />
            <img
              src={art3}
              alt=""
              className="mt-8 aspect-[3/4] w-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-display text-3xl font-semibold text-ivory md:text-4xl">
              For artists, too
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ivory/60">
              Upload your work into a scrolling feed where collectors actually browse —
              so emerging artists can get exposure without waiting on a gallery wall.
              Set a price or run an auction. Artiq takes {PLATFORM_FEE_PERCENT}% so you
              keep more of every sale, with payouts through Stripe Connect in the app.
            </p>
            <Link
              to="/download"
              className="mt-8 inline-flex rounded-xl bg-ivory px-6 py-3.5 text-sm font-semibold text-charcoal transition hover:bg-gold-soft"
            >
              Get the app
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

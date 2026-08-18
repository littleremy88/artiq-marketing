import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CaptchaWidget, useCaptcha } from "@/components/Captcha";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { formatWaitlistCount, useWaitlistCount } from "@/lib/waitlistCount";

const ROLES = [
  { id: "artist", label: "Artist" },
  { id: "buyer", label: "Buyer" },
  { id: "viewer", label: "Viewer" },
] as const;

type Role = (typeof ROLES)[number]["id"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function phoneDigitCount(value: string) {
  return value.replace(/\D/g, "").length;
}

export default function Waitlist() {
  const { captchaRef, getCaptchaToken, resetCaptcha, captchaError } = useCaptcha();
  const { count, bumpCount } = useWaitlistCount();
  const [name, setName] = useState("");
  const [role, setRole] = useState<Role>("artist");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(
    null
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPhone = phone.trim();

    if (!trimmedName) {
      setMessage({ type: "error", text: "Enter your name." });
      return;
    }
    if (!EMAIL_RE.test(trimmedEmail)) {
      setMessage({ type: "error", text: "Enter a valid email address." });
      return;
    }
    if (trimmedPhone && phoneDigitCount(trimmedPhone) < 7) {
      setMessage({ type: "error", text: "Enter a valid phone number, or leave it blank." });
      return;
    }
    if (!isSupabaseConfigured) {
      setMessage({ type: "error", text: "The waitlist is not available right now. Try again later." });
      return;
    }

    setSubmitting(true);
    try {
      const captcha = await getCaptchaToken();
      if (!captcha.ok) return;

      const { error } = await supabase.from("waitlist").insert({
        name: trimmedName,
        role,
        email: trimmedEmail,
        phone: trimmedPhone || null,
      });
      resetCaptcha();

      if (error) {
        const alreadyJoined =
          error.code === "23505" || error.message.toLowerCase().includes("duplicate");
        setMessage({
          type: alreadyJoined ? "success" : "error",
          text: alreadyJoined
            ? "You’re already on the list. We’ll notify you at launch."
            : "We couldn’t add you just now. Please try again.",
        });
        if (alreadyJoined) setJoined(true);
        return;
      }

      setJoined(true);
      bumpCount();
      setMessage({
        type: "success",
        text: "You’re on the list. We’ll email you at launch — and text you if you left a number.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-[100svh] items-center justify-center px-5 py-28 md:px-8">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 20%, rgba(184,154,90,0.12), transparent 60%), #1C1C1A",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <h1 className="font-display text-center text-3xl font-semibold tracking-wide text-ivory">
          Join the waitlist
        </h1>
        <p className="mt-2 text-center text-sm text-ivory/55">
          Artists, buyers, and viewers — we’ll let you know when Artiq launches.
        </p>

        {count !== null && (
          <p className="mt-4 text-center text-sm text-ivory/60">
            <span className="font-display text-base font-semibold text-gold">
              {formatWaitlistCount(count)}
            </span>{" "}
            {count === 1 ? "person has" : "people have"} joined so far.
          </p>
        )}

        {joined ? (
          <div className="mt-10 rounded-xl border border-ivory/15 bg-charcoal-lift px-5 py-6 text-center">
            <p className="text-sm leading-relaxed text-ivory/80">
              {message?.text ??
                "You’re on the list. We’ll email you at launch — and text you if you left a number."}
            </p>
            <Link
              to="/"
              className="mt-6 inline-block text-sm font-medium text-gold hover:text-gold-soft"
            >
              Back to home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-ivory/50">Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-xl border border-ivory/15 bg-charcoal-lift px-4 py-3 text-sm text-ivory outline-none transition focus:border-gold/50"
                placeholder="How we should address you"
                autoComplete="name"
              />
            </label>

            <fieldset>
              <legend className="mb-1.5 block text-xs font-medium text-ivory/50">I am a</legend>
              <div className="grid grid-cols-3 gap-2">
                {ROLES.map((option) => {
                  const selected = role === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setRole(option.id)}
                      className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                        selected
                          ? "border-gold/60 bg-gold/15 text-ivory"
                          : "border-ivory/15 bg-charcoal-lift text-ivory/60 hover:border-ivory/35 hover:text-ivory"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-ivory/50">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-ivory/15 bg-charcoal-lift px-4 py-3 text-sm text-ivory outline-none transition focus:border-gold/50"
                placeholder="you@email.com"
                autoComplete="email"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-ivory/50">
                Phone <span className="text-ivory/35">(optional)</span>
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-ivory/15 bg-charcoal-lift px-4 py-3 text-sm text-ivory outline-none transition focus:border-gold/50"
                placeholder="For a text at launch"
                autoComplete="tel"
              />
            </label>

            <CaptchaWidget ref={captchaRef} />

            {captchaError && <p className="text-sm text-red-300">{captchaError}</p>}

            {message && message.type === "error" && (
              <p className="text-sm text-red-300">{message.text}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-ivory py-3.5 text-sm font-semibold text-charcoal transition hover:bg-gold-soft disabled:opacity-60"
            >
              {submitting ? "Please wait…" : "Join waitlist"}
            </button>
          </form>
        )}

        <p className="mt-8 text-center text-xs text-ivory/35">
          We’ll only use this to tell you when the app is ready.{" "}
          <Link to="/privacy" className="text-ivory/55 underline-offset-2 hover:underline">
            Privacy
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

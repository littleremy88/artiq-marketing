import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

export default function Auth() {
  const { user, loading, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(
    null
  );

  useEffect(() => {
    if (!loading && user) {
      navigate("/account", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!email.includes("@") || password.length < 6) {
      setMessage({
        type: "error",
        text: "Enter a valid email and a password of at least 6 characters.",
      });
      return;
    }

    setSubmitting(true);
    try {
      if (isSignUp) {
        const { error } = await signUp(email, password, displayName);
        if (error) {
          setMessage({
            type: "error",
            text: error.message.includes("already registered")
              ? "That email is already registered. Try signing in."
              : error.message,
          });
        } else {
          setMessage({
            type: "success",
            text: "Account created. Check your email if confirmation is required, then open the app to finish setup.",
          });
          navigate("/account");
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          setMessage({ type: "error", text: error.message });
        } else {
          navigate("/account");
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[100svh] items-center justify-center px-5 pb-16 pt-28">
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
          {isSignUp ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-2 text-center text-sm text-ivory/55">
          Same Artiq account you use in the app.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-4">
          {isSignUp && (
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-ivory/50">
                Display name
              </span>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full rounded-xl border border-ivory/15 bg-charcoal-lift px-4 py-3 text-sm text-ivory outline-none transition focus:border-gold/50"
                placeholder="How you’ll appear"
                autoComplete="name"
              />
            </label>
          )}

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
            <span className="mb-1.5 block text-xs font-medium text-ivory/50">Password</span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full rounded-xl border border-ivory/15 bg-charcoal-lift px-4 py-3 pr-16 text-sm text-ivory outline-none transition focus:border-gold/50"
                placeholder="At least 6 characters"
                autoComplete={isSignUp ? "new-password" : "current-password"}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ivory/45 hover:text-ivory"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          {message && (
            <p
              className={`text-sm ${
                message.type === "error" ? "text-red-300" : "text-emerald-300"
              }`}
            >
              {message.text}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-ivory py-3.5 text-sm font-semibold text-charcoal transition hover:bg-gold-soft disabled:opacity-60"
          >
            {submitting ? "Please wait…" : isSignUp ? "Sign up" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ivory/50">
          {isSignUp ? "Already have an account?" : "New to Artiq?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsSignUp((v) => !v);
              setMessage(null);
            }}
            className="font-medium text-gold hover:text-gold-soft"
          >
            {isSignUp ? "Sign in" : "Create one"}
          </button>
        </p>

        <p className="mt-8 text-center text-xs text-ivory/35">
          After signing in, download the app for the full experience.{" "}
          <Link to="/download" className="text-ivory/55 underline-offset-2 hover:underline">
            Get the app
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

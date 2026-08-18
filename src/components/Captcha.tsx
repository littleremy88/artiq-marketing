import { forwardRef, useCallback, useRef, useState } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

/**
 * Captcha is opt-in via env so the site keeps working before Turnstile is
 * configured. Used as a bot speed-bump on the waitlist form.
 */
export const isCaptchaEnabled = Boolean(siteKey);

/** Cloudflare tokens are single-use and expire after ~5 minutes. */
const TOKEN_TIMEOUT_MS = 20_000;

export const CaptchaWidget = forwardRef<TurnstileInstance | undefined>((_props, ref) => {
  if (!isCaptchaEnabled) return null;

  return (
    <Turnstile
      ref={ref}
      siteKey={siteKey!}
      options={{ appearance: "interaction-only", theme: "dark", size: "flexible" }}
      className="mx-auto"
    />
  );
});

CaptchaWidget.displayName = "CaptchaWidget";

export function useCaptcha() {
  const captchaRef = useRef<TurnstileInstance>();
  const [captchaError, setCaptchaError] = useState<string | null>(null);

  /** Resolves without a token when captcha is disabled. */
  const getCaptchaToken = useCallback(async (): Promise<
    { ok: true; token?: string } | { ok: false }
  > => {
    if (!isCaptchaEnabled) return { ok: true, token: undefined };

    setCaptchaError(null);
    try {
      const token = await captchaRef.current?.getResponsePromise(TOKEN_TIMEOUT_MS);
      if (!token) throw new Error("No captcha token");
      return { ok: true, token };
    } catch {
      setCaptchaError(
        "We couldn't verify that you're human. Check your connection or disable your ad blocker, then try again."
      );
      return { ok: false };
    }
  }, []);

  const resetCaptcha = useCallback(() => {
    captchaRef.current?.reset();
  }, []);

  return { captchaRef, getCaptchaToken, resetCaptcha, captchaError };
}

import type { ReactNode } from "react";
import { Link } from "react-router-dom";

const INSTAGRAM_URL = "https://www.instagram.com/artiqapp/";
const TIKTOK_URL = "https://www.tiktok.com/@artiq.daily";

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer me"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-ivory/15 text-ivory/60 transition hover:border-ivory/40 hover:text-ivory"
    >
      {children}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.89 2.89 2.89 0 0 1 2.88-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.16 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.18 8.18 0 0 0 4.75 1.5V6.78a4.84 4.84 0 0 1-1-.09z" />
    </svg>
  );
}

export default function SiteFooter() {
  return (
    <footer className="border-t border-ivory/10 bg-charcoal-deep">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="font-display text-xl font-semibold tracking-wide text-ivory">Artiq</p>
          <p className="mt-1 text-sm text-ivory/50">Discover & collect art.</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ivory/55">
          <Link to="/how-it-works" className="hover:text-ivory">
            How it works
          </Link>
          <Link to="/download" className="hover:text-ivory">
            Download
          </Link>
          <Link to="/waitlist" className="hover:text-ivory">
            Join waitlist
          </Link>
          <Link to="/privacy" className="hover:text-ivory">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-ivory">
            Terms
          </Link>
          <a href="mailto:artiqcali@gmail.com" className="hover:text-ivory">
            Support
          </a>
        </nav>
        <div className="flex items-center gap-2.5">
          <SocialLink href={INSTAGRAM_URL} label="Follow Artiq on Instagram">
            <InstagramIcon />
          </SocialLink>
          <SocialLink href={TIKTOK_URL} label="Follow Artiq on TikTok">
            <TikTokIcon />
          </SocialLink>
        </div>
      </div>
      <div className="border-t border-ivory/5 px-5 py-4 text-center text-xs text-ivory/35 md:px-8">
        © {new Date().getFullYear()} Artiq. All rights reserved.
      </div>
    </footer>
  );
}

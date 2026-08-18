import { Link } from "react-router-dom";

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
      </div>
      <div className="border-t border-ivory/5 px-5 py-4 text-center text-xs text-ivory/35 md:px-8">
        © {new Date().getFullYear()} Artiq. All rights reserved.
      </div>
    </footer>
  );
}

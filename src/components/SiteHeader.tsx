import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/artiq-logo.png";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm tracking-wide transition-colors ${
    isActive ? "text-ivory" : "text-ivory/55 hover:text-ivory"
  }`;

export default function SiteHeader() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src={logo} alt="" className="h-8 w-8 object-contain" />
          <span className="font-display text-2xl font-semibold tracking-wide text-ivory">
            Artiq
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/how-it-works" className={navLinkClass}>
            How it works
          </NavLink>
          <NavLink to="/download" className={navLinkClass}>
            Download
          </NavLink>
          {user ? (
            <NavLink to="/account" className={navLinkClass}>
              Account
            </NavLink>
          ) : (
            <NavLink
              to="/auth"
              className="rounded-xl bg-ivory px-4 py-2 text-sm font-semibold text-charcoal transition hover:bg-gold-soft"
            >
              Sign in
            </NavLink>
          )}
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-ivory md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <div className="flex w-5 flex-col gap-1.5">
            <span
              className={`h-px bg-ivory transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span className={`h-px bg-ivory transition ${open ? "opacity-0" : ""}`} />
            <span
              className={`h-px bg-ivory transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </div>
        </button>
      </div>

      {open && (
        <div className="border-t border-ivory/10 bg-charcoal/95 px-5 py-4 backdrop-blur md:hidden">
          <nav className="flex flex-col gap-4">
            <NavLink to="/how-it-works" className={navLinkClass} onClick={() => setOpen(false)}>
              How it works
            </NavLink>
            <NavLink to="/download" className={navLinkClass} onClick={() => setOpen(false)}>
              Download
            </NavLink>
            <NavLink
              to={user ? "/account" : "/auth"}
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              {user ? "Account" : "Sign in"}
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}

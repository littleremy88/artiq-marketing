import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "@/assets/artiq-mark.png";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm tracking-wide transition-colors ${
    isActive ? "text-ivory" : "text-ivory/55 hover:text-ivory"
  }`;

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img
            src={logo}
            alt="Artiq"
            className="h-9 w-9 rounded-[22%] object-cover shadow-sm ring-1 ring-ivory/15"
          />
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
          <NavLink
            to="/waitlist"
            className="rounded-xl bg-ivory px-4 py-2 text-sm font-semibold text-charcoal transition hover:bg-gold-soft"
          >
            Join waitlist
          </NavLink>
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
            <NavLink to="/waitlist" className={navLinkClass} onClick={() => setOpen(false)}>
              Join waitlist
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}

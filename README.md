# Artiq Marketing Site

Public informational website for **Artiq** — Discover & Collect Art.

This is a separate site from the mobile/web marketplace app. It collects a launch waitlist (name, role, email, optional phone) in the same Supabase project. App sign-in lives in the mobile app, not on this site.

## Pages

- `/` — Home
- `/how-it-works` — How Artiq works
- `/download` — App Store / Play links
- `/waitlist` — Join the launch waitlist
- `/auth` and `/account` — Redirect to `/waitlist`

## Develop

```bash
npm install
npm run dev
```

Open the local URL (usually `http://localhost:5173`).

## Environment

Copy `.env.example` to `.env` and use the same Supabase values as the main app:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
```

Waitlist rows are stored in the `waitlist` table. Export them from the [Supabase Table Editor](https://supabase.com/dashboard/project/rtqlgnwvxnfoftdnpnid/editor) when you are ready to notify people at launch.

## Deploy + custom domain

1. Push this repo to GitHub.
2. Deploy on [Vercel](https://vercel.com) or [Netlify](https://netlify.com) (Vite preset).
3. Buy a domain (Cloudflare, Namecheap, etc.) and connect it in the host’s Domain settings.

## App Store links

Edit `src/lib/appStore.ts` and set `APPLE_APP_STORE_ID` after App Store Connect submission. Android uses package `com.artiq.app`.
